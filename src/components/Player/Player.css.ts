import { vars } from '@/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const player = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: vars.space.md,
    flex: 1,
  },
  variants: {
    reverse: {
      true: { flexDirection: 'column-reverse' },
    },
  },
});

export const playerContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});
