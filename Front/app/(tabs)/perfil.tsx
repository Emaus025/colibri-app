import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/use-responsive';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { containerMaxWidth, isPhone, gap } = useResponsive();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  // Datos del usuario (en una app real vendrían de un estado global o API)
  const usuario = {
    nombre: 'María González',
    email: 'maria.gonzalez@email.com',
    telefono: '+34 612 345 678',
    fechaNacimiento: '15/03/1992',
    ciudad: 'Madrid, España',
    miembro: 'Enero 2023',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verificado: true,
    rating: 4.8,
    viajesRealizados: 47,
    viajesOfrecidos: 23,
    kmRecorridos: 2840,
    ahorrosCO2: 156
  };

  const estadisticas = [
    { icono: 'directions-car', titulo: 'Viajes Realizados', valor: usuario.viajesRealizados, color: colors.primario },
    { icono: 'add-road', titulo: 'Viajes Ofrecidos', valor: usuario.viajesOfrecidos, color: colors.secundario },
    { icono: 'route', titulo: 'Km Recorridos', valor: `${usuario.kmRecorridos} km`, color: colors.info },
    { icono: 'eco', titulo: 'CO₂ Ahorrado', valor: `${usuario.ahorrosCO2} kg`, color: colors.exito },
  ];

  const configuraciones = [
    { icono: 'notifications', titulo: 'Notificaciones', subtitulo: 'Gestionar alertas y avisos' },
    { icono: 'security', titulo: 'Privacidad y Seguridad', subtitulo: 'Configurar privacidad' },
    { icono: 'payment', titulo: 'Métodos de Pago', subtitulo: 'Tarjetas y pagos' },
    { icono: 'help', titulo: 'Ayuda y Soporte', subtitulo: 'Centro de ayuda' },
    { icono: 'info', titulo: 'Acerca de', subtitulo: 'Versión y términos' },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: isPhone ? 16 : 24,
          paddingBottom: insets.bottom + 16,
          maxWidth: containerMaxWidth,
          alignSelf: 'center',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header del Perfil */}
        <ThemedView style={[styles.headerContainer, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <View style={styles.fotoContainer}>
            <Image source={{ uri: usuario.foto }} style={styles.fotoPerfil} />
            {usuario.verificado && (
              <View style={[styles.verificadoBadge, { backgroundColor: colors.exito }]}>
                <MaterialIcons name="verified" size={16} color={colors.textoContraste} />
              </View>
            )}
          </View>
          
          <View style={styles.infoBasica}>
            <ThemedText type="title" style={{ fontSize: 24, marginBottom: 4 }}>
              {usuario.nombre}
            </ThemedText>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <ThemedText style={[styles.rating, { color: colors.textoPrimario }]}>
                {usuario.rating} • Miembro desde {usuario.miembro}
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity style={[styles.editarBoton, { backgroundColor: colors.primario }]}>
            <MaterialIcons name="edit" size={20} color={colors.textoContraste} />
            <ThemedText style={[styles.editarTexto, { color: colors.textoContraste }]}>
              Editar
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Información Personal */}
        <ThemedView style={[styles.seccion, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <ThemedText type="subtitle" style={{ marginBottom: 16, color: colors.textoPrimario }}>
            Información Personal
          </ThemedText>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="email" size={20} color={colors.textoSecundario} />
            <View style={styles.infoTexto}>
              <ThemedText style={[styles.infoLabel, { color: colors.textoSecundario }]}>Email</ThemedText>
              <ThemedText style={{ color: colors.textoPrimario }}>{usuario.email}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name="phone" size={20} color={colors.textoSecundario} />
            <View style={styles.infoTexto}>
              <ThemedText style={[styles.infoLabel, { color: colors.textoSecundario }]}>Teléfono</ThemedText>
              <ThemedText style={{ color: colors.textoPrimario }}>{usuario.telefono}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name="cake" size={20} color={colors.textoSecundario} />
            <View style={styles.infoTexto}>
              <ThemedText style={[styles.infoLabel, { color: colors.textoSecundario }]}>Fecha de Nacimiento</ThemedText>
              <ThemedText style={{ color: colors.textoPrimario }}>{usuario.fechaNacimiento}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name="location-city" size={20} color={colors.textoSecundario} />
            <View style={styles.infoTexto}>
              <ThemedText style={[styles.infoLabel, { color: colors.textoSecundario }]}>Ciudad</ThemedText>
              <ThemedText style={{ color: colors.textoPrimario }}>{usuario.ciudad}</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Estadísticas */}
        <ThemedView style={[styles.seccion, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <ThemedText type="subtitle" style={{ marginBottom: 16, color: colors.textoPrimario }}>
            Mis Estadísticas
          </ThemedText>
          
          <View style={styles.estadisticasGrid}>
            {estadisticas.map((stat, index) => (
              <View key={index} style={[styles.estadisticaCard, { backgroundColor: colors.background, borderColor: colors.borde }]}>
                <MaterialIcons name={stat.icono as any} size={24} color={stat.color} />
                <ThemedText style={[styles.estadisticaValor, { color: colors.textoPrimario }]}>
                  {stat.valor}
                </ThemedText>
                <ThemedText style={[styles.estadisticaTitulo, { color: colors.textoSecundario }]}>
                  {stat.titulo}
                </ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>

        {/* Accesos Rápidos */}
        <ThemedView style={[styles.seccion, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <ThemedText type="subtitle" style={{ marginBottom: 16, color: colors.textoPrimario }}>
            Accesos Rápidos
          </ThemedText>
          
          <TouchableOpacity style={[styles.accesoRapido, { borderBottomColor: colors.borde }]}>
            <MaterialIcons name="history" size={24} color={colors.primario} />
            <View style={styles.accesoTexto}>
              <ThemedText style={[styles.accesoTitulo, { color: colors.textoPrimario }]}>
                Historial de Viajes
              </ThemedText>
              <ThemedText style={[styles.accesoSubtitulo, { color: colors.textoSecundario }]}>
                Ver todos mis viajes realizados
              </ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textoSecundario} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.accesoRapido, { borderBottomColor: colors.borde }]}>
            <MaterialIcons name="favorite" size={24} color={colors.secundario} />
            <View style={styles.accesoTexto}>
              <ThemedText style={[styles.accesoTitulo, { color: colors.textoPrimario }]}>
                Rutas Favoritas
              </ThemedText>
              <ThemedText style={[styles.accesoSubtitulo, { color: colors.textoSecundario }]}>
                Gestionar rutas guardadas
              </ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textoSecundario} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accesoRapido}>
            <MaterialIcons name="directions-car" size={24} color={colors.info} />
            <View style={styles.accesoTexto}>
              <ThemedText style={[styles.accesoTitulo, { color: colors.textoPrimario }]}>
                Mis Vehículos
              </ThemedText>
              <ThemedText style={[styles.accesoSubtitulo, { color: colors.textoSecundario }]}>
                Administrar información de vehículos
              </ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textoSecundario} />
          </TouchableOpacity>
        </ThemedView>

        {/* Configuración */}
        <ThemedView style={[styles.seccion, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
          <ThemedText type="subtitle" style={{ marginBottom: 16, color: colors.textoPrimario }}>
            Configuración
          </ThemedText>
          
          {configuraciones.map((config, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.configItem, 
                { borderBottomColor: colors.borde },
                index === configuraciones.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <MaterialIcons name={config.icono as any} size={24} color={colors.textoSecundario} />
              <View style={styles.configTexto}>
                <ThemedText style={[styles.configTitulo, { color: colors.textoPrimario }]}>
                  {config.titulo}
                </ThemedText>
                <ThemedText style={[styles.configSubtitulo, { color: colors.textoSecundario }]}>
                  {config.subtitulo}
                </ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textoSecundario} />
            </TouchableOpacity>
          ))}
        </ThemedView>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={[styles.cerrarSesionBoton, { backgroundColor: colors.peligro }]}>
          <MaterialIcons name="logout" size={20} color={colors.textoContraste} />
          <ThemedText style={[styles.cerrarSesionTexto, { color: colors.textoContraste }]}>
            Cerrar Sesión
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    position: 'relative',
  },
  fotoContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  verificadoBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  infoBasica: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
  },
  editarBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  editarTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  seccion: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  infoTexto: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  estadisticasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  estadisticaCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  estadisticaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  estadisticaTitulo: {
    fontSize: 12,
    textAlign: 'center',
  },
  accesoRapido: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  accesoTexto: {
    flex: 1,
  },
  accesoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  accesoSubtitulo: {
    fontSize: 14,
  },
  configItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  configTexto: {
    flex: 1,
  },
  configTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  configSubtitulo: {
    fontSize: 14,
  },
  cerrarSesionBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  cerrarSesionTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
});