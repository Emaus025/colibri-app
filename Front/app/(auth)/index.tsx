import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return;
    }

    setIsLoading(true);
    const success = await login(email.trim());
    setIsLoading(false);

    if (!success) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tu email.');
    }
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo/Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primario }]}>
              <MaterialIcons name="directions-car" size={40} color={colors.textoContraste} />
            </View>
            <ThemedText type="title" style={[styles.title, { color: colors.textoPrimario }]}>
              Colibri
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textoSecundario }]}>
              Tu compañero de viaje perfecto
            </ThemedText>
          </View>

          {/* Login Form */}
          <View style={[styles.form, { backgroundColor: colors.superficie, borderColor: colors.borde }]}>
            <ThemedText type="subtitle" style={[styles.formTitle, { color: colors.textoPrimario }]}>
              Iniciar Sesión
            </ThemedText>

            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color={colors.textoSecundario} style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.textoPrimario,
                    backgroundColor: colors.background,
                    borderColor: colors.borde,
                  },
                ]}
                placeholder="Email"
                placeholderTextColor={colors.textoSecundario}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: colors.primario },
                isLoading && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <ThemedText style={[styles.loginButtonText, { color: colors.textoContraste }]}>
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.borde }]} />
              <ThemedText style={[styles.dividerText, { color: colors.textoSecundario }]}>
                o
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: colors.borde }]} />
            </View>

            <Link href="./register" asChild>
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  { borderColor: colors.primario, backgroundColor: 'transparent' },
                ]}
              >
                <ThemedText style={[styles.registerButtonText, { color: colors.primario }]}>
                  Crear Cuenta Nueva
                </ThemedText>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={[styles.footerText, { color: colors.textoSecundario }]}>
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </ThemedText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  input: {
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});