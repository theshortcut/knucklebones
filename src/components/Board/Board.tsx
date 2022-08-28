import { Dice, DiceValue, EmptySlot } from '@/components/Dice';
import { Text } from '../Text';
import { board, column, playerArea } from './Board.css';

const PlayerArea = ({
  data,
  playerIdx,
}: {
  data: (DiceValue | null)[][];
  playerIdx: number;
}): JSX.Element => (
  <div className={playerArea}>
    {data.map((column, columnIdx) => (
      <Column data={column} reverse={playerIdx === 1} key={columnIdx} />
    ))}
  </div>
);

const Column = ({
  data,
  reverse,
  ...props
}: {
  data: (DiceValue | null)[];
  reverse: boolean;
}): JSX.Element => (
  <div className={column({ reverse })} {...props}>
    <Text textAlign="center">0</Text>
    {data.map((dice, diceIdx) =>
      dice ? <Dice value={dice} key={diceIdx} /> : <EmptySlot key={diceIdx} />
    )}
  </div>
);

const gameState = [
  [
    [1, null, null],
    [1, 2, null],
    [1, 2, 3],
  ],
  [
    [4, null, null],
    [4, 5, null],
    [4, 5, 6],
  ],
] as (DiceValue | null)[][][];

export const Board = () => {
  return (
    <div className={board}>
      {gameState.map((player, playerIdx) => (
        <PlayerArea key={playerIdx} data={player} playerIdx={playerIdx} />
      ))}
    </div>
  );
};
