import { OverlayContainer } from 'react-aria';
import { Board } from '@/components/Board';
import { Text } from '@/components/Text';
import { Dialog } from '@/components/Dialog';
import { Player } from '@/components/Player';
import { useGameState } from '@/components/GameStateContext';
import {
  getPlayersByType,
  isGameOver as checkIsGameOver,
  scorePlayer,
} from '@/game';
import { useEffect, useMemo } from 'react';
import { evaluate } from '@/game/expectiminimax';

export const Game = () => {
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
            <button onClick={() => dispatch({ type: 'newGame' })}>
              Play Again
            </button>
          </Dialog>
        </OverlayContainer>
      )}
    </>
  );
};
