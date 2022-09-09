import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { TextInput } from '@/components/TextInput';
import { buttonContainer, formContainer, mainMenu } from './MainMenu.css';
import { Flex } from '@/components/Flex';

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
        <Flex flexDirection="column" gap="lg">
          <Flex flexDirection="column">
            <Text as="label">Username</Text>
            <TextInput
              value={userName}
              onChange={(e) => {
                setUserName(e.currentTarget.value);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.value) setUserName('Player 1');
              }}
            />
          </Flex>
          <div>
            <Text as="h2" size="medium" type="heading">
              Rules
            </Text>
            <Text as="p">
              Players alternate placing dice in their 3x3 board. Placing a
              matching die in your own column multiplies the dice value.
            </Text>
            <Text as="p">
              Any matching dice in your opponents column are removed from their
              board.
            </Text>
            <Text as="p">The game ends when a player fills their board.</Text>
          </div>
        </Flex>
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
