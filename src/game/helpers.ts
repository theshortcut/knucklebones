import { Column, DiceValue, GameState, MoveActions, PlayerData } from './types';

export const getCurrentPlayerId = (g: GameState): string => {
  const playerId = Object.entries(g).find(([, v]) => v.turn)?.[0];
  if (!playerId) throw new Error('Unable to find current player');
  return playerId;
};

export function getPlayersByType(gameState: GameState): {
  opponent: PlayerData;
  aiPlayer: PlayerData;
} {
  const opponent = Object.values(gameState).find((p) => p.type === 'local');
  const aiPlayer = Object.values(gameState).find((p) => p.type !== 'local');
  if (!opponent || !aiPlayer)
    throw new Error('Unable to find local or ai players');
  return { opponent, aiPlayer };
}

export const getCurrentPlayerIdAndDice = (
  g: GameState
): { playerId: string; diceValue: DiceValue } =>
  Object.entries(g)
    .filter(([, v]) => v.turn)
    .map(([playerId, playerData]) => ({
      playerId,
      diceValue: playerData.roll as DiceValue,
    }))[0];

export const getEmptyColumnIndex = (c: Column) =>
  c.findIndex((v) => v === null);

export const getRandomDiceValue = (): DiceValue =>
  Math.ceil(Math.random() * 6) as DiceValue;

export const isGameOver = (gameState: GameState): boolean =>
  Object.values(gameState).some((p) =>
    p.board.every((c) => getEmptyColumnIndex(c) === -1)
  );

export const getValidActions = (gameState: GameState): MoveActions[] => {
  // if its gameover we got no moves
  if (isGameOver(gameState)) return [];

  const playerId = getCurrentPlayerId(gameState);

  // if the active player has no roll, roll the dice
  if (!gameState[playerId].roll) return [{ type: 'rollDice' }];

  // if the active player has rolled the dice then it is playable on all non-full columns
  return gameState[playerId].board.reduce((moveActions, column, columnId) => {
    if (column.some((d) => d === null))
      moveActions.push({ type: 'playDice', payload: { columnId } });
    return moveActions;
  }, [] as MoveActions[]);
};
