import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from '@/styles/atoms.css';
import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '@/styles/theme.css';

export const button = recipe({
  base: style([
    atoms({
      fontFamily: 'system',
      padding: 'md',
      display: 'flex',
      placeItems: 'center',
    }),
    {
      cursor: 'pointer',
      borderRadius: vars.space.sm,
      selectors: {
        '&:focus-visible': {
          boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 2px 3px ${vars.color.buttonPrimaryBackgroundActive}`,
        },
      },
      '@media': {
        [mediaQueries.lightMode]: {
          selectors: {
            '&:focus-visible': {
              boxShadow: `0 0 0 2px ${vars.color.bodyText}, 0 0 2px 3px ${vars.color.buttonPrimaryBackgroundLightActive}`,
            },
          },
        },
      },
    },
  ]),
  variants: {
    size: {
      small: atoms({ fontSize: 'sm' }),
      medium: atoms({ fontSize: 'md' }),
      large: atoms({ fontSize: 'lg' }),
    },
    type: {
      primary: style([
        atoms({
          letterSpacing: 'tight',
          lineHeight: 'relaxed',
          fontWeight: 'semibold',
          color: {
            lightMode: 'buttonPrimaryForegroundLight',
            darkMode: 'buttonPrimaryForeground',
          },
          background: {
            lightMode: 'buttonPrimaryBackgroundLight',
            darkMode: 'buttonPrimaryBackground',
          },
        }),
        {
          selectors: {
            '&:active': {
              background: vars.color.buttonPrimaryBackgroundActive,
              '@media': {
                [mediaQueries.lightMode]: {
                  background: vars.color.buttonPrimaryBackgroundLightActive,
                },
              },
            },
          },
        },
      ]),
      secondary: atoms({
        letterSpacing: 'normal',
        lineHeight: 'normal',
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
    type: 'primary',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
