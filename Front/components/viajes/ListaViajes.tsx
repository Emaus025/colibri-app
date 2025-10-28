import { FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { TarjetaViaje } from '@/components/viajes/TarjetaViaje';
import type { Viaje } from '@/types/viaje';
import { useResponsive } from '@/hooks/use-responsive';
import styles from './style/lista-viajes.styles';

export function ListaViajes({ viajes, onSeleccionarViaje }: { viajes: Viaje[]; onSeleccionarViaje: (v: Viaje) => void }) {
  const { numColumns } = useResponsive();

  return (
    <View>
      <ThemedText type="title" style={styles.titulo}>Viajes Disponibles</ThemedText>
      {viajes.length === 0 ? (
        <ThemedText>No hay viajes disponibles con estos criterios</ThemedText>
      ) : (
        <FlatList
          data={viajes}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? { gap: 8 } : undefined}
          renderItem={({ item }) => (
            <TarjetaViaje viaje={item} onVerDetalles={onSeleccionarViaje} />
          )}
        />
      )}
    </View>
  );
}