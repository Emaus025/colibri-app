/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Texto y fondos
    text: '#212121', // textoPrimario
    background: '#F5F5F5', // fondo
    // Tinta / acentos
    tint: '#2E7D32', // primario
    icon: '#757575', // textoSecundario
    tabIconDefault: '#757575',
    tabIconSelected: '#2E7D32',

    // Paleta extendida
    primario: '#2E7D32',
    primarioClaro: '#4CAF50',
    secundario: '#FF6F00',
    superficie: '#FFFFFF',
    borde: '#E0E0E0',
    textoPrimario: '#212121',
    textoSecundario: '#757575',
    textoContraste: '#FFFFFF',
    exito: '#388E3C',
    advertencia: '#F57C00',
    peligro: '#D32F2F',
    info: '#1976D2',
  },
  dark: {
    // Texto y fondos (modo oscuro)
    text: '#E0E0E0', // textoPrimario
    background: '#121212', // fondo
    // Tinta / acentos
    tint: '#4CAF50', // primario (acento en oscuro)
    icon: '#B0B0B0', // textoSecundario
    tabIconDefault: '#B0B0B0',
    tabIconSelected: '#4CAF50',

    // Paleta extendida
    primario: '#4CAF50',
    primarioClaro: '#81C784',
    secundario: '#FF8F00',
    superficie: '#1E1E1E',
    borde: '#333333',
    textoPrimario: '#E0E0E0',
    textoSecundario: '#B0B0B0',
    textoContraste: '#FFFFFF',
    exito: '#66BB6A',
    advertencia: '#FFB74D',
    peligro: '#EF5350',
    info: '#64B5F6',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
