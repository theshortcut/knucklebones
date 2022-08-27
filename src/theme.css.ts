import { createGlobalTheme } from "@vanilla-extract/css";
import { gray } from "@radix-ui/colors";

export const vars = createGlobalTheme(":root", {
  color: {
    background: gray.gray12,
    bodyText: gray.gray4,
  },
  font: {
    system: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
});
