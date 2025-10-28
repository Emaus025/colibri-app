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