import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/theme.css";

/**
 * Do not unset attributes of elements listed here.
 */
const parentElements = ["canvas", "iframe", "img", "svg", "video"];
const childElements = [
  "svg *",
  "symbol *", // Mozilla Firefox Bug
];

/**
 * Unset all except `display` property.
 */
globalStyle(`*:not(${[...parentElements, ...childElements].join()})`, {
  all: "unset",
  display: "revert",
});

/**
 * Best practice of `box-sizing` property.
 */
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

export const AppStyles = style({
  fontFamily: vars.font.system,
});
