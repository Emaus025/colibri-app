import { StyleSheet, View, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';

type Reserva = {
  id: string;
  clienteId: string;
  clienteNombre: string;
  clienteFoto: string;
  from: string;
  to: string;
  fecha: string;
  hora: string;
  pasajeros: number;
  estado: 'pendiente' | 'confirmada' | 'en_curso' | 'completada' | 'cancelada';
  fechaCreacion: string;
  conductorAsignado?: {
    id: string;
    nombre: string;
    foto: string;
    vehiculo: string;
    placa: string;
    rating: number;
  };
};

export default function ReservasScreen() {
  const insets = useSafeAreaInsets();
  const { containerMaxWidth, isPhone, gap } = useResponsive();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [vistaActual, setVistaActual] = useState<'crear' | 'mis_reservas'>('crear');
  const [reservaForm, setReservaForm] = useState({
    from: '',
    to: '',
    fecha: '',
    hora: '',
    pasajeros: '1',
    comentarios: ''
  });

  // Datos de ejemplo para reservas
  const [misReservas] = useState<Reserva[]>([
    {
      id: '1',
      clienteId: 'user1',
      clienteNombre: 'María González',
      clienteFoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      from: 'Hotel Plaza Mayor',
      to: 'Aeropuerto Internacional',
      fecha: '2024-01-20',
      hora: '08:00',
      pasajeros: 2,
      estado: 'confirmada',
      fechaCreacion: '2024-01-15T10:00:00Z',
      conductorAsignado: {
        id: 'cond1',
        nombre: 'Carlos Ruiz',
        foto: 'https://randomuser.me/api/portraits/men/1.jpg',
        vehiculo: 'Toyota Corolla Blanco',
        placa: 'ABC-1234',
        rating: 4.8
      }
    },
    {
      id: '2',
      clienteId: 'user1',
      clienteNombre: 'María González',
      clienteFoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      from: 'Centro Comercial',
      to: 'Universidad Nacional',
      fecha: '2024-01-18',
      hora: '14:30',
      pasajeros: 1,
      estado: 'pendiente',
      fechaCreacion: '2024-01-16T15:30:00Z'
    }
  ]);

  const crearReserva = () => {
    if (!reservaForm.from || !reservaForm.to || !reservaForm.fecha || !reservaForm.hora) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    Alert.alert(
      'Reserva Creada', 
      `Tu reserva ha sido creada exitosamente. Buscaremos el mejor conductor disponible para tu viaje.\n\nRuta: ${reservaForm.from} → ${reservaForm.to}\nFecha: ${reservaForm.fecha} a las ${reservaForm.hora}`,
      [{ text: 'Ver Mis Reservas', onPress: () => setVistaActual('mis_reservas') }]
    );
    
    // Limpiar formulario
    setReservaForm({
      from: '',
      to: '',
      fecha: '',
      hora: '',
      pasajeros: '1',
      comentarios: ''
    });
  };

  const cancelarReserva = (reservaId: string) => {
    Alert.alert(
      'Cancelar Reserva',
      '¿Estás seguro de que quieres cancelar esta reserva?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, Cancelar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Reserva Cancelada', 'Tu reserva ha sido cancelada exitosamente.');
          }
        }
      ]
    );
  };

  const renderCrearReserva = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ThemedView style={[styles.container, { maxWidth: containerMaxWidth, alignSelf: 'center' }]}>
        <ThemedText type="title" style={{ marginBottom: 8, color: colors.textoPrimario }}>
          Crear Reserva
        </ThemedText>
        <ThemedText style={{ marginBottom: 24, color: colors.textoSecundario }}>
          Programa tu viaje con anticipación y nosotros nos encargamos del resto
        </ThemedText>

        {/* Formulario de Reserva */}
        <ThemedView style={[styles.formContainer, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <ThemedText type="subtitle" style={{ marginBottom: 16, color: colors.textoPrimario }}>
            Detalles del Viaje
          </ThemedText>

          <View style={styles.inputGroup}>
            <MaterialIcons name="my-location" size={20} color={colors.primario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Punto de Recogida *</ThemedText>
              <ThemedView style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText 
                  style={{ color: colors.textoPrimario, padding: 12 }}
                  onPress={() => Alert.alert('Seleccionar Ubicación', 'Aquí se abriría un mapa para seleccionar la ubicación')}
                >
                  {reservaForm.from || 'Toca para seleccionar ubicación'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="place" size={20} color={colors.secundario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Destino *</ThemedText>
              <ThemedView style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText 
                  style={{ color: colors.textoPrimario, padding: 12 }}
                  onPress={() => Alert.alert('Seleccionar Destino', 'Aquí se abriría un mapa para seleccionar el destino')}
                >
                  {reservaForm.to || 'Toca para seleccionar destino'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <MaterialIcons name="calendar-today" size={20} color={colors.info} />
              <View style={styles.inputContainer}>
                <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Fecha *</ThemedText>
                <TouchableOpacity 
                  style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}
                  onPress={() => Alert.alert('Seleccionar Fecha', 'Aquí se abriría un selector de fecha')}
                >
                  <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                    {reservaForm.fecha || 'Seleccionar'}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <MaterialIcons name="access-time" size={20} color={colors.info} />
              <View style={styles.inputContainer}>
                <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Hora *</ThemedText>
                <TouchableOpacity 
                  style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}
                  onPress={() => Alert.alert('Seleccionar Hora', 'Aquí se abriría un selector de hora')}
                >
                  <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                    {reservaForm.hora || 'Seleccionar'}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="people" size={20} color={colors.primario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Número de Pasajeros</ThemedText>
              <View style={styles.pasajerosSelector}>
                {[1, 2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.pasajeroButton,
                      { 
                        backgroundColor: reservaForm.pasajeros === num.toString() ? colors.primario : colors.background,
                        borderColor: colors.borde 
                      }
                    ]}
                    onPress={() => setReservaForm(prev => ({ ...prev, pasajeros: num.toString() }))}
                  >
                    <ThemedText style={{ 
                      color: reservaForm.pasajeros === num.toString() ? colors.textoContraste : colors.textoPrimario 
                    }}>
                      {num}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="comment" size={20} color={colors.textoSecundario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Comentarios Adicionales</ThemedText>
              <ThemedView style={[styles.textArea, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                  {reservaForm.comentarios || 'Información adicional para el conductor...'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: colors.primario }]}
            onPress={crearReserva}
          >
            <MaterialIcons name="event-available" size={20} color={colors.textoContraste} />
            <ThemedText style={[styles.submitButtonText, { color: colors.textoContraste }]}>
              Crear Reserva
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Información adicional */}
        <ThemedView style={[styles.infoContainer, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <MaterialIcons name="info" size={24} color={colors.info} />
          <View style={styles.infoContent}>
            <ThemedText style={[styles.infoTitle, { color: colors.textoPrimario }]}>
              ¿Cómo funciona?
            </ThemedText>
            <ThemedText style={[styles.infoText, { color: colors.textoSecundario }]}>
              • Crea tu reserva con anticipación{'\n'}
              • Asignamos automáticamente el mejor conductor disponible{'\n'}
              • Recibes confirmación con detalles del conductor{'\n'}
              • El conductor llega puntualmente a recogerte
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );

  const renderMisReservas = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ThemedView style={[styles.container, { maxWidth: containerMaxWidth, alignSelf: 'center' }]}>
        <ThemedText type="title" style={{ marginBottom: 8, color: colors.textoPrimario }}>
          Mis Reservas
        </ThemedText>
        <ThemedText style={{ marginBottom: 24, color: colors.textoSecundario }}>
          Gestiona y revisa el estado de tus reservas programadas
        </ThemedText>

        {misReservas.map((reserva) => (
          <ThemedView key={reserva.id} style={[styles.reservaCard, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
            <View style={styles.reservaHeader}>
              <View style={styles.rutaInfo}>
                <MaterialIcons name="my-location" size={16} color={colors.primario} />
                <ThemedText style={{ color: colors.textoPrimario, flex: 1 }}>{reserva.from}</ThemedText>
              </View>
              <MaterialIcons name="arrow-forward" size={16} color={colors.textoSecundario} />
              <View style={styles.rutaInfo}>
                <MaterialIcons name="place" size={16} color={colors.secundario} />
                <ThemedText style={{ color: colors.textoPrimario, flex: 1 }}>{reserva.to}</ThemedText>
              </View>
            </View>

            <View style={styles.reservaDetails}>
              <ThemedText style={{ color: colors.textoSecundario, fontSize: 14 }}>
                📅 {reserva.fecha} a las {reserva.hora} • {reserva.pasajeros} pasajero(s)
              </ThemedText>
            </View>

            <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(reserva.estado, colors) }]}>
              <ThemedText style={[styles.estadoText, { color: colors.textoContraste }]}>
                {getEstadoText(reserva.estado)}
              </ThemedText>
            </View>

            {reserva.conductorAsignado && (
              <View style={styles.conductorContainer}>
                <ThemedText type="subtitle" style={{ marginBottom: 12, color: colors.textoPrimario }}>
                  Conductor Asignado
                </ThemedText>
                
                <View style={styles.conductorInfo}>
                  <Image source={{ uri: reserva.conductorAsignado.foto }} style={styles.conductorFoto} />
                  <View style={styles.conductorDetails}>
                    <ThemedText style={[styles.conductorNombre, { color: colors.textoPrimario }]}>
                      {reserva.conductorAsignado.nombre}
                    </ThemedText>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={16} color="#FFD700" />
                      <ThemedText style={{ color: colors.textoSecundario, fontSize: 14 }}>
                        {reserva.conductorAsignado.rating}
                      </ThemedText>
                    </View>
                    <ThemedText style={{ color: colors.textoSecundario, fontSize: 12 }}>
                      {reserva.conductorAsignado.vehiculo} • {reserva.conductorAsignado.placa}
                    </ThemedText>
                  </View>
                  
                  <View style={styles.accionesContainer}>
                    <TouchableOpacity style={[styles.contactarButton, { backgroundColor: colors.info }]}>
                      <MaterialIcons name="phone" size={16} color={colors.textoContraste} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contactarButton, { backgroundColor: colors.exito }]}>
                      <MaterialIcons name="message" size={16} color={colors.textoContraste} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {reserva.estado === 'pendiente' && (
              <TouchableOpacity 
                style={[styles.cancelarButton, { backgroundColor: colors.peligro }]}
                onPress={() => cancelarReserva(reserva.id)}
              >
                <MaterialIcons name="cancel" size={18} color={colors.textoContraste} />
                <ThemedText style={[styles.cancelarButtonText, { color: colors.textoContraste }]}>
                  Cancelar Reserva
                </ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );

  const getEstadoColor = (estado: string, colors: any) => {
    switch (estado) {
      case 'pendiente': return colors.advertencia;
      case 'confirmada': return colors.exito;
      case 'en_curso': return colors.info;
      case 'completada': return colors.primario;
      case 'cancelada': return colors.peligro;
      default: return colors.textoSecundario;
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Buscando conductor';
      case 'confirmada': return 'Confirmada';
      case 'en_curso': return 'En curso';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Navegación por pestañas */}
      <ThemedView style={[styles.tabContainer, { backgroundColor: colors.superficie, borderBottomColor: colors.borde }]}>
        <TouchableOpacity 
          style={[styles.tab, vistaActual === 'crear' && { borderBottomColor: colors.primario }]}
          onPress={() => setVistaActual('crear')}
        >
          <MaterialIcons 
            name="add-circle-outline" 
            size={20} 
            color={vistaActual === 'crear' ? colors.primario : colors.textoSecundario} 
          />
          <ThemedText style={[
            styles.tabText, 
            { color: vistaActual === 'crear' ? colors.primario : colors.textoSecundario }
          ]}>
            Crear Reserva
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, vistaActual === 'mis_reservas' && { borderBottomColor: colors.primario }]}
          onPress={() => setVistaActual('mis_reservas')}
        >
          <MaterialIcons 
            name="event-note" 
            size={20} 
            color={vistaActual === 'mis_reservas' ? colors.primario : colors.textoSecundario} 
          />
          <ThemedText style={[
            styles.tabText, 
            { color: vistaActual === 'mis_reservas' ? colors.primario : colors.textoSecundario }
          ]}>
            Mis Reservas
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Contenido según la vista actual */}
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {vistaActual === 'crear' && renderCrearReserva()}
        {vistaActual === 'mis_reservas' && renderMisReservas()}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  pasajerosSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  pasajeroButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  reservaCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  reservaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rutaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  reservaDetails: {
    gap: 4,
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  conductorContainer: {
    marginTop: 8,
    gap: 12,
  },
  conductorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  conductorFoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conductorDetails: {
    flex: 1,
    gap: 2,
  },
  conductorNombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accionesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  contactarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  cancelarButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});