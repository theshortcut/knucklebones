import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from '@/styles/atoms.css';
import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '@/styles/theme.css';

export const button = recipe({
  base: style([
    atoms({
      fontFamily: 'system',
      letterSpacing: 'tight',
      lineHeight: 'relaxed',
      fontWeight: 'semibold',
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
      small: atoms({ fontSize: 'sm', padding: 'sm' }),
      medium: atoms({ fontSize: 'md', padding: 'md' }),
      large: atoms({ fontSize: 'lg', padding: 'lg' }),
    },
    type: {
      primary: style([
        atoms({
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
      secondary: style([
        atoms({
          letterSpacing: 'normal',
          lineHeight: 'normal',
          borderColor: {
            lightMode: 'buttonPrimaryBackgroundLight',
            darkMode: 'buttonPrimaryBackground',
          },
        }),
        {
          borderWidth: 1,
          borderStyle: 'solid',
          selectors: {
            '&:active': {
              borderColor: vars.color.buttonPrimaryBackgroundActive,
              '@media': {
                [mediaQueries.lightMode]: {
                  background: vars.color.buttonPrimaryBackgroundLightActive,
                },
              },
            },
          },
        },
      ]),
      text: atoms({
        letterSpacing: 'normal',
        lineHeight: 'normal',
        color: {
          lightMode: 'buttonPrimaryForegroundLight',
          darkMode: 'buttonPrimaryForeground',
        },
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
    type: 'primary',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
