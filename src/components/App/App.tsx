import { app, main } from './App.css';
import { Text } from '@/components/Text';
import { Player } from '../Player/Player';
import { Board } from '../Board';

export const App = () => {
  return (
    <div className={app}>
      <Text as="h1" size="large" type="heading" textAlign="center">
        Knucklebones
      </Text>
      <main className={main}>
        <Player />
        <Board />
        <Player />
      </main>
    </div>
  );
};
