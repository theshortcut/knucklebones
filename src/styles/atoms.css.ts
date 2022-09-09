import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars, mediaQueries } from './theme.css';

export const flexAlignValues = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
] as const;
export type FlexAlignValues = typeof flexAlignValues[number];
export const flexDirectionValues = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as const;

const responsiveProperties = defineProperties({
  conditions: {
    sm: {},
    md: { '@media': mediaQueries.md },
    lg: { '@media': mediaQueries.lg },
    xl: { '@media': mediaQueries.xl },
  },
  defaultCondition: 'sm',
  properties: {
    display: ['none', 'block', 'flex', 'grid'],
    flexDirection: flexDirectionValues,
    alignItems: flexAlignValues,
    justifyContent: flexAlignValues,
    gap: vars.space,
    columnGap: vars.space,
    rowGap: vars.space,
    gridGap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    fontFamily: { system: vars.font.system },
    fontSize: vars.font.size,
    fontWeight: vars.font.weight,
    lineHeight: vars.font.lineHeight,
    letterSpacing: vars.font.letterSpacing,
    textAlign: ['left', 'center', 'right'],
    overflow: ['hidden', 'visible'],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorModeProperties = defineProperties({
  conditions: {
    darkMode: {},
    lightMode: { '@media': mediaQueries.lightMode },
  },
  defaultCondition: 'darkMode',
  properties: {
    color: vars.color,
    background: vars.color,
    borderColor: vars.color,
  },
});

export const atoms = createSprinkles(responsiveProperties, colorModeProperties);
