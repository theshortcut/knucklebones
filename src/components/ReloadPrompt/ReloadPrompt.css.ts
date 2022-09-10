import { atoms } from '@/styles/atoms.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    padding: 0,
    margin: 0,
  }),
  { width: 0, height: 0 },
]);

export const toast = style([
  atoms({
    margin: 'md',
    padding: 'md',
    borderColor: {
      lightMode: 'background',
      darkMode: 'bodyText',
    },
    textAlign: 'left',
  }),
  {
    position: 'fixed',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    zIndex: 1,
    boxShadow: `3px 4px 5px 0 ${vars.color.background}`,
  },
]);
