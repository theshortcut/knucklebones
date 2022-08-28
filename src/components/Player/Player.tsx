import { Text } from '@/components/Text';
import { EmptySlot } from '../Dice';
import { player, playerContainer } from './Player.css';

type Props = {
  reverse?: boolean;
};

export const Player = ({ reverse = false }: Props): JSX.Element => {
  return (
    <div className={playerContainer}>
      <div className={player({ reverse })}>
        <Text>Player: 0</Text>
        <EmptySlot />
      </div>
    </div>
  );
};
