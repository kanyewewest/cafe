namespace Color {
  export type base = "pink" | "orange" | "yellow";
  export type weight = 100 | 200;
  export type variable = {
    [key in weight]: string;
  };
  export const toVar: Record<base, variable> = {
    pink: {
      100: "#fbacfa",
      200: "#cc74bc",
    },
    orange: {
      100: "#fa7454",
      200: "#fe5f38",
    },
    yellow: {
      100: "#ffdc69",
      200: "#f3c71d",
    },
  };

  export const toCssVar = (
    colorVar: variable,
    weight: weight,
  ) => `--color-${colorVar}-${weight}`;
}

export default Color;
