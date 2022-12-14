import { OverlayContainer } from 'react-aria';
import { Board } from '@/components/Board';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Dialog } from '@/components/Dialog';
import { Player } from '@/components/Player';
import { useGameState } from '@/components/GameStateContext';
import {
  getPlayersByType,
  isGameOver as checkIsGameOver,
  PeerType,
  scorePlayer,
} from '@/game';
import { evaluate } from '@/game/expectiminimax';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePeerJs } from '@/utils/usePeerJs';
import { TextInput } from '@/components/TextInput';
import { Flex } from '@/components/Flex';

type Props = {
  setCurrentScene: Dispatch<
    SetStateAction<
      'mainMenu' | 'game_ai' | 'game_host' | 'game_join' | undefined
    >
  >;
  gameType: PeerType;
  userName: string;
};
export const Game = ({ setCurrentScene, gameType, userName }: Props) => {
  const [gameState, dispatch] = useGameState();
  const playerIds = Object.keys(gameState);
  const isGameOver = useMemo(() => checkIsGameOver(gameState), [gameState]);
  const [roomCode, setRoomCode] = useState<string | undefined>();
  const roomCodeRef = useRef<HTMLInputElement>(null);
  const [peerId, connectionState] = usePeerJs(
    ...([gameType, userName, roomCode].filter(Boolean) as Parameters<
      typeof usePeerJs
    >)
  );

  const scores = useMemo(() => {
    return Object.entries(gameState)
      .map(([playerId, data]) => ({
        playerId,
        score: scorePlayer(data.board),
      }))
      .sort((a, b) => (a.score > b.score ? -1 : 1));
  }, [gameState]);

  useEffect(() => {
    if (Object.values(gameState).every((p) => p.type === 'local')) return;
    const { aiPlayer } = getPlayersByType(gameState);
    if (aiPlayer.type === 'remote') return;
    if (!isGameOver && aiPlayer.turn && aiPlayer.roll) {
      setTimeout(() => {
        const moves = evaluate(gameState, 5);
        const bestMove = moves.reduce((best, next) => {
          if (best.score === next.score)
            return Math.random() > 0.5 ? best : next;
          return best.score < next.score ? next : best;
        }, moves[0]).move;
        dispatch(bestMove);
        dispatch({ type: 'rollDice' });
      }, 500);
    }
  }, [gameState, dispatch, isGameOver]);

  return (
    <>
      <Player playerId={userName} />
      <Board userName={userName} />
      <Player playerId={playerIds.filter((i) => i !== userName)[0]} reverse />
      {isGameOver && (
        <OverlayContainer>
          <Dialog title={`${scores[0].playerId} Wins!`}>
            <Flex padding="md" flexDirection="column">
              <Text>{`${scores[0].score} - ${scores[1].score}`}</Text>
            </Flex>
            <Flex gap="md" justifyContent="flex-end">
              <Button
                variant="secondary"
                size="small"
                onClick={() => setCurrentScene('mainMenu')}
              >
                Main Menu
              </Button>
              <Button
                size="small"
                onClick={() => dispatch({ type: 'newGame' })}
              >
                Play Again
              </Button>
            </Flex>
          </Dialog>
        </OverlayContainer>
      )}
      {gameType === 'host' && connectionState === 'disconnected' && (
        <OverlayContainer>
          <Dialog title="Waiting for opponent">
            <Flex padding="md" flexDirection="column">
              <Text>{`Room: ${peerId}`}</Text>
            </Flex>
            <Flex gap="md" justifyContent="flex-end">
              <Button
                size="small"
                variant="secondary"
                onClick={() => setCurrentScene('mainMenu')}
              >
                Cancel
              </Button>
            </Flex>
          </Dialog>
        </OverlayContainer>
      )}
      {gameType === 'join' && connectionState === 'disconnected' && (
        <OverlayContainer>
          <Dialog title="Enter room code">
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                setRoomCode(roomCodeRef.current?.value.toUpperCase());
              }}
            >
              <Flex padding="md" flexDirection="column">
                <Text as="label">Room code:</Text>
                <TextInput
                  ref={roomCodeRef}
                  placeholder="ABCDEF"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                />
              </Flex>
              <Flex gap="md" justifyContent="flex-end">
                <Button
                  size="small"
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentScene('mainMenu')}
                >
                  Cancel
                </Button>
                <Button size="small">Join</Button>
              </Flex>
            </form>
          </Dialog>
        </OverlayContainer>
      )}
    </>
  );
};
