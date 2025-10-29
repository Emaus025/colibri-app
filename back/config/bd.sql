-- Tabla de usuarios
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  tipo_usuario TEXT CHECK (tipo_usuario IN ('conductor', 'pasajero')),
  telefono TEXT,
  avatar_url TEXT,
  calificacion_promedio DECIMAL(3,2) DEFAULT 5.0,
  fecha_registro TIMESTAMP DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP DEFAULT NOW()
);

-- Tabla de viajes
CREATE TABLE viajes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conductor_id UUID REFERENCES usuarios(id),
  origen TEXT NOT NULL,
  destino TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL,
  asientos_disponibles INTEGER NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  detalles TEXT,
  estado TEXT DEFAULT 'activo',
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Tabla de reservas
CREATE TABLE reservas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  viaje_id UUID REFERENCES viajes(id),
  pasajero_id UUID REFERENCES usuarios(id),
  asientos_reservados INTEGER NOT NULL,
  estado TEXT DEFAULT 'confirmada',
  fecha_reserva TIMESTAMP DEFAULT NOW()
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_calificado_id UUID REFERENCES usuarios(id),
  usuario_calificador_id UUID REFERENCES usuarios(id),
  viaje_id UUID REFERENCES viajes(id),
  puntuacion INTEGER CHECK (puntuacion >= 1 AND puntuacion <= 5),
  comentario TEXT,
  fecha_calificacion TIMESTAMP DEFAULT NOW()
);