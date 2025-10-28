import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { BuscarFormulario } from '@/components/viajes/BuscarFormulario';
// Eliminamos ListaViajes para evitar anidar listas
// import { ListaViajes } from '@/components/viajes/ListaViajes';
import { PublicarFormulario } from '@/components/viajes/PublicarFormulario';
import { DetalleModal } from '@/components/viajes/DetalleModal';
import { TarjetaViaje } from '@/components/viajes/TarjetaViaje';
import { useViajes } from '@/hooks/use-viajes';
import { useResponsive } from '@/hooks/use-responsive';

export default function ViajesScreen() {
  const {
    criterios,
    nuevoViaje,
    filtrarViajes,
    viajeSeleccionado,
    setCampoBusqueda,
    setCampoNuevoViaje,
    agregarViaje,
    seleccionarViaje,
    cerrarDetalles,
  } = useViajes();

  const { containerMaxWidth, isPhone, gap, numColumns } = useResponsive();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={filtrarViajes}
        keyExtractor={(item, idx) => String((item as any)?.id ?? idx)}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: 8 } : undefined}
        renderItem={({ item }) => (
          <TarjetaViaje viaje={item} onVerDetalles={seleccionarViaje} />
        )}
        ListHeaderComponent={(
          <View style={{ gap }}>
            <ThemedText type="title" style={{ marginBottom: 8 }}>ViajeCompartido</ThemedText>
            <ThemedText style={{ marginBottom: 16 }}>Encuentra o publica viajes para compartir coche</ThemedText>
            <BuscarFormulario
              criterios={criterios}
              setCampo={setCampoBusqueda}
              onSolicitar={(c) => Alert.alert('Solicitud enviada', `Recogida: ${c.from}\nDestino: ${c.to}`)}
            />
            {/* Mensaje cuando la lista está vacía */}
            {filtrarViajes.length === 0 && (
              <ThemedText>No hay viajes disponibles con estos criterios</ThemedText>
            )}
          </View>
        )}
        ListFooterComponent={(
          <PublicarFormulario
            nuevoViaje={nuevoViaje}
            setCampo={setCampoNuevoViaje}
            onPublicar={agregarViaje}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: isPhone ? 16 : 24,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          maxWidth: containerMaxWidth,
          alignSelf: 'center',
          width: '100%',
          gap,
        }}
      />

      <DetalleModal visible={!!viajeSeleccionado} viaje={viajeSeleccionado} onCerrar={cerrarDetalles} />
    </ThemedView>
  );
}