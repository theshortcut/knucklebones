import { atoms } from '@/styles/atoms.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const textInput = style([
  atoms({
    borderColor: {
      lightMode: 'textInputBorderLight',
      darkMode: 'textInputBorder',
    },
    fontFamily: 'system',
    lineHeight: 'normal',
    padding: 'sm',
  }),
  {
    borderRadius: vars.space.sm,
    borderWidth: 1,
    borderStyle: 'solid',
  },
]);
