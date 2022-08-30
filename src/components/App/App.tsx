import { app, main } from './App.css';
import { Text } from '@/components/Text';
import { GameStateProvider } from '@/components/GameStateContext';
import { Game } from '@/components/Game';

export const App = () => {
  return (
    <GameStateProvider>
      <div className={app}>
        <Text as="h1" size="large" type="heading" textAlign="center">
          Knucklebones
        </Text>
        <main className={main}>
          <Game />
        </main>
      </div>
    </GameStateProvider>
  );
};
