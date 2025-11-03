import { useMemo, useState, useEffect } from 'react';
import type { Viaje, CriteriosBusqueda, NuevoViaje } from '@/types/viaje';
import { viajesService } from '../services/api';

export function useViajes() {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarViajes = async (filtros?: { origen?: string; destino?: string; fecha?: string }) => {
    try {
      setLoading(true);
      const data = await viajesService.getViajes(filtros);
      setViajes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar viajes');
    } finally {
      setLoading(false);
    }
  };

  const crearViaje = async (viaje: {
    origen: string;
    destino: string;
    fecha: string;
    asientos_disponibles: number;
    precio: number;
    detalles?: string;
  }) => {
    try {
      setLoading(true);
      const nuevoViaje = await viajesService.crearViaje(viaje);
      setViajes(prev => [nuevoViaje.viaje, ...prev]);
      return { exito: true, viaje: nuevoViaje.viaje };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear viaje');
      return { exito: false, error: err instanceof Error ? err.message : 'Error al crear viaje' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarViajes();
  }, []);

  return { viajes, loading, error, cargarViajes, crearViaje };
}