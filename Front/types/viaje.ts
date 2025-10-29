export type Viaje = {
  id: number;
  from: string;
  to: string;
  date: string;
  price: number;
  seats: number;
  driver: string;
  licensePlate: string;
  car: string;
  driverPhoto: string;
  carPhoto: string;
  rating: number;
};

export type CriteriosBusqueda = {
  from: string;
  to: string;
  fechaViaje?: string;
  pasajeros?: number;
};

export type NuevoViaje = {
  from: string;
  to: string;
  date: string;
  price: string;
  seats: string;
  driver: string;
  licensePlate: string;
  car: string;
  driverPhoto: string;
  carPhoto: string;
  rating: number;
};

// Nuevos tipos para el sistema de solicitudes
export type SolicitudViaje = {
  id: string;
  clienteId: string;
  clienteNombre: string;
  clienteFoto: string;
  from: string;
  to: string;
  fechaViaje: string;
  horaViaje: string;
  pasajeros: number;
  presupuestoMaximo?: number;
  comentarios?: string;
  estado: 'pendiente' | 'con_ofertas' | 'aceptada' | 'completada' | 'cancelada';
  fechaCreacion: string;
  ofertas: OfertaConductor[];
};

export type OfertaConductor = {
  id: string;
  conductorId: string;
  conductorNombre: string;
  conductorFoto: string;
  conductorRating: number;
  vehiculo: string;
  placa: string;
  vehiculoFoto: string;
  precio: number;
  tiempoEstimadoLlegada: number; // en minutos
  distanciaAprox: number; // en km
  comentarios?: string;
  fechaOferta: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
};

export type EstadoViaje = {
  solicitudId: string;
  ofertaAceptadaId: string;
  estado: 'confirmado' | 'conductor_en_camino' | 'conductor_llegado' | 'en_viaje' | 'completado';
  tiempoEstimadoLlegada?: number;
  ubicacionConductor?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  horaInicio?: string;
  horaLlegada?: string;
};