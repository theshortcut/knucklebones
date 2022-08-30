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

export type MoveActions = {
  type: 'playDice';
  payload: Omit<PlayDicePayload, 'draft'>;
};

const initialColumn: Column = [null, null, null];

export const setup = (
  player1Id = 'Player 1',
  player2Id = 'Player 2'
): GameState => ({
  [player1Id]: {
    board: [[...initialColumn], [...initialColumn], [...initialColumn]],
    roll: null,
  },
  [player2Id]: {
    board: [[...initialColumn], [...initialColumn], [...initialColumn]],
    roll: null,
  },
});

export const moveReducer: Reducer<GameState, MoveActions> = (draft, action) => {
  switch (action.type) {
    case 'playDice':
      return playDice({ draft, ...action.payload });
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
  const column = draft[playerId].board[columnId];
  const slotId = getEmptyColumnIndex(column);
  if (slotId === -1) throw new Error('Column is full');
  column[slotId] = diceValue;
  return draft;
};

export const rollDice = (draft: GameState): GameState => {
  const oldPlayerId = getCurrentPlayerId(draft);
  const newPlayerId = Object.keys(draft).find((v) => v !== oldPlayerId);
  if (!newPlayerId) throw new Error('Unable to find next player');
  draft[oldPlayerId].roll = null;
  draft[newPlayerId].roll = getRandomDiceValue();
  return draft;
};
