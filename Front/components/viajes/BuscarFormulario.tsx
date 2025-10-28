import { TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import styles from '@/components/viajes/style/buscar-formulario.styles';
import type { CriteriosBusqueda } from '@/types/viaje';
import { useResponsive } from '@/hooks/use-responsive';

export function BuscarFormulario({ criterios, setCampo, onSolicitar }: { criterios: CriteriosBusqueda; setCampo: (campo: keyof CriteriosBusqueda, valor: string) => void; onSolicitar?: (c: CriteriosBusqueda) => void }) {
  const { isPhone } = useResponsive();

  return (
    <View style={styles.contenedor}>
      <ThemedText type="title">Solicitar Viaje</ThemedText>
      <View style={[styles.formulario, { flexDirection: isPhone ? 'column' : 'row' }]}>
        <TextInput
          style={[styles.input, { minWidth: isPhone ? '100%' : 150 }]}
          placeholder="Lugar de recogida"
          value={criterios.from}
          onChangeText={(t) => setCampo('from', t)}
        />
        <TextInput
          style={[styles.input, { minWidth: isPhone ? '100%' : 150 }]}
          placeholder="Destino"
          value={criterios.to}
          onChangeText={(t) => setCampo('to', t)}
        />
        {/* Eliminado campo fecha */}
      </View>
      <TouchableOpacity style={styles.boton} onPress={() => onSolicitar?.(criterios)}>
        <ThemedText style={styles.textoBoton}>Solicitar Viaje</ThemedText>
      </TouchableOpacity>
    </View>
  );
}