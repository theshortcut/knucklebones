import { vars } from '@/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const board = style({});

export const playerArea = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: vars.space.lg,
  padding: vars.space.lg,
});

export const column = recipe({
  base: {
    display: 'flex',
    gap: vars.space.lg,
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
