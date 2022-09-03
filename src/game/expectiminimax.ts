import { DiceValue, GameState, GameStateNode, MoveActions } from './types';
import { getPlayersByType, getValidActions, isGameOver } from './helpers';
import { getScoreDiff } from './score';
import produce from 'immer';
import { moveReducer } from '.';

export function expectiMiniMax(node: GameStateNode, score = 0): number {
  const { opponent, aiPlayer } = getPlayersByType(node.state);
  // if node is a terminal node or depth = 0
  if (node.depth === 0 || isGameOver(node.state)) {
    // return the heuristic value of node
    return score + getScoreDiff({ opponent, aiPlayer });
  }
  // if the adversary is to play at the node
  if (opponent.turn && node.move.type === 'playDice') {
    // return value of minimum-valued child node
    return (
      score + Math.min(...node.children.map((n) => expectiMiniMax(n, score)))
    );
  }
  // if we are to play at node
  if (aiPlayer.turn && node.move.type === 'playDice') {
    // return the value of maximum valued child node
    return (
      score + Math.max(...node.children.map((n) => expectiMiniMax(n, score)))
    );
  }
  // if random event at node
  if (node.move.type === 'rollDice') {
    // return weighted average of all child nodes values
    return (
      score +
      node.children.reduce(
        (avg, n, _, { length }) => avg + expectiMiniMax(n, score) / length,
        0
      )
    );
  }
  return score + getScoreDiff({ opponent, aiPlayer });
}

function buildNode(
  gameState: GameState,
  move: MoveActions,
  depth = 10
): GameStateNode {
  return {
    state: gameState,
    depth: depth,
    move,
    children:
      depth - 1 < 0
        ? []
        : getValidActions(gameState).flatMap((action) => {
            if (action.type === 'rollDice')
              return buildRollNodes(gameState, depth);
            const newState = produce(gameState, (draft) => {
              return moveReducer(draft, action);
            });
            return buildNode(newState, action, depth - 1);
          }),
  };
}

function buildRollNodes(gameState: GameState, depth = 10): GameStateNode[] {
  return Array(6)
    .fill(null)
    .map((_, idx) => idx + 1)
    .map((diceValue) => {
      const action: MoveActions = {
        type: 'rollDice',
        payload: { diceValue: diceValue as DiceValue },
      };
      const newState = produce(gameState, (draft) => {
        return moveReducer(draft, action);
      });
      return buildNode(newState, action, depth - 1);
    });
}

export function evaluate(gameState: GameState, depth = 10) {
  return getValidActions(gameState)
    .map((action) => {
      const newState = produce(gameState, (draft) =>
        moveReducer(draft, action)
      );
      return buildNode(newState, action, depth);
    })
    .map((node) => ({
      score: expectiMiniMax(node),
      move: node.move,
    }));
}
