import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isSmallPhone = width < 360;
  const isPhone = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLarge = width >= 1024;

  const numColumns = isTablet || isLarge ? 2 : 1;
  const containerMaxWidth = isLarge ? 1024 : isTablet ? 768 : width;
  const gap = isPhone ? 12 : 16;

  return { width, height, isSmallPhone, isPhone, isTablet, isLarge, numColumns, containerMaxWidth, gap };
}