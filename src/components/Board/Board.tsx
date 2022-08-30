import { Column as ColumnType, PlayerArea as PlayerAreaType } from '@/game';
import { Dice, EmptySlot } from '@/components/Dice';
import { useGameState } from '@/components/GameStateContext';
import { Text } from '@/components/Text';
import { board, column, playerArea } from './Board.css';

const PlayerArea = ({
  data,
  playerId,
}: {
  data: PlayerAreaType;
  playerId: string;
}): JSX.Element => (
  <div className={playerArea}>
    {data.map((column, columnIdx) => (
      <Column data={column} reverse={playerId === 'Player 2'} key={columnIdx} />
    ))}
  </div>
);

const Column = ({
  data,
  reverse,
  ...props
}: {
  data: ColumnType;
  reverse: boolean;
}): JSX.Element => (
  <div className={column({ reverse })} {...props}>
    <Text textAlign="center">0</Text>
    {data.map((dice, diceIdx) =>
      dice ? <Dice value={dice} key={diceIdx} /> : <EmptySlot key={diceIdx} />
    )}
  </div>
);

export const Board = () => {
  const [gameState] = useGameState();
  return (
    <div className={board}>
      {Object.entries(gameState).map(([playerId, playerData]) => (
        <PlayerArea
          key={playerId}
          data={playerData.board}
          playerId={playerId}
        />
      ))}
    </div>
  );
};
