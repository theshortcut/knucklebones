import { DiceValue, scorePlayer } from '@/game';
import { Text } from '@/components/Text';
import { Dice, EmptySlot } from '@/components/Dice';
import { useGameState } from '@/components/GameStateContext';
import { player, playerContainer } from './Player.css';

type Props = {
  playerId: string;
  reverse?: boolean;
};

export const Player = ({ playerId, reverse = false }: Props): JSX.Element => {
  const [gameState] = useGameState();

  return (
    <div className={playerContainer}>
      <div className={player({ reverse })}>
        <Text>
          {playerId}: {scorePlayer(gameState[playerId].board)}
        </Text>
        {gameState[playerId].roll ? (
          <Dice value={gameState[playerId].roll as DiceValue} />
        ) : (
          <EmptySlot />
        )}
      </div>
    </div>
  );
};
