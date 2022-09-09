import {
  atoms,
  flexAlignValues,
  flexDirectionValues,
} from '@/styles/atoms.css';
import { vars } from '@/styles/theme.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const flex = recipe({
  base: atoms({
    display: 'flex',
  }),
  variants: {
    alignItems: buildVariants(flexAlignValues, 'alignItems'),
    justifyContent: buildVariants(flexAlignValues, 'justifyContent'),
    placeItems: buildVariants(flexAlignValues, 'placeItems'),
    flexDirection: buildVariants(flexDirectionValues, 'flexDirection'),
    gap: buildVariants(
      Object.keys(vars.space) as (keyof typeof vars['space'])[],
      'gap'
    ),
    padding: buildVariants(
      Object.keys(vars.space) as (keyof typeof vars['space'])[],
      'padding'
    ),
  },
});

function buildVariants<T extends string | number>(
  keys: readonly T[],
  property: string
): { [Property in T]: string } {
  return keys.reduce((acc, value) => {
    acc[value] = atoms({ [property]: value });
    return acc;
  }, {} as { [Property in T]: string });
}

export type FlexVariants = RecipeVariants<typeof flex>;
