import { atoms } from '@/styles/atoms.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const player = recipe({
  base: style([
    atoms({
      display: 'flex',
      placeItems: 'center',
      flexDirection: 'column-reverse',
      gap: 'md',
    }),
    {
      flex: 1,
    },
  ]),
  variants: {
    reverse: {
      true: atoms({ flexDirection: 'column-reverse' }),
    },
  },
});

export const playerContainer = style([
  atoms({ display: 'flex', placeItems: 'center' }),
  {
    flex: 1,
  },
]);
