import { useMemo, useState } from 'react';
import type { Viaje, CriteriosBusqueda, NuevoViaje } from '@/types/viaje';

export function useViajes() {
  const [viajes, setViajes] = useState<Viaje[]>([
    {
      id: 1,
      from: 'Madrid',
      to: 'Barcelona',
      date: '2023-06-15',
      price: 25,
      seats: 3,
      driver: 'Carlos',
      licensePlate: 'ABC-1234',
      car: 'Toyota Corolla',
      driverPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
      carPhoto:
        'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 4.5,
    },
    {
      id: 2,
      from: 'Valencia',
      to: 'Sevilla',
      date: '2023-06-16',
      price: 30,
      seats: 2,
      driver: 'Ana',
      licensePlate: 'XYZ-5678',
      car: 'Honda Civic',
      driverPhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
      carPhoto:
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 4.8,
    },
    {
      id: 3,
      from: 'Bilbao',
      to: 'Madrid',
      date: '2023-06-17',
      price: 22,
      seats: 4,
      driver: 'Miguel',
      licensePlate: 'DEF-9012',
      car: 'Volkswagen Golf',
      driverPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
      carPhoto:
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 4.2,
    },
  ]);

  const [viajeSeleccionado, setViajeSeleccionado] = useState<Viaje | null>(null);
  const [criterios, setCriterios] = useState<CriteriosBusqueda>({ from: '', to: '' });
  const [nuevoViaje, setNuevoViaje] = useState<NuevoViaje>({
    from: '',
    to: '',
    date: '',
    price: '',
    seats: '',
    driver: '',
    licensePlate: '',
    car: '',
    driverPhoto: 'https://randomuser.me/api/portraits/lego/1.jpg',
    carPhoto:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rating: 0,
  });

  const setCampoBusqueda = (campo: keyof CriteriosBusqueda, valor: string) => {
    setCriterios((prev) => ({ ...prev, [campo]: valor }));
  };

  const setCampoNuevoViaje = (campo: keyof NuevoViaje, valor: string) => {
    setNuevoViaje((prev) => ({ ...prev, [campo]: valor }));
  };

  const agregarViaje = () => {
    const viaje: Viaje = {
      id: viajes.length + 1,
      from: nuevoViaje.from,
      to: nuevoViaje.to,
      date: nuevoViaje.date,
      price: parseFloat(nuevoViaje.price),
      seats: parseInt(nuevoViaje.seats, 10),
      driver: nuevoViaje.driver,
      licensePlate: nuevoViaje.licensePlate,
      car: nuevoViaje.car,
      driverPhoto: nuevoViaje.driverPhoto,
      carPhoto: nuevoViaje.carPhoto,
      rating: 0,
    };

    setViajes((prev) => [...prev, viaje]);
    setNuevoViaje({
      from: '',
      to: '',
      date: '',
      price: '',
      seats: '',
      driver: '',
      licensePlate: '',
      car: '',
      driverPhoto: 'https://randomuser.me/api/portraits/lego/1.jpg',
      carPhoto:
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 0,
    });
  };

  const filtrarViajes = useMemo(() => {
    return viajes.filter((v) => {
      return (
        (criterios.from === '' || v.from.toLowerCase().includes(criterios.from.toLowerCase())) &&
        (criterios.to === '' || v.to.toLowerCase().includes(criterios.to.toLowerCase()))
      );
    });
  }, [viajes, criterios]);

  const seleccionarViaje = (viaje: Viaje) => setViajeSeleccionado(viaje);
  const cerrarDetalles = () => setViajeSeleccionado(null);

  return {
    viajes,
    viajeSeleccionado,
    criterios,
    nuevoViaje,
    filtrarViajes,
    setCampoBusqueda,
    setCampoNuevoViaje,
    agregarViaje,
    seleccionarViaje,
    cerrarDetalles,
  };
}