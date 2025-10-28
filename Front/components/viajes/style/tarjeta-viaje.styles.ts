import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.light.borde,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    gap: 8,
    flex: 1,
  },
  ruta: {
    marginBottom: 10,
  },
  detalles: {
    gap: 4,
  },
  margenTop4: {
    marginTop: 4,
  },
  boton: {
    backgroundColor: Colors.light.primario,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  textoBoton: {
    color: Colors.light.textoContraste,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;