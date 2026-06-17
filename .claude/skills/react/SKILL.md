---
name: react
description: Buenas prácticas de React 19 aplicadas a este repo (labase-client) — componentes funcionales, hooks, React Query, react-hook-form, Zustand, separación page/hook/componente y patrones del proyecto. Úsala al crear o revisar componentes, hooks, páginas, formularios o data-fetching en React.
---

# React 19 — buenas prácticas para labase-client

Aplica estas reglas al escribir o revisar React en este repo. Son específicas de cómo está
construido (ver `CLAUDE.md` y `docs/ARCHITECTURE_GUIDE.md`).

## Componentes
- Solo **componentes funcionales** + hooks. Nada de clases.
- **Páginas** (`pages/index.tsx`): `export default function XxxPage()`. Componen layout +
  orquestan hooks + renderizan subcomponentes. Mínima lógica inline.
- **Subcomponentes** de feature: presentacionales, reciben props, exports nombrados.
- Un componente = una responsabilidad. Si una page supera ~150 líneas o mezcla varias
  preocupaciones, extrae subcomponentes a `components/` y lógica a `hooks/`.
- Props tipadas con `interface Props` (o genéricas para componentes reutilizables).
  Acepta `className?` y mézclalo con `cn()` para permitir override del consumidor.

## Hooks
- Lógica no trivial vive en un hook `use_xxx/` con función `useXxx` (export nombrado).
- Mutaciones SIEMPRE en un hook (`useMutation` + `toast` + `navigate`), nunca inline en la page.
- Reglas de hooks: llámalos en el tope, nunca condicionales. Dependencias de `useEffect`/
  `useMemo`/`useCallback` completas y correctas (ESLint `react-hooks` está activo).
- `useMemo`/`useCallback` solo cuando hay coste real o identidad referencial necesaria
  (ej. el `useMemo` de `navigation` en `use_sidebar`). No memices por reflejo.

## Estado
- **Servidor → React Query** (`useQuery`/`useMutation`). Nunca dupliques datos del backend en
  estado local o Zustand.
- **Local de UI → `useState`** (abrir diálogos, inputs controlados, paginación).
- **Global de sesión → Zustand** con selectores atómicos: `useUserStore((s) => s.user)`.

## Data fetching (React Query v5)
- `queryKey` = array con TODOS los inputs que cambian el resultado: `["employees", page, search, ...]`.
- Búsqueda con `useDebounce(value, 500)`; resetea `page` a 1 al cambiar filtros (`useEffect`).
- Render de estados con `<AsyncBoundary>` (loading/error/empty/data) — no `if` repetidos.
- Tras mutar, `invalidateQueries` o `navigate`; feedback con `toast.success/error`.

## Formularios
- `useForm<XxxForm>({ resolver: zodResolver(xxxSchema) })`.
- Usa componentes `Form*` (`FormInput`, `FormSelect`, `FormDatePicker`, ...) cableados a RHF.
- `handleSubmit(onSubmit)` donde `onSubmit` viene del hook de la feature.
- Deshabilita el botón de envío con `isPending` de la mutación.

## Rendimiento y corrección
- Listas con `key` estable y único (id), nunca el índice si la lista reordena.
- Evita crear funciones/objetos nuevos en props de listas grandes; memoiza si causa renders.
- Cleanup en efectos con suscripciones (sockets, listeners, timers).
- No accedas a `window`/`localStorage` sin guardar SSR-safety si aplica (ver `useAuth`).

## Checklist al revisar React
- [ ] ¿Lógica en hook, presentación en componente, composición en page?
- [ ] ¿Datos del servidor en React Query con queryKey correcto?
- [ ] ¿Estados async vía AsyncBoundary y feedback vía toast?
- [ ] ¿Dependencias de efectos correctas? ¿keys estables?
- [ ] ¿Props tipadas y `className` con `cn()`?
