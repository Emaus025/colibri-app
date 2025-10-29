# Backend Colibrí - Documentación

## Descripción
Backend para la aplicación de viajes compartidos Colibrí (similar a BlaBlaCar) desarrollado en Node.js con Express y Supabase.

## Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## Base URL
```
http://localhost:3001/api
```

## Autenticación

### Registro de Usuario
**POST** `/auth/registro`

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "contraseña": "password123",
  "nombre": "Juan Pérez",
  "tipo_usuario": "conductor|pasajero",
  "telefono": "+1234567890"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "token": "fake-jwt-token-for-123",
  "usuario": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan Pérez",
    "tipo_usuario": "conductor",
    "telefono": "+1234567890",
    "avatar_url": null
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "token": "fake-jwt-token-for-123",
  "usuario": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan Pérez",
    "tipo_usuario": "conductor",
    "telefono": "+1234567890",
    "avatar_url": null
  }
}
```

## Viajes

### Crear Viaje (Conductores)
**POST** `/viajes`
**Headers:** `Authorization: fake-jwt-token-for-123`

**Body:**
```json
{
  "origen": "Ciudad de México",
  "destino": "Puebla",
  "fecha": "2024-12-25T08:00:00Z",
  "asientos_disponibles": 3,
  "precio": 150.50,
  "detalles": "Paro en Cholula y llegamos al centro"
}
```

### Buscar Viajes
**GET** `/viajes?origen=Ciudad de México&destino=Puebla&fecha=2024-12-25`

**Respuesta:**
```json
{
  "exito": true,
  "viajes": [
    {
      "id": "uuid",
      "conductor_id": "uuid",
      "origen": "Ciudad de México",
      "destino": "Puebla",
      "fecha": "2024-12-25T08:00:00Z",
      "asientos_disponibles": 3,
      "precio": 150.50,
      "detalles": "Paro en Cholula...",
      "estado": "activo",
      "conductor": {
        "nombre": "Juan Pérez",
        "telefono": "+1234567890",
        "avatar_url": null,
        "calificacion_promedio": 4.5
      }
    }
  ]
}
```

### Obtener Detalles de Viaje
**GET** `/viajes/:id`

## Reservas

### Crear Reserva
**POST** `/reservas`
**Headers:** `Authorization: fake-jwt-token-for-123`

**Body:**
```json
{
  "viaje_id": "uuid-del-viaje",
  "asientos_reservados": 2
}
```

**Respuesta:**
```json
{
  "exito": true,
  "reserva": {
    "id": "uuid",
    "viaje_id": "uuid",
    "pasajero_id": "uuid",
    "asientos_reservados": 2,
    "estado": "confirmada",
    "viaje": {
      "origen": "Ciudad de México",
      "destino": "Puebla",
      "fecha": "2024-12-25T08:00:00Z",
      "conductor": {
        "nombre": "María García",
        "telefono": "+1234567890"
      }
    }
  }
}
```

### Mis Reservas
**GET** `/reservas/mis-reservas`
**Headers:** `Authorization: fake-jwt-token-for-123`

## Health Check

### Verificar Estado del Servicio
**GET** `/salud`

**Respuesta:**
```json
{
  "estado": "OK",
  "timestamp": "2024-01-15T10:30:00Z",
  "mensaje": "Servidor funcionando correctamente",
  "baseDatos": "Conectada a Supabase"
}
```

### Probar Conexión a Base de Datos
**GET** `/test-db`

## Códigos de Error

- `200` - Éxito
- `400` - Datos inválidos
- `401` - No autorizado
- `404` - Recurso no encontrado
- `409` - Conflicto (usuario ya existe)
- `500` - Error interno del servidor

## Headers Requeridos

Para endpoints protegidos:
```http
Authorization: fake-jwt-token-for-123
Content-Type: application/json
```

## Notas para el Frontend

### Formulario de Registro:
- Campos requeridos: email, contraseña, nombre, tipo_usuario
- tipo_usuario debe ser: `"conductor"` o `"pasajero"`
- telefono es opcional

### Formulario de Viaje:
- Campos requeridos: origen, destino, fecha, asientos_disponibles, precio
- detalles es opcional
- fecha debe estar en formato ISO

### Formulario de Reserva:
- Campos requeridos: viaje_id, asientos_reservados
- El sistema valida automáticamente la disponibilidad

## Estructura de Base de Datos

```sql
usuarios (id, email, nombre, tipo_usuario, telefono, avatar_url, calificacion_promedio)
viajes (id, conductor_id, origen, destino, fecha, asientos_disponibles, precio, detalles, estado)
reservas (id, viaje_id, pasajero_id, asientos_reservados, estado)
calificaciones (id, usuario_calificado_id, usuario_calificador_id, viaje_id, puntuacion, comentario)
```

## Consideraciones

1. **Autenticación:** Actualmente usa tokens simulados. En producción implementar JWT real.
2. **Validaciones:** Todos los endpoints incluyen validación de datos.
3. **Errores:** Siempre retornan mensajes descriptivos en español.
4. **Fechas:** Usar formato ISO (YYYY-MM-DDTHH:mm:ssZ)

## Soporte

Para problemas técnicos contactar al equipo de desarrollo backend.

---

**Versión:** 1.0.0  
**Última actualización:** 29/10/2025
