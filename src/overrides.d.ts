import type { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
    };
  }
}
