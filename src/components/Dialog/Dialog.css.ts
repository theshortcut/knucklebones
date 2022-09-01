import { atoms } from '@/styles/atoms.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const underlay = style([
  atoms({
    background: {
      lightMode: 'overlaysLight',
      darkMode: 'overlaysDark',
    },
    display: 'flex',
    placeItems: 'center',
  }),
  {
    position: 'fixed',
    zIndex: '100',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
]);

export const overlay = style([
  atoms({
    background: {
      lightMode: 'bodyText',
      darkMode: 'background',
    },
    borderColor: {
      lightMode: 'background',
      darkMode: 'bodyText',
    },
    padding: 'lg',
  }),
  {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: vars.space.lg,
  },
]);
