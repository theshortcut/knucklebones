import { Dice, DiceValue } from '@/components/Dice';
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
      <Column data={column} reverse={playerIdx === 0} key={columnIdx} />
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
    {data.map((dice, diceIdx) =>
      dice ? <Dice value={dice} key={diceIdx} /> : null
    )}
  </div>
);

const gameState = [
  [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
  ],
  [
    [4, 5, 6],
    [4, 5, 6],
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
