import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base de tu API
const API_URL = 'http://localhost:3001/api';

// Función para obtener el token de autenticación
const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

// Función genérica para hacer peticiones
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en la petición');
  }

  return await response.json();
};

// Servicios específicos para cada entidad
export const authService = {
  login: (credentials: { email: string; password: string }) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  
  register: (userData: { email: string; password: string; nombre: string; tipo_usuario: string }) => 
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
};

export const viajesService = {
  getViajes: (params?: { origen?: string; destino?: string; fecha?: string }) => {
    const queryParams = params 
      ? `?${Object.entries(params)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
          .join('&')}`
      : '';
    
    return fetchAPI(`/viajes${queryParams}`);
  },
  
  getViajePorId: (id: string) => 
    fetchAPI(`/viajes/${id}`),
  
  crearViaje: (viaje: { 
    origen: string; 
    destino: string; 
    fecha: string; 
    asientos_disponibles: number; 
    precio: number; 
    detalles?: string 
  }) => 
    fetchAPI('/viajes', {
      method: 'POST',
      body: JSON.stringify(viaje)
    })
};

export const reservasService = {
  getReservas: () => 
    fetchAPI('/reservas'),
  
  crearReserva: (reserva: { 
    viaje_id: string; 
    asientos_reservados: number 
  }) => 
    fetchAPI('/reservas', {
      method: 'POST',
      body: JSON.stringify(reserva)
    })
};

export const usuariosService = {
  getPerfil: () => 
    fetchAPI('/usuarios/perfil'),
  
  actualizarPerfil: (datos: {
    nombre?: string;
    telefono?: string;
    avatar_url?: string;
  }) => 
    fetchAPI('/usuarios/perfil', {
      method: 'PUT',
      body: JSON.stringify(datos)
    })
};