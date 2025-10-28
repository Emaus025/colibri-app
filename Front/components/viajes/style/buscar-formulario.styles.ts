import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  formulario: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.borde,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  boton: {
    backgroundColor: Colors.light.primario,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: Colors.light.textoContraste,
  },
});