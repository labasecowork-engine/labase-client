# CLAUDE.md — Guía maestra para agentes · La Base Cowork (frontend)

> Este archivo es la **fuente de verdad** para cualquier agente o desarrollador que toque
> este repo. Léelo completo antes de escribir código. Para detalle profundo ver:
> - [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — colores, tipografía, espaciado, componentes, UI/UX.
> - [`docs/ARCHITECTURE_GUIDE.md`](docs/ARCHITECTURE_GUIDE.md) — arquitectura modular, convenciones y recetas paso a paso.
> - `.claude/skills/*` — skills activables (react, typescript, clean-code, product-engineering, ui-ux).
>
> ⚠️ `README.md` y `ARCHITECTURE.md` existen pero están **parcialmente desactualizados**
> (variables de entorno y lista de módulos). Cuando haya conflicto, **gana este `CLAUDE.md`**.

---

## 1. Qué es este proyecto

**La Base Cowork** es la SPA de gestión de un espacio de coworking en Huancayo, Perú.
Tres tipos de usuario, cada uno con su propia área de la app:

| Rol (`user_type`) | Constante           | Home por defecto                  | Qué hace |
| ----------------- | ------------------- | --------------------------------- | -------- |
| `admin`           | `USER_TYPE_ADMIN`   | `/admin/reservations`             | Gestiona reservas, espacios, empleados, inventario, artículos, visitantes, recordatorios, asistencias, newsletter, comunicación. |
| `client`          | `USER_TYPE_CLIENT`  | `/client/reservations`            | Crea y consulta sus reservas, su perfil. |
| `employee`        | `USER_TYPE_EMPLOYEE`| `/employee/attendance/register`   | Registra su asistencia, comunicación, perfil. |

Es **100% client-side** (no SSR). Consume una API REST externa (`/api/v1`) y un socket de comunicación en tiempo real.

---

## 2. Stack tecnológico (real, verificado en `package.json`)

| Capa            | Tecnología | Notas |
| --------------- | ---------- | ----- |
| UI              | **React 19.1** + **TypeScript 5.8** (strict) | Componentes funcionales, hooks. Sin clases. |
| Build / dev     | **Vite 7** + `@vitejs/plugin-react-swc` | HMR. `npm run dev` levanta con `--host`. |
| Estilos         | **TailwindCSS v4** (config en CSS, no `tailwind.config.js`) + `tw-animate-css` | Tokens en `src/styles/index.css` con `@theme inline`. |
| Componentes     | **shadcn/ui** (estilo *new-york*, base *neutral*) sobre **Radix UI** | Viven en `src/components/ui/*`, ya personalizados (paleta **stone**). |
| Iconos          | **lucide-react** (principal) + **@heroicons/react** (navegación) | |
| Estado servidor | **TanStack Query v5** (`@tanstack/react-query`) | Caché, fetching, mutaciones. |
| Estado cliente  | **Zustand v5** | Solo lo imprescindible (usuario en sesión). |
| Routing         | **React Router DOM v6** (data router, `createBrowserRouter`) | |
| Formularios     | **react-hook-form 7** + **zod 3** + `@hookform/resolvers` | Validación con `zodResolver`. |
| HTTP            | **axios** con interceptores (`src/interceptors`) | Inyecta token, normaliza errores. |
| Tablas          | **@tanstack/react-table v8** | |
| Notificaciones  | **sonner** (`toast`) | Montado en `Core`. |
| Otros           | date-fns, react-day-picker, embla-carousel, exceljs, file-saver, qrcode(.react), @react-pdf/renderer, @yudiel/react-qr-scanner, socket.io-client, input-otp, react-confetti-boom | |

**No hay framework de tests configurado** (no Jest/Vitest/Playwright). Calidad la cubre ESLint + TypeScript estricto.

---

## 3. Comandos

```bash
npm run dev       # servidor de desarrollo (Vite, expuesto en la red --host)
npm run build     # tsc -b && vite build  (type-check + build de producción)
npm run lint      # eslint .
npm run preview   # sirve el build de producción
```

> No existe `npm test`. Antes de dar por terminado un cambio: `npm run lint` y `npm run build` deben pasar.

---

## 4. Variables de entorno (las reales — `.env.sample`)

```env
VITE_API_URL=        # base de la API REST. Default en código: http://localhost:3000/api/v1
VITE_SOCKET_URL=     # WebSocket. Default: ws://localhost:3000
VITE_PORT=           # puerto opcional del dev server
```

Se leen en `src/config/env/index.ts` vía `import.meta.env`. **Ignora** las variables `VITE_API_BASE_URL*` que menciona el README viejo: no se usan.

---

## 5. Mapa del repositorio

```
src/
├── main.tsx                  # entrypoint: <Core> + <RouterProvider router={router} />
├── styles/index.css          # ÚNICO archivo de estilos globales / design tokens (Tailwind v4)
├── config/env/               # MODE, API_URL, SOCKET_URL
├── constants/                # constantes globales (regex, etc.)
├── interceptors/             # axiosInstance + interceptores (auth token, errores)
├── services/                 # servicios de API GLOBALES (users, spaces, areas, companies, socket)
├── store/                    # stores de Zustand globales (user)
├── hooks/                    # hooks globales (use_auth, use_title, use_debounce, use_window_size, use_camera_access)
├── types/                    # tipos GLOBALES por dominio (user, reservation, spaces, ...)
├── utilities/                # helpers globales (cn, query client, errores, fechas, strings, ...)
├── routes/                   # configuración de rutas (ver §7)
├── components/
│   ├── ui/                   # design system: primitivos shadcn + compuestos (Button, Card, FormInput, AsyncBoundary, ...)
│   ├── layouts/              # Core (providers), Sidebar (topbar de navegación), Auth
│   └── guards/               # AuthGuard, RoleGuard, GuestGuard
└── modules/                  # FEATURES por rol (el grueso de la app)
    ├── admin/
    ├── client/
    ├── employee/
    └── shared/               # login, register, recover/change password, perfil, chat, errores
```

---

## 6. Convenciones NO negociables

Estas reglas son las que mantienen el repo consistente. Respétalas siempre.

1. **Carpetas en `snake_case`.** Todo: `use_auth`, `create_employee`, `form_input`, `articles_categories`. Nunca camelCase ni kebab-case en carpetas.
2. **Cada carpeta exporta vía `index.ts` / `index.tsx` (barrel).** Un import nunca apunta a un archivo "hoja"; apunta a la carpeta. Ej: `import { Button } from "@/components/ui"`.
3. **Alias `@` → `src`.** Importa con `@/...`, no con rutas relativas largas (`../../../`). Relativo solo dentro de la misma feature (`../types`, `../components`).
4. **Páginas → `export default function XxxPage()`.** El barrel las renombra: `export { default as CreateEmployeePage } from "./.../pages"`.
5. **Primitivos UI / hooks / utils → exports nombrados.** `export function Button(...)`, `export const useAuth = ...`.
6. **Hooks:** carpeta `use_xxx/`, función `useXxx`. **Schemas:** `xxxSchema` (zod). **Servicios:** funciones async sueltas.
7. **Tipos:** `interface` para objetos; "enums" como uniones de constantes string (`export const USER_TYPE_ADMIN = "admin"` + `type` que las une). No se usan `enum` de TS.
8. **`cn()` para clases** (`@/utilities`) = `twMerge(clsx(...))`. Para mezclar condicionalmente clases con las del consumidor. Algunos componentes usan `twMerge` directo; ambos valen, prefiere `cn`.
9. **Idioma:** UI, mensajes, validaciones y comentarios en **español**. Nombres de código (variables, funciones, tipos) en **inglés**.
10. **TS estricto.** `noUnusedLocals`, `noUnusedParameters`, `strict` activos. Tipa todo; evita `any` (usa `unknown` + narrowing o genéricos).

---

## 7. Routing, Guards y Auth (cómo se protege la app)

**Árbol de rutas** (`src/routes/index.tsx` → `[authRoutes, appRoutes, errorRoutes]`):

```
appRoutes  (path "/")
└── <AuthGuard>                 # ¿hay token y sesión válida? si no → /login
    └── <RoleGuard>             # ¿el rol coincide con el prefijo de la ruta? si no → home del rol
        └── <Sidebar layout>    # topbar + <Outlet/>
            ├── clientRoutes    # /client/*
            ├── adminRoutes     # /admin/*
            └── employeeRoutes  # /employee/*
authRoutes  → /login, /register, /recover-password, ...   (envueltas en GuestGuard)
errorRoutes → /500, * (not found)
```

- **Rutas centralizadas** en `src/routes/routes.ts` como objeto `ROUTES.{Auth,Client,Admin,Employee,Error}`. **Nunca hardcodees paths**; usa `ROUTES.Admin.ViewEmployees`, etc.
- **Auth se basa en `localStorage`:** claves `TOKEN_AUTH` (JWT) y `USER_AUTH` (perfil cacheado). El hook `useAuth` (`src/hooks/use_auth`) es la única fuente de verdad de sesión: lee localStorage, hidrata el store de Zustand, y solo llama a `getProfile()` si hay token pero no hay user cacheado.
- **Interceptor de request** añade `Authorization: Bearer <TOKEN_AUTH>` automáticamente. **Interceptor de response** convierte el error del backend en `new Error(description)` legible. → en los servicios NO vuelvas a tocar headers ni a formatear errores.
- `logout()` (de `useAuth`) limpia ambas claves y el store.

---

## 8. Arquitectura modular: **vertical slices por feature**

El corazón del repo. Cada **módulo** (`admin`, `client`, `employee`, `shared`) agrupa **features**, y cada feature es una **rebanada vertical autocontenida**:

```
src/modules/<rol>/<dominio>/features/<feature>/
├── pages/        index.tsx   → export default XxxPage()      (la pantalla)
├── components/   index.ts    → subcomponentes SOLO de esta feature
├── hooks/        index.ts    → lógica (useMutation/useQuery, handlers, onSubmit)
├── schema/       index.ts    → esquemas zod
├── services/     index.ts    → llamadas axios de esta feature
├── types/        index.ts    → tipos de esta feature
└── constants/    index.ts    → constantes locales (columnas, opciones, etc.)
```

Ejemplo real: `modules/admin/employee/features/create_employee/`.
Lo compartido entre features de un mismo dominio sube un nivel: `modules/admin/employee/{components,hooks,services,schema,types}` (ej. `DialogManager`, `useWorkAreaManager`).

**Regla de oro de ubicación:**
- ¿Lo usa **una** feature? → dentro de esa feature.
- ¿Lo usan **varias features de un mismo dominio**? → en la raíz del dominio (`modules/<rol>/<dominio>/`).
- ¿Lo usa **toda la app** (cualquier rol)? → en `src/{components,hooks,services,types,utilities}` globales.

> Receta completa de "cómo agrego una feature nueva" en [`docs/ARCHITECTURE_GUIDE.md`](docs/ARCHITECTURE_GUIDE.md).

---

## 9. Patrones de datos (cómo se habla con el backend)

**Servicio** = función async fina sobre `axiosInstance`. Devuelve `data` ya tipado. No maneja loading/errores de UI.

```ts
// services/index.ts (de una feature)
import { axiosInstance } from "@/interceptors";
export const createEmployee = async (data: CreateEmployeeForm) => {
  const res = await axiosInstance.post("/employee", data);
  return res.data;
};
```

**Lectura** = `useQuery` con `queryKey` en array que incluye TODOS los parámetros que afectan el resultado (paginación, búsqueda, filtros):

```ts
const { data, isLoading, isError } = useQuery({
  queryKey: ["employees", page, debouncedSearch, workAreaId, companyId],
  queryFn: () => getEmployees(page, debouncedSearch, workAreaId, companyId),
});
```

**Escritura** = `useMutation` dentro de un hook `use_xxx`, con `toast` en `onSuccess`/`onError` y navegación al terminar:

```ts
export const useCreateEmployee = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: createEmployee });
  const onSubmit = (data) => mutate(data, {
    onSuccess: () => { toast.success("Empleado creado correctamente", { description: "..." });
                       navigate(ROUTES.Admin.ViewEmployees); },
    onError: (e) => toast.error("Error al crear empleado", { description: e.message }),
  });
  return { onSubmit, isPending };
};
```

**Render de estados async** = componente `<AsyncBoundary>` (loading / error / empty / data), no `if (isLoading) ... if (isError) ...` repetido en la página:

```tsx
<AsyncBoundary isLoading={isLoading} isError={isError} data={data?.employees}
  LoadingComponent={<LoadingState/>} ErrorComponent={<ErrorState/>} EmptyComponent={<EmptyState/>}>
  {(employees) => <EmployeesTable employees={employees} />}
</AsyncBoundary>
```

**Búsqueda** siempre con `useDebounce` (500 ms) y reset de `page` a 1 cuando cambian filtros.

---

## 10. Formularios (el patrón es uniforme)

`react-hook-form` + `zodResolver` + componentes `Form*` ya cableados a RHF (reciben `register`/`control` + `errors`):

```tsx
const { register, handleSubmit, control, formState: { errors }, watch } =
  useForm<CreateEmployeeForm>({ resolver: zodResolver(createEmployeeSchema) });

<form onSubmit={handleSubmit(onSubmit)}>
  <FormInput label="Nombre" name="first_name" register={register} errors={errors} placeholder="Ej. Juan" />
  <FormSelect name="gender" control={control} label="Género" options={[...]} errors={errors} />
  <FormDatePicker label="Fecha de nacimiento" name="birth_date" control={control} errors={errors} />
</form>
```

- Componentes de formulario disponibles en `@/components/ui`: `FormInput`, `FormTextarea`, `FormSelect` (en módulo employee), `FormSelectWithActions`, `FormDatePicker`.
- **Mensajes de error de validación en español**, dentro del schema zod.
- **Color de error de formularios = `rose-800`** (`text-rose-800`, `border-rose-800`). Ver Design System.

---

## 11. Estado global (Zustand) — úsalo poco

Solo para estado realmente global y de sesión. Hoy existe `useUserStore` (`src/store/user`) con `user`, `setUser`, `deleteUser`. Patrón: selectores atómicos (`useUserStore((s) => s.user)`), no traer el store entero. Para datos del servidor usa React Query, **no** Zustand.

---

## 12. Design System (resumen — detalle en `docs/DESIGN_SYSTEM.md`)

- **Paleta de marca real: escala `stone` de Tailwind** (no la var `--primary` cruda). Botón primario `bg-stone-500`, cards `bg-stone-50`, topbar `bg-stone-950`, indicador activo `bg-stone-800`, texto principal `text-stone-900`.
- **Error / destructivo:** `rose-800` en formularios; variante `destructive` (var `--destructive`) en botones/diálogos.
- **Tipografía:** `font-sans` = **Plus Jakarta Sans** (cuerpo) · `font-serif` = **Fraunces** (títulos: `font-serif font-bold`) · `font-mono` = **IBM Plex Mono**.
- **Radio:** `--radius: 0.625rem`. Botones `rounded-full`; inputs/cards `rounded-lg`.
- **Contenedor de página:** `mx-auto max-w-{4xl|5xl|7xl} w-full px-4 mt-8`.
- **Grid de formularios:** `grid grid-cols-1 md:grid-cols-2 gap-6`, secciones con `space-y-4`.
- **Dark mode** está definido (`.dark` + tokens oklch) pero la app opera en claro; no asumas dark salvo que se pida.
- **Iconos:** lucide-react en contenido (`size-4` por defecto vía Button); heroicons/outline en la navegación.
- **Toaster:** sonner, `<Toaster expand visibleToasts={1} />` montado en `Core`. Feedback al usuario SIEMPRE vía `toast`, no `alert`.

---

## 13. Checklist antes de terminar un cambio

- [ ] Carpetas `snake_case`, con `index` que exporta (barrel).
- [ ] Imports con `@/...` (relativos solo dentro de la feature).
- [ ] Paths desde `ROUTES`, no strings sueltos.
- [ ] Lecturas con `useQuery` (queryKey completo) · escrituras con `useMutation` + `toast`.
- [ ] Estados async con `<AsyncBoundary>`; búsqueda con `useDebounce`.
- [ ] Formularios con RHF + zod + componentes `Form*`; errores en español, color `rose-800`.
- [ ] Estilos con tokens/paleta `stone`; títulos `font-serif font-bold`; usa `cn()`.
- [ ] Sin `any`; tipos exportados desde `types/`.
- [ ] `npm run lint` y `npm run build` pasan.

---

## 14. Trampas conocidas / deuda

- `README.md` y `ARCHITECTURE.md` están desfasados (env vars y módulos). Este archivo manda.
- `useCreateEmployee` envía un `profile_image` y `user_type` **hardcodeados** (placeholder). Si tocas creación de empleados, parametrízalos.
- `src/types/niubiz.d.ts` y restos de pagos NIUBIZ existen pero el flujo de pago fue removido (ver git log). No reintroduzcas sin pedirlo.
- `useTitle` setea `document.title` imperativamente; cada página llama `changeTitle("... - La base")` en un `useEffect`.
- El "Sidebar" es en realidad un **topbar horizontal** con indicador animado deslizante; el nombre es histórico.
