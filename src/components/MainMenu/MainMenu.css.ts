import { atoms } from '@/styles/atoms.css';
import { style } from '@vanilla-extract/css';

export const mainMenu = style([
  atoms({
    display: 'flex',
    flexDirection: 'row',
    gap: 'lg',
    padding: 'md',
  }),
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
]);

export const formContainer = style([
  atoms({
    display: 'flex',
    flexDirection: 'column',
    gap: 'sm',
  }),
  { maxWidth: '20rem' },
]);

export const buttonContainer = atoms({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',
});
