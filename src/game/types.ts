export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
export type CellValue = DiceValue | null;
export type Column = [CellValue, CellValue, CellValue];
export type PlayerArea = [Column, Column, Column];
export type PlayerType = 'local' | 'remote' | 'easyAI' | 'mediumAI' | 'hardAI';
export type PeerType = 'ai' | 'host' | 'join';

export type PlayerData = {
  readonly board: PlayerArea;
  readonly roll: CellValue;
  readonly turn: boolean;
  readonly type: PlayerType;
  readonly connected?: boolean;
};

export type GameState = {
  readonly [playerId: string]: PlayerData;
};

export type MoveActions =
  | { type: 'newGame' }
  | { type: 'recieveState'; payload: GameState }
  | { type: 'setOpponentName'; payload: { name: string } }
  | { type: 'rollDice'; payload?: { diceValue: DiceValue } }
  | {
      type: 'playDice';
      payload: { columnId: number; roll?: boolean };
    };

export type GameStateNode = {
  children: GameStateNode[];
  state: GameState;
  depth: number;
  move: MoveActions;
};
