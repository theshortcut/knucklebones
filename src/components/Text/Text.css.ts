import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from '@/styles/atoms.css';

export const text = recipe({
  base: atoms({
    fontFamily: 'system',
    color: { lightMode: 'background', darkMode: 'bodyText' },
  }),
  variants: {
    size: {
      small: atoms({ fontSize: 'sm' }),
      medium: atoms({ fontSize: 'md' }),
      large: atoms({ fontSize: 'lg' }),
    },
    textAlign: {
      left: atoms({ textAlign: 'left' }),
      center: atoms({ textAlign: 'center' }),
      right: atoms({ textAlign: 'right' }),
    },
    type: {
      heading: atoms({
        letterSpacing: 'tight',
        lineHeight: 'relaxed',
        fontWeight: 'semibold',
      }),
      body: atoms({
        letterSpacing: 'normal',
        lineHeight: 'normal',
      }),
    },
  },
  compoundVariants: [
    {
      variants: { type: 'heading', size: 'small' },
      style: atoms({ fontSize: 'md' }),
    },
    {
      variants: { type: 'heading', size: 'medium' },
      style: atoms({ fontSize: 'lg' }),
    },
    {
      variants: { type: 'heading', size: 'large' },
      style: atoms({ fontSize: 'xl' }),
    },
  ],
  defaultVariants: {
    size: 'medium',
    type: 'body',
  },
});

export type TextVariants = RecipeVariants<typeof text>;
