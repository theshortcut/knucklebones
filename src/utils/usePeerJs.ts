import { useCallback, useEffect, useRef, useState } from 'react';
import { Peer, DataConnection } from 'peerjs';
import { GameState, MoveActions, PeerType } from '@/game';
import { useGameState } from '@/components/GameStateContext';
import { generateRandomId } from './generateRandomId';

export type ConnectionState = 'disconnected' | 'reconnecting' | 'connected';

export function usePeerJs(
  peerType: PeerType,
  userName: string,
  roomCode?: string
) {
  const peerId = useRef(generateRandomId());
  const peer = useRef<Peer>();
  const connection = useRef<DataConnection>();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('disconnected');
  const [gameState, dispatch, addObserver, removeObserver] = useGameState();

  useEffect(() => {
    (async () => {
      peer.current = new Peer(`cfknucklebones-${peerId.current}`);
    })();
    return () => {
      peer.current?.destroy();
    };
  }, []);

  const initialConnection = useRef(false);

  const broadcastState = useCallback(
    (action: MoveActions, gameState: GameState) => {
      console.log('sending', action);
      if (peerType === 'ai' || !connection.current) return;
      if (peerType === 'host') {
        connection.current.send({ type: 'sendState', payload: gameState });
      }
      if (peerType === 'join' && action.type === 'playDice') {
        console.log('sending', action);
        connection.current.send(action);
      }
    },
    [peerType]
  );

  useEffect(() => {
    addObserver(broadcastState);
    return () => removeObserver(broadcastState);
  }, [addObserver, broadcastState, removeObserver]);

  useEffect(() => {
    if (peerType === 'ai' || !peer) return;

    if (peerType === 'host') {
      peer.current?.on('connection', (conn) => {
        connection.current = conn;
        conn?.on('data', (message) => {
          console.log('recieved message', message);
          dispatch(message as MoveActions);
        });
        conn?.on('open', () => {
          initialConnection.current = true;
          setConnectionState('connected');
        });
      });
      peer.current?.on('disconnected', () => {
        setConnectionState('reconnecting');
      });
    }

    if (peerType === 'join') {
      const conn = peer.current?.connect(`cfknucklebones-${roomCode}`, {
        reliable: true,
      });
      if (!conn) return;
      conn.on('open', () => {
        if (!initialConnection.current) {
          initialConnection.current = true;
          connection.current = conn;
          setConnectionState('connected');
          conn.send({
            type: 'setOpponentName',
            payload: { name: Object.keys(gameState)[0] },
          });
        }
      });
      conn?.on('data', (message: any) => {
        console.log('recieved message', message);
        if (message.type === 'sendState') {
          dispatch({ type: 'recieveState', payload: message.payload });
        }
      });
      peer.current?.on('disconnected', () => {
        setConnectionState('reconnecting');
        peer.current?.reconnect();
      });
    }
  }, [dispatch, gameState, peerType, roomCode, userName]);

  return [peerId.current, connectionState];
}
