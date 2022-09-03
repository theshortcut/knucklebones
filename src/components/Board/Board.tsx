import { AnimatePresence } from 'framer-motion';
import {
  Column as ColumnType,
  PlayerArea as PlayerAreaType,
  scoreColumn,
} from '@/game';
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
}): JSX.Element => {
  const [gameState] = useGameState();
  const isActive =
    gameState[playerId].turn && gameState[playerId].type === 'local';
  return (
    <div className={playerArea}>
      {data.map((column, columnIdx) => (
        <Column
          data={column}
          isActive={isActive}
          reverse={playerId === 'Player 2'}
          key={columnIdx}
          idx={columnIdx}
        />
      ))}
    </div>
  );
};

const Column = ({
  data,
  reverse,
  idx,
  isActive,
  ...props
}: {
  data: ColumnType;
  reverse: boolean;
  idx: number;
  isActive: boolean;
}): JSX.Element => {
  const [, dispatch] = useGameState();
  return (
    <button
      disabled={!(isActive && data.some((v) => v === null))}
      className={column({ reverse })}
      onClick={() => {
        dispatch({ type: 'playDice', payload: { columnId: idx } });
        dispatch({ type: 'rollDice' });
      }}
      {...props}
    >
      <AnimatePresence>
        <Text textAlign="center">{scoreColumn(data)}</Text>
        {data.map((dice, diceIdx) =>
          dice ? (
            <Dice value={dice} key={diceIdx} />
          ) : (
            <EmptySlot key={diceIdx} />
          )
        )}
      </AnimatePresence>
    </button>
  );
};

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
