import { StyleSheet, View, FlatList, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import type { SolicitudViaje, OfertaConductor } from '@/types/viaje';

export default function ViajesScreen() {
  const insets = useSafeAreaInsets();
  const { containerMaxWidth, isPhone, gap } = useResponsive();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [vistaActual, setVistaActual] = useState<'solicitar' | 'mis_solicitudes' | 'ofertas'>('solicitar');
  const [solicitudForm, setSolicitudForm] = useState({
    from: '',
    to: '',
    pasajeros: '1',
    presupuesto: '',
    comentarios: ''
  });

  // Datos de ejemplo para solicitudes
  const [misSolicitudes] = useState<SolicitudViaje[]>([
    {
      id: '1',
      clienteId: 'user1',
      clienteNombre: 'María González',
      clienteFoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      from: 'Madrid Centro',
      to: 'Aeropuerto Barajas',
      fechaViaje: '2024-01-15',
      horaViaje: '14:30',
      pasajeros: 2,
      presupuestoMaximo: 25,
      comentarios: 'Necesito llegar puntual para un vuelo',
      estado: 'con_ofertas',
      fechaCreacion: '2024-01-14T10:00:00Z',
      ofertas: [
        {
          id: 'of1',
          conductorId: 'cond1',
          conductorNombre: 'Carlos Ruiz',
          conductorFoto: 'https://randomuser.me/api/portraits/men/1.jpg',
          conductorRating: 4.8,
          vehiculo: 'Toyota Corolla Blanco',
          placa: 'ABC-1234',
          vehiculoFoto: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300&h=200&fit=crop',
          precio: 20,
          tiempoEstimadoLlegada: 15,
          distanciaAprox: 8,
          comentarios: 'Tengo aire acondicionado y WiFi',
          fechaOferta: '2024-01-14T11:30:00Z',
          estado: 'pendiente'
        },
        {
          id: 'of2',
          conductorId: 'cond2',
          conductorNombre: 'Ana López',
          conductorFoto: 'https://randomuser.me/api/portraits/women/2.jpg',
          conductorRating: 4.9,
          vehiculo: 'Honda Civic Azul',
          placa: 'XYZ-5678',
          vehiculoFoto: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop',
          precio: 18,
          tiempoEstimadoLlegada: 12,
          distanciaAprox: 6,
          comentarios: 'Vehículo muy cómodo y limpio',
          fechaOferta: '2024-01-14T12:15:00Z',
          estado: 'pendiente'
        }
      ]
    }
  ]);

  const crearSolicitud = () => {
    if (!solicitudForm.from || !solicitudForm.to) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    Alert.alert(
      'Solicitud Enviada', 
      `Tu solicitud de viaje ha sido enviada. Los conductores comenzarán a enviar ofertas pronto.\n\nRuta: ${solicitudForm.from} → ${solicitudForm.to}`,
      [{ text: 'Ver Mis Solicitudes', onPress: () => setVistaActual('mis_solicitudes') }]
    );
    
    // Limpiar formulario
    setSolicitudForm({
      from: '',
      to: '',
      pasajeros: '1',
      presupuesto: '',
      comentarios: ''
    });
  };

  const aceptarOferta = (solicitudId: string, ofertaId: string) => {
    Alert.alert(
      'Confirmar Viaje',
      '¿Estás seguro de que quieres aceptar esta oferta? Una vez confirmado, el conductor se dirigirá a recogerte.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('¡Viaje Confirmado!', 'El conductor ha sido notificado y se dirigirá a recogerte. Te enviaremos actualizaciones sobre su llegada.');
          }
        }
      ]
    );
  };

  const renderSolicitudForm = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ThemedView style={[styles.container, { maxWidth: containerMaxWidth, alignSelf: 'center' }]}>
        <ThemedText type="title" style={{ marginBottom: 8, color: colors.textoPrimario }}>
          Solicitar Viaje
        </ThemedText>
        <ThemedText style={{ marginBottom: 24, color: colors.textoSecundario }}>
          Describe tu viaje y recibe ofertas de conductores cercanos
        </ThemedText>

        {/* Formulario de Solicitud */}
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
                  {solicitudForm.from || 'Toca para seleccionar ubicación'}
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
                  {solicitudForm.to || 'Toca para seleccionar destino'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="people" size={20} color={colors.primario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Pasajeros</ThemedText>
              <ThemedView style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                  {solicitudForm.pasajeros}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="euro" size={20} color={colors.exito} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Presupuesto Máximo</ThemedText>
              <ThemedView style={[styles.input, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                  {solicitudForm.presupuesto || 'Opcional'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="comment" size={20} color={colors.textoSecundario} />
            <View style={styles.inputContainer}>
              <ThemedText style={[styles.inputLabel, { color: colors.textoSecundario }]}>Comentarios Adicionales</ThemedText>
              <ThemedView style={[styles.textArea, { borderColor: colors.borde, backgroundColor: colors.background }]}>
                <ThemedText style={{ color: colors.textoPrimario, padding: 12 }}>
                  {solicitudForm.comentarios || 'Información adicional para el conductor...'}
                </ThemedText>
              </ThemedView>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: colors.primario }]}
            onPress={crearSolicitud}
          >
            <MaterialIcons name="send" size={20} color={colors.textoContraste} />
            <ThemedText style={[styles.submitButtonText, { color: colors.textoContraste }]}>
              Enviar Solicitud
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );

  const renderMisSolicitudes = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ThemedView style={[styles.container, { maxWidth: containerMaxWidth, alignSelf: 'center' }]}>
        <ThemedText type="title" style={{ marginBottom: 8, color: colors.textoPrimario }}>
          Mis Solicitudes
        </ThemedText>
        <ThemedText style={{ marginBottom: 24, color: colors.textoSecundario }}>
          Gestiona tus solicitudes de viaje y revisa las ofertas
        </ThemedText>

        {misSolicitudes.map((solicitud) => (
          <ThemedView key={solicitud.id} style={[styles.solicitudCard, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
            <View style={styles.solicitudHeader}>
              <View style={styles.rutaInfo}>
                <MaterialIcons name="my-location" size={16} color={colors.primario} />
                <ThemedText style={{ color: colors.textoPrimario, flex: 1 }}>{solicitud.from}</ThemedText>
              </View>
              <MaterialIcons name="arrow-forward" size={16} color={colors.textoSecundario} />
              <View style={styles.rutaInfo}>
                <MaterialIcons name="place" size={16} color={colors.secundario} />
                <ThemedText style={{ color: colors.textoPrimario, flex: 1 }}>{solicitud.to}</ThemedText>
              </View>
            </View>

            <View style={styles.solicitudDetails}>
              <ThemedText style={{ color: colors.textoSecundario, fontSize: 14 }}>
                📅 {solicitud.fechaViaje} a las {solicitud.horaViaje} • {solicitud.pasajeros} pasajero(s)
              </ThemedText>
              {solicitud.presupuestoMaximo && (
                <ThemedText style={{ color: colors.exito, fontSize: 14 }}>
                  💰 Presupuesto máximo: €{solicitud.presupuestoMaximo}
                </ThemedText>
              )}
            </View>

            <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(solicitud.estado, colors) }]}>
              <ThemedText style={[styles.estadoText, { color: colors.textoContraste }]}>
                {getEstadoText(solicitud.estado)} ({solicitud.ofertas.length} ofertas)
              </ThemedText>
            </View>

            {solicitud.ofertas.length > 0 && (
              <View style={styles.ofertasContainer}>
                <ThemedText type="subtitle" style={{ marginBottom: 12, color: colors.textoPrimario }}>
                  Ofertas Recibidas
                </ThemedText>
                
                {solicitud.ofertas.map((oferta) => (
                  <ThemedView key={oferta.id} style={[styles.ofertaCard, { backgroundColor: colors.background, borderColor: colors.borde }]}>
                    <View style={styles.conductorInfo}>
                      <Image source={{ uri: oferta.conductorFoto }} style={styles.conductorFoto} />
                      <View style={styles.conductorDetails}>
                        <ThemedText style={[styles.conductorNombre, { color: colors.textoPrimario }]}>
                          {oferta.conductorNombre}
                        </ThemedText>
                        <View style={styles.ratingContainer}>
                          <MaterialIcons name="star" size={16} color="#FFD700" />
                          <ThemedText style={{ color: colors.textoSecundario, fontSize: 14 }}>
                            {oferta.conductorRating}
                          </ThemedText>
                        </View>
                        <ThemedText style={{ color: colors.textoSecundario, fontSize: 12 }}>
                          {oferta.vehiculo} • {oferta.placa}
                        </ThemedText>
                      </View>
                    </View>

                    <View style={styles.ofertaDetails}>
                      <View style={styles.precioContainer}>
                        <ThemedText style={[styles.precio, { color: colors.primario }]}>
                          €{oferta.precio}
                        </ThemedText>
                        <ThemedText style={{ color: colors.textoSecundario, fontSize: 12 }}>
                          Llegada en ~{oferta.tiempoEstimadoLlegada} min
                        </ThemedText>
                      </View>

                      {oferta.comentarios && (
                        <ThemedText style={{ color: colors.textoSecundario, fontSize: 14, fontStyle: 'italic' }}>
                          "{oferta.comentarios}"
                        </ThemedText>
                      )}

                      <TouchableOpacity 
                        style={[styles.aceptarButton, { backgroundColor: colors.exito }]}
                        onPress={() => aceptarOferta(solicitud.id, oferta.id)}
                      >
                        <MaterialIcons name="check" size={18} color={colors.textoContraste} />
                        <ThemedText style={[styles.aceptarButtonText, { color: colors.textoContraste }]}>
                          Aceptar Oferta
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  </ThemedView>
                ))}
              </View>
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );

  const getEstadoColor = (estado: string, colors: any) => {
    switch (estado) {
      case 'pendiente': return colors.advertencia;
      case 'con_ofertas': return colors.info;
      case 'aceptada': return colors.exito;
      case 'completada': return colors.primario;
      case 'cancelada': return colors.peligro;
      default: return colors.textoSecundario;
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Esperando ofertas';
      case 'con_ofertas': return 'Ofertas disponibles';
      case 'aceptada': return 'Viaje confirmado';
      case 'completada': return 'Completado';
      case 'cancelada': return 'Cancelado';
      default: return estado;
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Navegación por pestañas */}
      <ThemedView style={[styles.tabContainer, { backgroundColor: colors.superficie, borderBottomColor: colors.borde }]}>
        <TouchableOpacity 
          style={[styles.tab, vistaActual === 'solicitar' && { borderBottomColor: colors.primario }]}
          onPress={() => setVistaActual('solicitar')}
        >
          <MaterialIcons 
            name="add-location" 
            size={20} 
            color={vistaActual === 'solicitar' ? colors.primario : colors.textoSecundario} 
          />
          <ThemedText style={[
            styles.tabText, 
            { color: vistaActual === 'solicitar' ? colors.primario : colors.textoSecundario }
          ]}>
            Solicitar
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, vistaActual === 'mis_solicitudes' && { borderBottomColor: colors.primario }]}
          onPress={() => setVistaActual('mis_solicitudes')}
        >
          <MaterialIcons 
            name="list-alt" 
            size={20} 
            color={vistaActual === 'mis_solicitudes' ? colors.primario : colors.textoSecundario} 
          />
          <ThemedText style={[
            styles.tabText, 
            { color: vistaActual === 'mis_solicitudes' ? colors.primario : colors.textoSecundario }
          ]}>
            Mis Solicitudes
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Contenido según la vista actual */}
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {vistaActual === 'solicitar' && renderSolicitudForm()}
        {vistaActual === 'mis_solicitudes' && renderMisSolicitudes()}
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
  solicitudCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  solicitudHeader: {
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
  solicitudDetails: {
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
  ofertasContainer: {
    marginTop: 8,
    gap: 12,
  },
  ofertaCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
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
  ofertaDetails: {
    gap: 8,
  },
  precioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  precio: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aceptarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  aceptarButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});