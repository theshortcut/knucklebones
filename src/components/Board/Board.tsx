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
  userName,
}: {
  data: PlayerAreaType;
  playerId: string;
  userName: string;
}): JSX.Element => {
  const [gameState] = useGameState();
  const isActive = gameState[playerId].turn && playerId === userName;
  return (
    <div className={playerArea}>
      {data.map((column, columnIdx) => (
        <Column
          data={column}
          isActive={isActive}
          reverse={playerId !== userName}
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
        dispatch({ type: 'playDice', payload: { columnId: idx, roll: true } });
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

export const Board = ({ userName }: { userName: string }) => {
  const [gameState] = useGameState();
  const [opponentId, opponentData] = Object.entries(gameState).filter(
    ([k]) => k !== userName
  )[0];
  return (
    <div className={board}>
      <PlayerArea
        data={gameState[userName].board}
        playerId={userName}
        userName={userName}
      />
      <PlayerArea
        data={opponentData.board}
        playerId={opponentId}
        userName={userName}
      />
    </div>
  );
};
