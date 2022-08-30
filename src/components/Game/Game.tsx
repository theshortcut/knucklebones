import { Board } from '@/components/Board';
import { useGameState } from '@/components/GameStateContext';
import { Player } from '@/components/Player';

export const Game = () => {
  const [gameState] = useGameState();
  const playerIds = Object.keys(gameState);
  return (
    <>
      <Player playerId={playerIds[0]} />
      <Board />
      <Player playerId={playerIds[1]} reverse />
    </>
  );
};
