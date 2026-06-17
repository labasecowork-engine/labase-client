---
name: ui-ux
description: Diseño de UI y UX para labase-client — design system (paleta stone, tipografía Fraunces/Plus Jakarta, radios, tokens), componentes shadcn, layout responsive, estados, jerarquía visual, accesibilidad y microinteracciones. Úsala SIEMPRE que construyas, ajustes o revises interfaz, estilos, layout o experiencia de usuario.
---

# UI / UX — para labase-client

La guía visual y de experiencia. Detalle completo en `docs/DESIGN_SYSTEM.md`. Aplica esto en
todo lo que se vea en pantalla.

## Identidad visual (no la rompas)
- **Estética:** sobria, cálida, neutra, editorial. El color da jerarquía, no decoración.
- **Paleta real = escala `stone`** de Tailwind (no inventes azules/verdes):
  - Texto/títulos `text-stone-900`; secundario `text-stone-500`.
  - Botón primario `bg-stone-500` (hover `bg-stone-400`); cards `bg-stone-50`; hover `bg-stone-100`.
  - Topbar `bg-stone-950`; indicador activo `bg-stone-800`; bordes `border-stone-200`; foco `focus:border-stone-600`.
- **Error de formulario = `rose-800`** (`text-rose-800`, `border-rose-800`). Destructivo = token `--destructive`.
- **Tipografía:** títulos `font-serif font-bold` (Fraunces); cuerpo `font-sans` (Plus Jakarta Sans, default); datos/código `font-mono` (IBM Plex Mono).
- **Forma:** botones `rounded-full`; inputs/cards `rounded-lg`. Cards planas (sin borde ni sombra).

## Reutiliza el Design System antes de crear
Importa de `@/components/ui`: `Button`, `Card`, `FormInput/FormTextarea/FormSelect*`,
`FormDatePicker`, `AsyncBoundary`, `CustomHeader`, `CardNavigation`, `Pagination`,
`DeleteDialog`, `Dialog/AlertDialog`, `Select`, `Popover`, `DropdownMenu`, `Switch`, `Avatar`,
`Table`, `Calendar`, `FileDropZone`, `Image`, `LoaderSplash`, `Sonner`. Mezcla clases con `cn()`
y permite override por `className`.

## Layout y responsive (mobile-first)
- Contenedor: `mx-auto max-w-4xl|5xl|7xl w-full px-4 mt-8` (4xl formularios, 5xl listados, 7xl topbar).
- Formularios: `grid grid-cols-1 md:grid-cols-2 gap-6`, secciones `space-y-4` / campos `space-y-2`.
- Diseña primero móvil y escala con `sm: md: lg:`. Verifica que tablas/formularios sean usables en pantalla pequeña.

## Jerarquía visual
- Un único título serif por página (`CustomHeader`), acción primaria a la derecha (`Button` con `PlusIcon` + verbo).
- Agrupa en `Card` (`bg-stone-50`); separa secciones con espacio, no con líneas.
- Tamaños: título `text-2xl sm:text-3xl`, cuerpo `text-sm`, secundario `text-stone-500`.

## Estados (UX no negociable)
Cada vista con datos cubre los cuatro estados con `AsyncBoundary` + componentes por feature:
- **Loading** → `LoadingState` (nunca pantalla en blanco).
- **Empty** → `EmptyState` con llamada a la acción.
- **Error** → `ErrorState` con mensaje accionable.
- **Data** → contenido + acciones claras.

## Feedback y confirmaciones
- Resultado de acciones → `toast.success/error` (sonner) con `description`. Una notificación a la vez.
- Acciones destructivas → `DeleteDialog`/`AlertDialog`. Nunca `alert`/`confirm` nativos.
- Botones de envío deshabilitados con `isPending` durante mutaciones.

## Microinteracciones
- Transiciones suaves (`transition-colors`, `transition-all`). El indicador del nav se desliza
  (`transition-all duration-300 ease-out`). Hover states en todo lo clicable (`cursor-pointer`).
- No abuses de animación; refuerza la acción, no distrae.

## Accesibilidad
- Usa los primitivos Radix (teclado/foco/roles correctos de base).
- Labels asociadas a inputs (`htmlFor`/`id`) — los `Form*` ya lo hacen.
- `aria-current="page"` en nav activo; `aria-invalid` para inputs con error.
- Contraste suficiente; no comuniques estado solo con color (añade texto/icono).
- Enlaces externos: `target="_blank"` + `rel="noopener noreferrer"`.

## Microcopy
- Todo en español, claro y cercano. Placeholders con ejemplos ("Ej. Juan"). Errores que digan
  qué pasó y qué hacer. Verbo + objeto en botones.

## Checklist al revisar UI/UX
- [ ] ¿Paleta `stone` + error `rose-800` + títulos `font-serif font-bold`?
- [ ] ¿Reutiliza componentes de `@/components/ui` con `cn()`?
- [ ] ¿Responsive mobile-first y contenedor/grids estándar?
- [ ] ¿Cubre loading/empty/error/data (AsyncBoundary)?
- [ ] ¿Feedback con toast y confirmación con DeleteDialog?
- [ ] ¿Accesible (labels, foco, aria, contraste) y microcopy en español?
