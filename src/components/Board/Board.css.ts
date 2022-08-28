import { mediaQueries, vars } from '@/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const board = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  justifyContent: 'center',
});

export const playerArea = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: vars.space.md,
  flex: 1,
  width: '100%',

  '@media': {
    [mediaQueries.lg]: {
      padding: vars.space.lg,
    },
  },
});

export const column = recipe({
  base: {
    display: 'flex',
    gap: vars.space.md,
    alignItems: 'center',

    '@media': {
      [mediaQueries.lg]: {
        gap: vars.space.lg,
      },
    },
  },
  variants: {
    reverse: {
      true: {
        flexDirection: 'column-reverse',
      },
      false: {
        flexDirection: 'column',
      },
    },
  },
});
