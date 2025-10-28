import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/use-responsive';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { containerMaxWidth, isPhone, gap } = useResponsive();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: isPhone ? 16 : 24,
          paddingBottom: 16,
          maxWidth: containerMaxWidth,
          alignSelf: 'center',
          width: '100%',
          gap,
        }}
      >
        <ThemedText type="title" style={{ marginBottom: 8 }}>Perfil</ThemedText>
        <ThemedText style={{ marginBottom: 16 }}>Gestiona tu información personal</ThemedText>

        <ThemedView style={{ backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8, gap: 8 }}>
          <ThemedText type="subtitle">Datos</ThemedText>
          <ThemedText>Nombre: Usuario</ThemedText>
          <ThemedText>Correo: usuario@ejemplo.com</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}