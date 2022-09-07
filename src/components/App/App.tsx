import { OverlayProvider } from 'react-aria';
import { app, main, overlayContainer } from './App.css';
import { Text } from '@/components/Text';
import { GameStateProvider } from '@/components/GameStateContext';
import { Game } from '@/components/Game';
import { useLocalStorage } from '@/utils/useLocalStorage';
import { MainMenu } from '../MainMenu';
import { PeerType, setup } from '@/game';
import { Button } from '../Button';
import { useMemo } from 'react';

const sceneNames = ['mainMenu', 'game_ai', 'game_host', 'game_join'] as const;
type SceneName = typeof sceneNames[number];

export const App = () => {
  const [currentScene, setCurrentScene] = useLocalStorage<SceneName>(
    'currentScene',
    'mainMenu'
  );

  const [userName, setUserName] = useLocalStorage('userName', 'Player 1');

  const gameType = useMemo(
    () => currentScene?.split('_')[1] as PeerType,
    [currentScene]
  );

  if (!(sceneNames as unknown as string[]).includes(currentScene ?? '')) {
    setCurrentScene('mainMenu');
    return null;
  }

  return (
    <OverlayProvider className={overlayContainer}>
      <div className={app}>
        <nav>
          <Text as="h1" size="large" type="heading" textAlign="center">
            Knucklebones
          </Text>
          {currentScene?.startsWith('game') && (
            <Button
              type="secondary"
              onClick={() => setCurrentScene('mainMenu')}
            >
              Exit
            </Button>
          )}
        </nav>
        <main className={main}>
          {currentScene?.startsWith('game') && (
            <GameStateProvider
              value={setup(
                userName ?? 'Player 1',
                'Player 2',
                gameType === 'ai' ? 'easyAI' : 'remote'
              )}
            >
              <Game
                setCurrentScene={setCurrentScene}
                gameType={gameType}
                userName={userName ?? 'Player 1'}
              />
            </GameStateProvider>
          )}
          {currentScene === 'mainMenu' && (
            <MainMenu
              setCurrentScene={setCurrentScene}
              setUserName={setUserName}
              userName={userName}
            />
          )}
        </main>
      </div>
    </OverlayProvider>
  );
};
