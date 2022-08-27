import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '@/theme.css';

export const text = recipe({
  base: {
    fontFamily: vars.font.system,
    color: vars.color.bodyText,
  },
  variants: {
    size: {
      small: { fontSize: vars.font.size.sm },
      medium: { fontSize: vars.font.size.md },
      large: { fontSize: vars.font.size.lg },
    },
    textAlign: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    type: {
      heading: {
        letterSpacing: vars.font.letterSpacing.tight,
        lineHeight: vars.font.lineHeight.relaxed,
        fontWeight: vars.font.weight.semibold,
      },
      body: {
        letterSpacing: vars.font.letterSpacing.normal,
        lineHeight: vars.font.lineHeight.normal,
      },
    },
  },
  compoundVariants: [
    {
      variants: { type: 'heading', size: 'small' },
      style: { fontSize: vars.font.size.md },
    },
    {
      variants: { type: 'heading', size: 'medium' },
      style: { fontSize: vars.font.size.lg },
    },
    {
      variants: { type: 'heading', size: 'large' },
      style: { fontSize: vars.font.size.xl },
    },
  ],
  defaultVariants: {
    size: 'medium',
    type: 'body',
  },
});

export type TextVariants = RecipeVariants<typeof text>;
