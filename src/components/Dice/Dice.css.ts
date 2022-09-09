import { atoms } from '@/styles/atoms.css';
import { mediaQueries, vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';
import { playerContainer } from '../Player/Player.css';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const dice = style([
  atoms({
    display: 'grid',
    background: { lightMode: 'background', darkMode: 'bodyText' },
    margin: { sm: 'xs', lg: 'lg' },
  }),
  {
    gridTemplateAreas: `
    "a . c"
    "e g f"
    "d . b"
  `,
    animation: `${fadeIn} 500ms`,
    aspectRatio: '1',
    borderRadius: '10%',
    flex: 1,
    selectors: {
      [`${playerContainer} &`]: {
        justifySelf: 'stretch',
        minWidth: vars.space.lg,
        margin: 0,
        '@media': {
          [mediaQueries.lg]: {
            minWidth: vars.space.xl,
          },
        },
      },
    },
  },
]);

export const pip = style([
  atoms({
    background: {
      lightMode: 'bodyText',
      darkMode: 'background',
    },
  }),
  {
    borderRadius: '50%',
    width: '75%',
    height: '75%',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',

    selectors: {
      [`${dice} &:nth-child(2)`]: {
        gridArea: 'b',
        justifySelf: 'flex-start',
        alignSelf: 'flex-start',
      },
      [`${dice} &:nth-child(3)`]: {
        gridArea: 'c',
        alignSelf: 'flex-end',
        justifySelf: 'flex-start',
      },
      [`${dice} &:nth-child(4)`]: {
        gridArea: 'd',
        alignSelf: 'flex-start',
        justifySelf: 'flex-end',
      },
      [`${dice} &:nth-child(5)`]: {
        gridArea: 'e',
        alignSelf: 'center',
        justifySelf: 'flex-end',
      },
      [`${dice} &:nth-child(6)`]: {
        alignSelf: 'center',
        justifySelf: 'flex-start',
        gridArea: 'f',
      },
      [`${dice} &:nth-child(odd):last-child`]: {
        gridArea: 'g',
        alignSelf: 'center',
        justifySelf: 'center',
      },
    },
  },
]);

export const emptySlot = style([
  atoms({
    margin: { sm: 'xs', lg: 'lg' },
    borderColor: { lightMode: 'background', darkMode: 'bodyText' },
  }),
  {
    borderRadius: '10%',
    borderWidth: 1,
    borderStyle: 'solid',
    flex: 1,
    aspectRatio: '1',
    selectors: {
      [`${playerContainer} &`]: {
        justifySelf: 'stretch',
        minWidth: vars.space.lg,
        margin: 0,
        '@media': {
          [mediaQueries.lg]: {
            minWidth: vars.space.xl,
          },
        },
      },
    },
  },
]);
