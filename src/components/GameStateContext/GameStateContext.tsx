import { setup, moveReducer, GameState, MoveActions } from '@/game';
import { noop } from '@/utils/noop';
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useImmerReducer } from 'use-immer';

type Observer = (action: MoveActions, gameState: GameState) => void;

export const GameStateContext = createContext<
  [
    GameState,
    Dispatch<MoveActions>,
    (observer: Observer) => void,
    (observer: Observer) => void
  ]
>([setup(), (s) => s, noop, noop]);

type GameStateProviderProps = {
  children: ReactNode;
  value?: GameState;
};
export const GameStateProvider = ({
  children,
  value = setup(),
}: GameStateProviderProps) => {
  const [gameState, dispatch] = useImmerReducer(moveReducer, value);

  const actionRef = useRef<MoveActions | null>();
  const observersRef = useRef<Observer[]>([]);

  const addObserver = useCallback((observer: Observer) => {
    observersRef.current.push(observer);
  }, []);

  const removeObserver = useCallback((observer: Observer) => {
    observersRef.current = observersRef.current.filter((o) => o === observer);
  }, []);

  useEffect(() => {
    const action = actionRef.current;
    if (!action) return;
    observersRef.current.forEach((o) => o(action, gameState));
    actionRef.current = null;
  }, [gameState]);

  const dispatchWithSavedAction = useCallback(
    (action: MoveActions) => {
      actionRef.current = action;
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <GameStateContext.Provider
      value={[gameState, dispatchWithSavedAction, addObserver, removeObserver]}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export function useGameState() {
  return useContext(GameStateContext);
}
