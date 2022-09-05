import { Draft } from 'immer';
import { Reducer } from 'use-immer';
import {
  getCurrentPlayerId,
  getCurrentPlayerIdAndDice,
  getEmptyColumnIndex,
  getRandomDiceValue,
} from './helpers';

export * from './types';
export * from './score';
export * from './helpers';
import { Column, DiceValue, GameState, MoveActions, PlayerType } from './types';

const initialColumn: Column = [null, null, null];

export const setup = (
  player1Id = 'Player 1',
  player2Id = 'Player 2',
  player2Type: PlayerType = 'easyAI'
): GameState => {
  const startingPlayer = Math.random() >= 0.5 ? player1Id : player2Id;
  return {
    [player1Id]: {
      board: [[...initialColumn], [...initialColumn], [...initialColumn]],
      roll: startingPlayer === player1Id ? getRandomDiceValue() : null,
      turn: startingPlayer === player1Id ? true : false,
      type: 'local',
    },
    [player2Id]: {
      board: [[...initialColumn], [...initialColumn], [...initialColumn]],
      roll: startingPlayer === player2Id ? getRandomDiceValue() : null,
      turn: startingPlayer === player2Id ? true : false,
      type: player2Type,
    },
  };
};

export const moveReducer: Reducer<GameState, MoveActions> = (draft, action) => {
  switch (action.type) {
    case 'newGame':
      return setup(...Object.keys(draft));
    case 'rollDice':
      return rollDice({ draft, ...(action.payload || {}) });
    case 'playDice':
      return playDice({ draft, ...action.payload });
  }
};

type PlayDicePayload = {
  draft: Draft<GameState>;
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
  draft[playerId].roll = null;
  draft[playerId].turn = false;
  draft[opponentId].turn = true;
  return draft;
};

type RollDicePayload = {
  draft: Draft<GameState>;
  diceValue?: DiceValue;
};
export const rollDice = ({ draft, diceValue }: RollDicePayload): GameState => {
  const playerId = getCurrentPlayerId(draft);
  draft[playerId].roll = diceValue ?? getRandomDiceValue();
  return draft;
};
