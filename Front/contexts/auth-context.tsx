import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, usuariosService } from '../services/api';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  tipo_usuario: 'conductor' | 'pasajero';
  avatar_url?: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ exito: boolean; error?: string }>;
  register: (datos: { email: string; password: string; nombre: string; tipo_usuario: string }) => 
    Promise<{ exito: boolean; error?: string }>;
  logout: () => void;
  actualizarPerfil: (datos: { nombre?: string; telefono?: string; avatar_url?: string }) => 
    Promise<{ exito: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado
    const verificarToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Si hay token, obtener datos del usuario
          const userData = await usuariosService.getPerfil();
          setUsuario(userData);
        }
      } catch (error) {
        // Si hay error, limpiar el token
        await AsyncStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verificarToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      await AsyncStorage.setItem('token', response.token);
      setUsuario(response.usuario);
      return { exito: true };
    } catch (error) {
      return { 
        exito: false, 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión' 
      };
    }
  };

  const register = async (datos: { 
    email: string; 
    password: string; 
    nombre: string; 
    tipo_usuario: string 
  }) => {
    try {
      const response = await authService.register(datos);
      await AsyncStorage.setItem('token', response.token);
      setUsuario(response.usuario);
      return { exito: true };
    } catch (error) {
      return { 
        exito: false, 
        error: error instanceof Error ? error.message : 'Error al registrarse' 
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUsuario(null);
  };

  const actualizarPerfil = async (datos: {
    nombre?: string;
    telefono?: string;
    avatar_url?: string;
  }) => {
    try {
      const usuarioActualizado = await usuariosService.actualizarPerfil(datos);
      setUsuario(prev => prev ? { ...prev, ...usuarioActualizado } : null);
      return { exito: true };
    } catch (error) {
      return { 
        exito: false, 
        error: error instanceof Error ? error.message : 'Error al actualizar perfil' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      loading, 
      login, 
      register, 
      logout,
      actualizarPerfil
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};