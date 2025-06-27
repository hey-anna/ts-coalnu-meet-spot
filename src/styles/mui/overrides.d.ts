import type { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      secondary:string;
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
      restaurant: string;
      cafe: string;
      restaurantLight: string;
      cafeLight: string;
      success: string;
      successBg: string;
      neutral: string;
      shadowLight: string;
      shadowMedium: string;
    };
    user?: {
      main: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      secondary:string;
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
      restaurant: string;
      cafe: string;
      restaurantLight: string;
      cafeLight: string;
      success: string;
      successBg: string;
      neutral: string;
      shadowLight: string;
      shadowMedium: string;
    };
    user?: {
      main: string;
    };
  }
}
