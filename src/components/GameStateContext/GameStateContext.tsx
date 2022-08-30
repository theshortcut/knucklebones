import { setup, moveReducer, GameState, MoveActions } from '@/game';
import { createContext, Dispatch, ReactNode, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const GameStateContext = createContext<
  [GameState, Dispatch<MoveActions>]
>([setup(), (s) => s]);

type GameStateProviderProps = {
  children: ReactNode;
  value?: GameState;
};
export const GameStateProvider = ({
  children,
  value = setup(),
}: GameStateProviderProps) => {
  const reducer = useImmerReducer(moveReducer, value);

  return (
    <GameStateContext.Provider value={reducer}>
      {children}
    </GameStateContext.Provider>
  );
};

export function useGameState() {
  return useContext(GameStateContext);
}
