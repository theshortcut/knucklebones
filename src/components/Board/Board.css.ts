import { atoms } from '@/styles/atoms.css';
import { mediaQueries, vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const board = style([
  atoms({
    display: 'flex',
    flexDirection: 'column-reverse',
    placeItems: 'stretch',
  }),
  {
    flex: 5,
    alignSelf: 'stretch',
    justifySelf: 'stretch',

    '@media': {
      [mediaQueries.lg]: {
        flex: 2,
      },
    },
  },
]);

export const playerArea = style([
  atoms({
    display: 'flex',
    flexDirection: 'row',
    placeItems: 'stretch',
    gap: 'md',
    padding: 'md',
  }),
  {
    height: `calc(50% - (2*${vars.space.md}))`,
    width: `calc(100% - (2*${vars.space.md}))`,
  },
]);

export const column = recipe({
  base: style([
    atoms({
      display: 'flex',
      placeItems: 'center',
    }),
    {
      flex: 1,
      overflow: 'hidden',
      borderRadius: vars.space.md,
      selectors: {
        '&:not(:disabled)': {
          boxShadow: `0 0 1px ${vars.color.bodyText}`,
          '@media': {
            '(prefers-color-scheme: light)': {
              boxShadow: `0 0 1px ${vars.color.background}`,
            },
          },
        },
        '&:hover:not(:disabled)': {
          boxShadow: `0 0 2px ${vars.color.bodyText}`,
          '@media': {
            '(prefers-color-scheme: light)': {
              boxShadow: `0 0 2px ${vars.color.background}`,
            },
          },
        },
      },
    },
  ]),
  variants: {
    reverse: {
      true: atoms({
        flexDirection: 'column-reverse',
      }),
      false: atoms({
        flexDirection: 'column',
      }),
    },
  },
});
