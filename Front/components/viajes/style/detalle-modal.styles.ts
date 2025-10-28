import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    borderRadius: 8,
    maxHeight: '90%',
    padding: 20,
  },
  rutaGrande: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borde,
    marginBottom: 10,
  },
  seccion: {
    backgroundColor: Colors.light.superficie,
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  perfilConductor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  filaRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fotoPerfil: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fotoCoche: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 10,
  },
  botonReserva: {
    backgroundColor: Colors.light.primario,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  botonVolver: {
    backgroundColor: Colors.light.peligro,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoBoton: {
    color: Colors.light.textoContraste,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;