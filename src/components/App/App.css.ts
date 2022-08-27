import { globalStyle, style } from '@vanilla-extract/css';
import { vars, mediaQueries } from '@/theme.css';

/**
 * Do not unset attributes of elements listed here.
 */
const parentElements = ['canvas', 'iframe', 'img', 'svg', 'video'];
const childElements = [
  'svg *',
  'symbol *', // Mozilla Firefox Bug
];

/**
 * Unset all except `display` property.
 */
globalStyle(`*:not(${[...parentElements, ...childElements].join()})`, {
  all: 'unset',
  display: 'revert',
});

/**
 * Best practice of `box-sizing` property.
 */
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  background: vars.color.background,
});

export const app = style({
  fontFamily: vars.font.system,
  display: 'grid',
  gridTemplateRows: 'max-content 1fr',
  height: '100vh',
});

export const main = style({
  display: 'grid',
  gridTemplateRows: 'repeat(3, 1fr)',
  '@media': {
    [mediaQueries.lg]: {
      gridTemplateRows: 'auto',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});
