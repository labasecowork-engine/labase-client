# La Base Cowork - Plataforma de Gestión de Coworking

## 🏢 Descripción General

**La Base Cowork** es una plataforma web moderna para la gestión integral de espacios de coworking, específicamente diseñada para el espacio ubicado en **Huancayo, Perú - Edificio Torre Galena 234, décimo piso**.

La plataforma facilita la administración de reservas, gestión de usuarios, control de acceso y seguimiento de actividades en tiempo real, proporcionando una experiencia fluida tanto para administradores como para usuarios del coworking.

## 🎯 Propósito y Audiencia

- **Administradores**: Gestión completa del espacio, reservas, usuarios y análisis de ocupación
- **Usuarios/Clientes**: Reserva de espacios, seguimiento de reservas y acceso a servicios
- **Propietarios**: Monitoreo de KPIs, rentabilidad y optimización del espacio

## ⚡ Funcionalidades Principales

### 🔐 Sistema de Autenticación

- Login y registro de usuarios
- Recuperación de contraseña
- Cambio de contraseña
- Gestión de sesiones con JWT

### 👥 Gestión de Usuarios y Roles

- Sistema de roles (Admin/Cliente)
- Guards de autenticación y autorización
- Perfiles de usuario personalizables

### 📅 Sistema de Reservas

- **Para Clientes**:
  - Crear nuevas reservas
  - Ver mis reservas
  - Gestionar reservas existentes
- **Para Administradores**:
  - Vista de calendario completo
  - Gestión de todas las reservas
  - Escáner QR para check-in/check-out
  - Detalles completos de reservas

### 🎛️ Panel de Administración

- Vista de calendario integrada
- Gestión de inventario y espacios
- Análisis de ocupación
- Control de acceso por código QR

## 🛠️ Tecnologías Utilizadas

### Frontend Core

- **React 19.1.0** - Librería de UI con las últimas características
- **TypeScript** - Tipado estático para mayor robustez
- **Vite 7.0.0** - Build tool ultrarrápido con HMR

### Styling y UI

- **TailwindCSS 4.1.11** - Framework CSS utility-first
- **shadcn/ui** - Componentes accesibles y customizables (estilo New York)
- **Lucide React** - Iconos SVG optimizados
- **CSS Variables** - Sistema de design tokens personalizable

### Gestión de Estado y Datos

- **Zustand** - Estado global ligero y eficiente
- **TanStack Query v5** - Gestión de datos asíncronos y cache
- **React Router DOM v6** - Navegación y routing

### Comunicación HTTP

- **Axios** - Cliente HTTP con interceptors personalizados
- **Manejo de errores** - Sistema robusto de mensajes de error

### Desarrollo y Calidad

- **ESLint** - Linting con reglas estrictas
- **TypeScript ESLint** - Reglas específicas para TypeScript
- **React Query DevTools** - Herramientas de desarrollo

## 📁 Estructura del Proyecto

```
labase-client/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── guards/          # Guards de autenticación y roles
│   │   ├── layouts/         # Layouts principales (Core, Sidebar)
│   │   └── ui/              # Componentes de UI (shadcn/ui)
│   ├── hooks/               # Custom hooks
│   │   ├── use_auth/        # Hook de autenticación
│   │   └── use_title/       # Hook para títulos dinámicos
│   ├── modules/             # Módulos por feature
│   │   ├── admin/           # Funcionalidades de administración
│   │   │   ├── calendar/    # Gestión de calendario
│   │   │   └── reservations/ # Gestión de reservas (admin)
│   │   ├── client/          # Funcionalidades de cliente
│   │   │   └── reservations/ # Gestión de reservas (cliente)
│   │   └── shared/          # Módulos compartidos
│   │       ├── auth/        # Autenticación
│   │       └── error/       # Páginas de error
│   ├── routes/              # Configuración de rutas
│   │   ├── admin_routes/    # Rutas de administración
│   │   ├── auth_routes/     # Rutas de autenticación
│   │   ├── client_routes/   # Rutas de cliente
│   │   └── app_routes/      # Rutas principales
│   ├── services/            # Servicios de API
│   ├── store/               # Gestión de estado (Zustand)
│   ├── types/               # Definiciones de tipos TypeScript
│   ├── utilities/           # Utilidades y helpers
│   ├── interceptors/        # Interceptors de Axios
│   ├── config/              # Configuración del proyecto
│   └── styles/              # Estilos globales
└── public/                  # Archivos estáticos
```

### 📦 Arquitectura de Barrel Exports

El proyecto utiliza archivos `index.ts` en cada módulo para encapsular y exportar funcionalidades:

```typescript
// Ejemplo: src/components/guards/index.ts
export { default as AuthGuard } from "./auth_guard";
export { default as GuestGuard } from "./guest_guard";
export { default as RoleGuard } from "./role_guard";
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/labasecowork/labase-client.git
cd labase-client
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Configuración de la API
VITE_API_BASE_URL=http://localhost:3000
VITE_API_BASE_URL_PROD=https://api.LaBaseCowork.com

# Configuración de desarrollo
VITE_ENV=development
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Comandos Disponibles

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia el servidor de desarrollo     |
| `npm run build`   | Genera el build de producción        |
| `npm run preview` | Previsualiza el build de producción  |
| `npm run lint`    | Ejecuta ESLint para verificar código |

## 🔧 Configuración Adicional

### Configuración de shadcn/ui

```json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

### Configuración de TailwindCSS

El proyecto utiliza TailwindCSS v4 con configuración inline y soporte para modo oscuro.

## 🌐 Rutas Principales

### Rutas de Autenticación

- `/login` - Iniciar sesión
- `/register` - Registrar cuenta
- `/recover-password` - Recuperar contraseña
- `/change-password` - Cambiar contraseña

### Rutas de Cliente

- `/client/reservations` - Ver mis reservas
- `/client/reservations/create` - Crear reserva
- `/client/reservations/:id` - Detalle de reserva

### Rutas de Administración

- `/admin/calendar` - Vista de calendario
- `/admin/reservations` - Gestión de reservas
- `/admin/reservations/:id` - Detalle de reserva
- `/admin/reservations/scan-qr` - Escáner QR

## 🔐 Sistema de Autenticación

La aplicación implementa un sistema robusto de autenticación con:

- **JWT Tokens** almacenados en localStorage
- **Guards de rutas** para proteger contenido
- **Interceptors automáticos** para incluir tokens en requests
- **Refresh de sesión** automático
- **Manejo de errores** de autenticación

## 🚨 Manejo de Errores

Sistema completo de manejo de errores con:

- Mensajes personalizados para cada código HTTP
- Páginas de error específicas (404, 500)
- Interceptors para manejo automático
- Notificaciones al usuario

## 📱 Características Técnicas

### Responsive Design

- Diseño adaptativo para desktop, tablet y móvil
- Componentes optimizados para diferentes tamaños de pantalla

### Performance

- Lazy loading de componentes
- Optimización de queries con React Query
- Code splitting automático con Vite

### Accesibilidad

- Componentes accesibles con shadcn/ui
- Navegación por teclado
- Soporte para lectores de pantalla

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Créditos

- **Desarrollo**: Equipo de desarrollo La Base Cowork
- **Ubicación**: Edificio Torre Galena 234, décimo piso - Huancayo, Perú

---

_Para más información técnica, consulta la documentación de arquitectura._
