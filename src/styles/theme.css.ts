import { createGlobalTheme } from '@vanilla-extract/css';
import { blackA, gray, whiteA, blue } from '@radix-ui/colors';

export const vars = createGlobalTheme(':root', {
  color: {
    background: gray.gray12,
    bodyText: gray.gray4,
    overlaysDark: blackA.blackA11,
    overlaysLight: whiteA.whiteA11,
    buttonPrimaryBackground: blue.blue12,
    buttonPrimaryBackgroundActive: blue.blue11,
    buttonPrimaryBackgroundLight: blue.blue7,
    buttonPrimaryBackgroundLightActive: blue.blue8,
    buttonPrimaryForeground: gray.gray4,
    buttonPrimaryForegroundLight: gray.gray12,
  },
  font: {
    system: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    weight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    size: {
      xxs: '0.75rem',
      xs: '0.875rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.05em',
    },
  },
  space: {
    0: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    xxl: '8rem',
  },
});

export const mediaQueries = {
  sm: 'screen and (min-width: 640px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 1024px)',
  xl: 'screen and (min-width: 1280px)',
  lightMode: '(prefers-color-scheme: light)',
};
