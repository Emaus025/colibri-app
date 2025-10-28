import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View } from 'react-native';
import styles from './style/estrellas-valoracion.styles';

export function EstrellasValoracion({ rating, size = 18, color = '#FFD700' }: { rating: number; size?: number; color?: string }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.row}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <MaterialIcons key={`star-${i}`} name="star" size={size} color={color} />
      ))}
      {hasHalfStar && <MaterialIcons name="star-half" size={size} color={color} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <MaterialIcons key={`star-empty-${i}`} name="star-border" size={size} color="#ccc" />
      ))}
    </View>
  );
}