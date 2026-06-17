# Architecture Guide — La Base Cowork (frontend)

Guía profunda de la arquitectura, convenciones y **recetas paso a paso** para extender el
proyecto sin romper su consistencia. Complementa a [`../CLAUDE.md`](../CLAUDE.md) (resumen
operativo) y a [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (visual).

---

## 1. Principio rector: Feature-Sliced + Barrel Exports

La app se organiza en **rebanadas verticales por feature**. Una feature contiene todo lo que
necesita (UI, lógica, datos, tipos, validación) en su propia carpeta. Esto da:

- **Localidad:** todo lo de "crear empleado" vive junto; se navega y se borra fácil.
- **Bajo acoplamiento:** features no se importan entre sí; comparten subiendo de nivel.
- **Escalabilidad:** agregar una feature no toca las existentes.

Cada carpeta expone su API pública mediante un **barrel** (`index.ts`/`index.tsx`). Los
consumidores importan la carpeta, nunca el archivo interno.

```ts
// ✅ correcto
import { Button, Card } from "@/components/ui";
import { useCreateEmployee } from "../hooks";
// ❌ evitar
import { Button } from "@/components/ui/button/index.tsx";
```

---

## 2. Jerarquía de ubicación (dónde va cada cosa)

```
Alcance del código          → Ubicación
─────────────────────────────────────────────────────────────────────
Toda la app (cualquier rol) → src/{components,hooks,services,types,utilities,store,constants}
Un rol+dominio, varias      → src/modules/<rol>/<dominio>/{components,hooks,services,schema,types}
features
Una sola feature            → src/modules/<rol>/<dominio>/features/<feature>/{pages,components,hooks,schema,services,types,constants}
```

**Decisión rápida:** empieza colocando algo dentro de la feature. Solo *promuévelo* a un nivel
superior cuando una segunda feature lo necesite (regla "rule of three" relajada a dos).

### Módulos actuales

```
modules/
├── admin/      reservations, calendar, spaces, employee, attendance, articles,
│               articles_categories, inventory, visitors, reminders, newsletter, content (tools)
├── client/     reservations, profile
├── employee/   attendance, communication, profile
└── shared/     auth (login/register/recover/change password), profile, chat, error (404/500)
```

---

## 3. Anatomía de una feature (contrato de carpetas)

| Carpeta       | Export             | Responsabilidad |
| ------------- | ------------------ | --------------- |
| `pages/`      | `default` → barrel lo renombra a `XxxPage` | Compone la pantalla: orquesta hooks + componentes. Poca lógica. |
| `components/` | nombrados          | Subcomponentes presentacionales de la feature (`Header`, `XxxTable`, `EmptyState`, `LoadingState`, `ErrorState`, `FiltersPanel`). |
| `hooks/`      | nombrados `useXxx` | Lógica: `useQuery`/`useMutation`, `onSubmit`, handlers, toasts, navegación. |
| `schema/`     | `xxxSchema`        | Validación zod + tipos inferidos. |
| `services/`   | nombrados async    | Llamadas axios concretas de la feature. |
| `types/`      | `interface`/`type` | Formularios (`XxxForm`), respuestas (`XxxResponse`). |
| `constants/`  | nombrados          | Columnas de tabla, opciones de select, textos de tarjetas, etc. |

**Separación de responsabilidades dentro de la feature:**
- `pages` = composición y layout. No hace fetch directo de lógica compleja; delega en hooks.
- `hooks` = el "cerebro". Aquí vive React Query, los handlers y los efectos.
- `components` = presentación pura, reciben props.

> Páginas simples (un listado) pueden usar `useQuery` inline en la page (ver
> `view_employees`). Páginas con mutaciones siempre extraen la lógica a un hook `use_xxx`.

---

## 4. Convenciones de nombres (tabla de referencia)

| Elemento            | Convención                         | Ejemplo |
| ------------------- | ---------------------------------- | ------- |
| Carpetas            | `snake_case`                       | `create_employee`, `use_auth`, `form_input` |
| Archivo de barrel   | `index.ts` / `index.tsx`           | siempre |
| Componente React    | `PascalCase`                       | `EmployeesTable`, `CustomHeader` |
| Página              | `XxxPage` (default export)         | `CreateEmployeePage` |
| Hook                | carpeta `use_xxx`, fn `useXxx`     | `useCreateEmployee` |
| Servicio            | verbo + recurso (camelCase)        | `getEmployees`, `createEmployee` |
| Schema zod          | `xxxSchema`                        | `createEmployeeSchema` |
| Tipo de formulario  | `XxxForm`                          | `CreateEmployeeForm` |
| Tipo de respuesta   | `XxxResponse`                      | `EmployeesResponse`, `ListUsersResponse` |
| Constante "enum"    | `SCREAMING_SNAKE_CASE`             | `USER_TYPE_ADMIN`, `USER_GENDER_MALE` |
| Ruta                | `ROUTES.<Rol>.<Accion>`            | `ROUTES.Admin.CreateEmployee` |

**Idioma:** identificadores en inglés; texto de UI, validaciones y comentarios en español.

---

## 5. Capa de datos en detalle

### 5.1 Servicios (axios)
- Una función async fina por endpoint. Usa `axiosInstance` de `@/interceptors`.
- El interceptor ya inyecta el token y normaliza errores; **no** los repitas.
- Tipa la respuesta. Muchas respuestas del backend vienen envueltas en `Response<T>`
  (`{ data, description, ... }`); extrae `data.data` y lanza error si falta (ver `getProfile`).
- Para query params, construye con `URLSearchParams` y añade solo los definidos (ver `getUsers`).

### 5.2 Lecturas con React Query
- `queryKey` = array que **incluye todos los inputs** que cambian el resultado:
  `["employees", page, debouncedSearch, workAreaId, companyId]`.
- Desestructura `isLoading`/`isPending`, `isError`, `data`.
- Resetea `page` a 1 con un `useEffect` cuando cambian búsqueda/filtros.
- Búsqueda → `useDebounce(search, 500)`.

### 5.3 Escrituras con React Query
- `useMutation({ mutationFn })` dentro de un hook `use_xxx`.
- `onSuccess`: `toast.success(titulo, { description })` + `navigate(ROUTES...)` y/o
  `queryClient.invalidateQueries` si hay que refrescar listas.
- `onError`: `toast.error(titulo, { description: error.message })` (el message ya viene
  legible del interceptor).
- Expón `{ onSubmit, isPending }` para que la page conecte el form y deshabilite el botón.

### 5.4 Estados async en UI
Usa `<AsyncBoundary isLoading isError data {...}>` con `LoadingComponent`, `ErrorComponent`,
`EmptyComponent` y un render-prop `children={(data) => ...}`. Trata loading/error/empty como
ciudadanos de primera clase.

---

## 6. Autenticación y autorización (flujo completo)

```
Login form ─submit─▶ POST /auth/login ─▶ { token, user }
        │
        ├─ localStorage.setItem("TOKEN_AUTH", token)
        └─ localStorage.setItem("USER_AUTH", JSON(user)) + useUserStore.setUser
                                   │
Navegación a ruta protegida        ▼
  <AuthGuard>  ¿token y sesión válida?
     │  no → limpia TOKEN_AUTH → <Navigate to="/login">
     │  pending → <LoaderSplash/>
     ▼ sí
  <RoleGuard>  ¿user_type casa con el prefijo (/admin|/client|/employee)?
     │  no → <Navigate to={home del rol}>
     ▼ sí
  <Sidebar> (topbar) → <Outlet/> renderiza la ruta
```

- **`useAuth`** centraliza todo: lee `TOKEN_AUTH`/`USER_AUTH`, hidrata Zustand, y solo hace
  `getProfile()` si hay token sin user cacheado. Devuelve `{ token, user, isPending, isError, logout }`.
- **Interceptor request**: `Authorization: Bearer <TOKEN_AUTH>`.
- **Interceptor response**: convierte el error en `new Error(description)`.
- **`logout()`**: borra ambas claves + `deleteUser()`.
- Para leer el usuario en cualquier componente: `const { user } = useAuth()`.

---

## 7. Routing

- Todas las rutas como constantes en `src/routes/routes.ts` (`ROUTES.Admin.*`, etc.).
- Config de rutas por rol en `src/routes/{admin,client,employee,auth,error}_routes`.
- `app_routes` ensambla guards + layout + rutas por rol.
- Para añadir una ruta: 1) constante en `routes.ts`; 2) entrada `{ path, element }` en el
  `*_routes` del rol; 3) export de la page en el barrel del módulo (`modules/<rol>/index.ts`).

---

## 8. RECETA: agregar una feature nueva (paso a paso)

Supongamos "crear cupón" en admin (`modules/admin/coupons/features/create_coupon`).

1. **Estructura**
   ```
   modules/admin/coupons/features/create_coupon/
   ├── types/index.ts        export interface CreateCouponForm { ... }
   ├── schema/index.ts        export const createCouponSchema = z.object({ ... })  // mensajes en español
   ├── services/index.ts      export const createCoupon = async (d: CreateCouponForm) => (await axiosInstance.post("/coupon", d)).data
   ├── hooks/
   │   ├── index.ts           export * from "./use_create_coupon"
   │   └── use_create_coupon/index.ts   // useMutation + toast + navigate
   ├── components/index.ts    // Header u otros subcomponentes
   └── pages/index.tsx        export default function CreateCouponPage() { ... }
   ```
2. **Ruta:** añade `CreateCoupon: "/admin/coupons/create"` en `ROUTES.Admin`.
3. **Barrel del módulo:** en `modules/admin/index.ts`:
   `export { default as CreateCouponPage } from "./coupons/features/create_coupon/pages";`
4. **Registro de ruta:** en `routes/admin_routes/index.tsx`:
   `{ path: ROUTES.Admin.CreateCoupon, element: <admin.CreateCouponPage /> }`
5. **Página:** título con `useTitle` en `useEffect`; form con `useForm + zodResolver`;
   campos con `FormInput`/`FormSelect`; submit con `handleSubmit(onSubmit)` del hook.
6. **Navegación (opcional):** si debe verse en el topbar, añádelo en `getNavigationConfig`.
7. **Verifica:** `npm run lint` y `npm run build`.

### Plantilla mínima de page

```tsx
import { Card, CardContent, FormInput } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { createCouponSchema } from "../schema";
import type { CreateCouponForm } from "../types";
import { useCreateCoupon } from "../hooks";

export default function CreateCouponPage() {
  const { changeTitle } = useTitle();
  const { onSubmit, isPending } = useCreateCoupon();
  const { register, handleSubmit, formState: { errors } } =
    useForm<CreateCouponForm>({ resolver: zodResolver(createCouponSchema) });

  useEffect(() => { changeTitle("Crear cupón - La base"); }, [changeTitle]);

  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6 space-y-4">
            <FormInput label="Código" name="code" register={register} errors={errors} placeholder="Ej. VERANO25" />
            {/* ... + botón submit deshabilitado con isPending ... */}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
```

### Plantilla de hook de mutación

```ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES } from "@/routes/routes";
import { createCoupon } from "../../services";
import type { CreateCouponForm } from "../../types";

export const useCreateCoupon = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: createCoupon });
  const onSubmit = (data: CreateCouponForm) =>
    mutate(data, {
      onSuccess: () => {
        toast.success("Cupón creado correctamente", { description: "Ya está disponible." });
        navigate(ROUTES.Admin.ViewCoupons);
      },
      onError: (e: Error) => toast.error("Error al crear cupón", { description: e.message }),
    });
  return { onSubmit, isPending };
};
```

---

## 9. RECETA: agregar un componente al Design System

1. Carpeta `src/components/ui/<nombre_snake_case>/index.tsx`.
2. Export nombrado (`export function MiComponente(...)`), props tipadas, `className` opcional
   mezclado con `cn()`.
3. Reutiliza primitivos shadcn y paleta `stone`/tokens; respeta radios y tipografía.
4. Regístralo en `src/components/ui/index.ts` (`export * from "./mi_componente"`).

---

## 10. Errores comunes a evitar

- ❌ Importar de un archivo interno en vez del barrel.
- ❌ Hardcodear paths (`"/admin/employees"`) en lugar de `ROUTES.Admin.ViewEmployees`.
- ❌ Manejar el token o formatear errores dentro de un servicio (lo hace el interceptor).
- ❌ Repetir `if (isLoading)`/`if (isError)` en vez de `AsyncBoundary`.
- ❌ Guardar datos del servidor en Zustand (usa React Query).
- ❌ `any`, `enum` de TS, carpetas camelCase, texto de UI en inglés.
- ❌ Colores fuera de la paleta `stone`/tokens; títulos sin `font-serif`.
- ❌ `window.confirm`/`alert` en vez de `DeleteDialog`/`toast`.
