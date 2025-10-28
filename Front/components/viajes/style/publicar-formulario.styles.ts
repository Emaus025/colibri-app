import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  grupo: {
    backgroundColor: Colors.light.superficie,
    borderWidth: 1,
    borderColor: Colors.light.borde,
    padding: 15,
    borderRadius: 8,
    gap: 10,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.borde,
    borderRadius: 6,
    padding: 10,
  },
  boton: {
    backgroundColor: Colors.light.primario,
    paddingVertical: 10,
    borderRadius: 6,
  },
  textoBoton: {
    color: Colors.light.textoContraste,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;