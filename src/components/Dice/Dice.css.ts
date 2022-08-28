import { vars } from '@/theme.css';
import { style } from '@vanilla-extract/css';

export const dice = style({
  display: 'grid',
  gridTemplateAreas: `
    "a . c"
    "e g f"
    "d . b"
  `,
  aspectRatio: '1',
  backgroundColor: vars.color.bodyText,
  borderRadius: '10%',
  gridGap: '2.5%',
  padding: '5%',
  flex: 1,
});

export const pip = style({
  alignSelf: 'stretch',
  justifySelf: 'stretch',
  borderRadius: '50%',
  backgroundColor: vars.color.background,

  selectors: {
    [`${dice} &:nth-child(2)`]: {
      gridArea: 'b',
    },
    [`${dice} &:nth-child(3)`]: {
      gridArea: 'c',
    },
    [`${dice} &:nth-child(4)`]: {
      gridArea: 'd',
    },
    [`${dice} &:nth-child(5)`]: {
      gridArea: 'e',
    },
    [`${dice} &:nth-child(6)`]: {
      gridArea: 'f',
    },
    [`${dice} &:nth-child(odd):last-child`]: {
      gridArea: 'g',
    },
  },
});

export const emptySlot = style({
  borderRadius: '10%',
  border: `1px solid ${vars.color.bodyText}`,
  flex: 1,
  padding: '5%',
  aspectRatio: '1',
});
