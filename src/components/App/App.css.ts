import { style } from '@vanilla-extract/css';
import { atoms } from '@/styles/atoms.css';
import { vars } from '@/styles/theme.css';

export const app = style([
  atoms({ display: 'grid', fontFamily: 'system' }),
  {
    gridTemplateRows: 'max-content 1fr',
    height: '100%',
    minHeight: ['100vh', '-webkit-fill-available'],
  },
]);

export const navContainer = style([
  atoms({ display: 'grid', placeItems: 'center' }),
  {
    gridTemplateAreas: `"button title ."`,
    gridTemplateColumns: '60px 1fr 60px',
    height: vars.space.xl,
  },
]);
export const navTitle = style({ gridArea: 'title' });
export const navButton = style({ gridArea: 'leftButton' });

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
