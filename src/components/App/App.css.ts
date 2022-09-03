import { style } from '@vanilla-extract/css';
import { atoms } from '@/styles/atoms.css';

export const app = style([
  atoms({ display: 'grid', fontFamily: 'system' }),
  {
    gridTemplateRows: 'max-content 1fr',
    height: '100%',
    minHeight: ['100vh', '-webkit-fill-available'],
  },
]);

export const main = style([
  atoms({
    display: 'flex',
    flexDirection: {
      sm: 'column-reverse',
      lg: 'row',
    },
  }),
  {
    flex: 1,
    justifySelf: 'stretch',
    alignSelf: 'stretch',
    height: '100%',
    overflow: 'hidden',
  },
]);

export const overlayContainer = style({ height: '100%' });
