import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

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
  color: vars.color.bodyText,
  height: '100%',
  '@media': {
    '(prefers-color-scheme: light)': {
      background: vars.color.bodyText,
      color: vars.color.background,
    },
  },
});

globalStyle('html, #root', {
  height: '100%',
});
