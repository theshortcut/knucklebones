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
    display: 'grid',
    columnGap: 'md',
    padding: { sm: 'md', xl: 'lg' },
  }),
  {
    gridTemplateColumns: 'repeat(3, 1fr)',
    flex: 1,
  },
]);

export const column = recipe({
  base: style([
    atoms({
      display: 'flex',
      gap: { sm: 'sm', xl: 'lg' },
      alignItems: 'center',
    }),
    {
      borderRadius: vars.space.md,
      selectors: {
        'button&': {
          outline: `1px solid ${vars.color.bodyText}`,
          '@media': {
            '(prefers-color-scheme: light)': {
              outlineColor: vars.color.background,
            },
          },
        },
        'button&:hover': {
          outline: `2px solid ${vars.color.bodyText}`,
          '@media': {
            '(prefers-color-scheme: light)': {
              outlineColor: vars.color.background,
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
