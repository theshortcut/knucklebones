import { atoms } from '@/styles/atoms.css';
import { style } from '@vanilla-extract/css';

export const mainMenu = style([
  atoms({
    display: 'flex',
    flexDirection: 'row',
    placeItems: 'center',
  }),
  {
    flex: 1,
  },
]);

export const formContainer = atoms({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',
});

export const buttonContainer = atoms({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',
});
