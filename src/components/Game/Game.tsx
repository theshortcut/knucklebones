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
  scorePlayer,
} from '@/game';
import { evaluate } from '@/game/expectiminimax';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';

type Props = {
  setCurrentScene: Dispatch<
    SetStateAction<
      'mainMenu' | 'game_ai' | 'game_host' | 'game_join' | undefined
    >
  >;
  gameType: 'ai' | 'host' | 'join';
};
export const Game = ({ setCurrentScene, gameType }: Props) => {
  const [gameState, dispatch] = useGameState();
  const playerIds = Object.keys(gameState);
  const isGameOver = useMemo(() => checkIsGameOver(gameState), [gameState]);

  const scores = useMemo(() => {
    return Object.entries(gameState)
      .map(([playerId, data]) => ({
        playerId,
        score: scorePlayer(data.board),
      }))
      .sort((a, b) => (a.score > b.score ? -1 : 1));
  }, [gameState]);

  useEffect(() => {
    const { aiPlayer } = getPlayersByType(gameState);
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
      <Player playerId={playerIds[0]} />
      <Board />
      <Player playerId={playerIds[1]} reverse />
      {isGameOver && (
        <OverlayContainer>
          <Dialog title={`${scores[0].playerId} Wins!`}>
            <Text>{`${scores[0].score} - ${scores[1].score}`}</Text>
            <Button onClick={() => dispatch({ type: 'newGame' })}>
              Play Again
            </Button>
            <Button onClick={() => setCurrentScene('mainMenu')}>
              Main Menu
            </Button>
          </Dialog>
        </OverlayContainer>
      )}
    </>
  );
};
