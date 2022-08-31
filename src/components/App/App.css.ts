import { style } from '@vanilla-extract/css';
import { atoms } from '@/styles/atoms.css';
import { mediaQueries } from '@/styles/theme.css';

export const app = style([
  atoms({ display: 'grid', fontFamily: 'system' }),
  {
    gridTemplateRows: 'max-content 1fr',
    height: '100vh',
  },
]);

export const main = style([
  atoms({ display: 'grid' }),
  {
    gridTemplateRows: '1fr 5fr 1fr',

    '@media': {
      [mediaQueries.lg]: {
        gridTemplateRows: 'auto',
        gridTemplateColumns: '1fr 2fr 1fr',
      },
    },
  },
]);
