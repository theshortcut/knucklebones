import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Dispatch, SetStateAction } from 'react';
import { buttonContainer, formContainer, mainMenu } from './MainMenu.css';

type Props = {
  setCurrentScene: Dispatch<
    SetStateAction<
      'mainMenu' | 'game_ai' | 'game_host' | 'game_join' | undefined
    >
  >;
  userName: string | undefined;
  setUserName: Dispatch<SetStateAction<string | undefined>>;
};

export const MainMenu = ({ setCurrentScene, userName, setUserName }: Props) => {
  return (
    <div className={mainMenu}>
      <div className={formContainer}>
        <Text as="label">Username</Text>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className={buttonContainer}>
        <Button onClick={() => setCurrentScene('game_ai')}>
          Single Player
        </Button>
        <Button onClick={() => setCurrentScene('game_host')}>Host Game</Button>
        <Button onClick={() => setCurrentScene('game_join')}>Join Game</Button>
      </div>
    </div>
  );
};
