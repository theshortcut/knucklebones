import { Column, PlayerArea, PlayerData } from './types';

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

export function getScoreDiff({
  opponent,
  aiPlayer,
}: {
  opponent: PlayerData;
  aiPlayer: PlayerData;
}): number {
  const opponentScore = scorePlayer(opponent.board);
  const aiPlayerScore = scorePlayer(aiPlayer.board);
  return aiPlayerScore - opponentScore;
}
