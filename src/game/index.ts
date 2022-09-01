import { Reducer } from 'use-immer';

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
export type CellValue = DiceValue | null;
export type Column = [CellValue, CellValue, CellValue];
export type PlayerArea = [Column, Column, Column];

export type PlayerData = {
  board: PlayerArea;
  roll: CellValue;
};

export type GameState = Record<string, PlayerData>;

export type MoveActions =
  | { type: 'newGame' }
  | {
      type: 'playDice';
      payload: Omit<PlayDicePayload, 'draft'>;
    }
  | {
      type: 'startTurn';
    };

const initialColumn: Column = [null, null, null];

export const setup = (
  player1Id = 'Player 1',
  player2Id = 'Player 2'
): GameState => {
  const startingPlayer = Math.random() >= 0.5 ? player1Id : player2Id;
  return {
    [player1Id]: {
      board: [[...initialColumn], [...initialColumn], [...initialColumn]],
      roll: startingPlayer === player1Id ? getRandomDiceValue() : null,
    },
    [player2Id]: {
      board: [[...initialColumn], [...initialColumn], [...initialColumn]],
      roll: startingPlayer === player2Id ? getRandomDiceValue() : null,
    },
  };
};

export const moveReducer: Reducer<GameState, MoveActions> = (draft, action) => {
  switch (action.type) {
    case 'newGame':
      return setup(...Object.keys(draft));
    case 'playDice':
      return playDice({ draft, ...action.payload });
    case 'startTurn':
      return startTurn({ draft });
  }
};

const getCurrentPlayerId = (g: GameState): string => {
  const playerId = Object.entries(g).find(([, v]) => v.roll !== null)?.[0];
  if (!playerId) throw new Error('Unable to find current player');
  return playerId;
};

const getCurrentPlayerIdAndDice = (
  g: GameState
): { playerId: string; diceValue: DiceValue } =>
  Object.entries(g)
    .filter(([, v]) => v.roll !== null)
    .map(([playerId, playerData]) => ({
      playerId,
      diceValue: playerData.roll as DiceValue,
    }))[0];

const getEmptyColumnIndex = (c: Column) => c.findIndex((v) => v === null);

const getRandomDiceValue = (): DiceValue =>
  Math.ceil(Math.random() * 6) as DiceValue;

type PlayDicePayload = {
  draft: GameState;
  columnId: number;
};
export const playDice = ({ draft, columnId }: PlayDicePayload): GameState => {
  const { playerId, diceValue } = getCurrentPlayerIdAndDice(draft);
  // add dice to players column
  const column = draft[playerId].board[columnId];
  const slotId = getEmptyColumnIndex(column);
  if (slotId === -1) throw new Error('Column is full');
  // remove matching dice from opponent column
  const opponentId = Object.keys(draft).find((v) => v !== playerId);
  if (!opponentId) throw new Error('Unalbe to find opponent');
  const opponentColumn = draft[opponentId].board[columnId];
  draft[opponentId].board[columnId] = opponentColumn
    .filter((d) => d !== diceValue)
    .concat(Array(3).fill(null))
    .slice(0, 3) as Column;
  column[slotId] = diceValue;
  // check if this ends the game
  if (isGameOver(draft)) {
    draft[playerId].roll = null;
    return draft;
  }
  // game not over, start the next turn
  return startTurn({ draft });
};

export const startTurn = ({ draft }: { draft: GameState }): GameState => {
  const oldPlayerId = getCurrentPlayerId(draft);
  const newPlayerId = Object.keys(draft).find((v) => v !== oldPlayerId);
  if (!newPlayerId) throw new Error('Unable to find next player');
  draft[oldPlayerId].roll = null;
  draft[newPlayerId].roll = getRandomDiceValue();
  return draft;
};

export const scoreColumn = (column: Column): number => {
  return [...column].sort().reduce((result, item, index, sorted) => {
    if (!item) return result;
    if (index === 2 && sorted[0] === item && sorted[1] === item)
      return item * 9;
    if (index > 0 && sorted[index - 1] === item) return result + item * 3;
    return result + item;
  }, 0);
};

export const scorePlayer = (player: PlayerArea): number => {
  return player.reduce((result, column) => result + scoreColumn(column), 0);
};

export const isGameOver = (gameState: GameState): boolean =>
  Object.values(gameState).some((p) =>
    p.board.every((c) => getEmptyColumnIndex(c) === -1)
  );
