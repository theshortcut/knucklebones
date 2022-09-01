import { OverlayContainer } from 'react-aria';
import { Board } from '@/components/Board';
import { Text } from '@/components/Text';
import { Dialog } from '@/components/Dialog';
import { Player } from '@/components/Player';
import { useGameState } from '@/components/GameStateContext';
import { isGameOver as checkIsGameOver } from '@/game';
import { useMemo } from 'react';

export const Game = () => {
  const [gameState, dispatch] = useGameState();
  const playerIds = Object.keys(gameState);
  const isGameOver = useMemo(() => checkIsGameOver(gameState), [gameState]);

  return (
    <>
      <Player playerId={playerIds[0]} />
      <Board />
      <Player playerId={playerIds[1]} reverse />
      {isGameOver && (
        <OverlayContainer>
          <Dialog title="Game Over">
            <Text>thats all folks!</Text>
            <button onClick={() => dispatch({ type: 'newGame' })}>
              Play Again
            </button>
          </Dialog>
        </OverlayContainer>
      )}
    </>
  );
};
