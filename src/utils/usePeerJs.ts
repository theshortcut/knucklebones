import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { PeerType } from '@/game';
import { useGameState } from '@/components/GameStateContext';
import { generateRandomId } from './generateRandomId';

export function usePeerJs(peerType: PeerType, roomCode?: string) {
  const peerId = useRef(generateRandomId());
  const peer = useRef<Peer>();
  const gameState = useGameState();

  useEffect(() => {
    peer.current = new Peer(`cfknucklebones-${peerId.current}`);
    return () => {
      peer.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (peerType === 'ai' || !peer) return;

    if (peerType === 'host') {
      peer.current?.on('connection', (conn) => {
        conn?.on('data', console.log);
        conn?.on('open', () => conn?.send('hello'));
      });
      peer.current?.on('disconnected', () => {
        console.log('client disconnected');
      });
    }

    if (peerType === 'join') {
      const conn = peer.current?.connect(`cfknucklebones-${roomCode}`);
      conn?.on('open', () => {
        conn?.send('hi');
      });
      conn?.on('data', console.log);
      peer.current?.on('disconnected', () => {
        console.log('host disconnected');
      });
    }
  }, [peerType, roomCode]);

  return peerId.current;
}
