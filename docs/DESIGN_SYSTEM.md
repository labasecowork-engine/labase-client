# Design System — La Base Cowork

Referencia completa de identidad visual, tokens, tipografía, componentes y patrones de
UI/UX del frontend. La fuente real de los tokens es **`src/styles/index.css`** (TailwindCSS
v4, config en CSS con `@theme inline`). Esto documenta lo que ese archivo y los componentes
de `src/components/ui` realmente hacen.

---

## 1. Filosofía visual

- **Sobrio, cálido y neutro.** La marca se construye sobre la escala **`stone`** de Tailwind
  (grises cálidos), no sobre colores saturados. El color aporta jerarquía, no decoración.
- **Tipografía con contraste editorial:** títulos en serif elegante (Fraunces), cuerpo en
  sans geométrica legible (Plus Jakarta Sans).
- **Formas suaves:** radios generosos, botones tipo "pill" (`rounded-full`).
- **Superficies planas:** cards sin borde ni sombra fuerte (`bg-stone-50`), profundidad por
  contraste de tono, no por elevación.

---

## 2. Color

### 2.1 La verdad práctica: paleta `stone`

Aunque existen tokens semánticos (`--primary`, etc.), **los componentes usan directamente la
escala `stone` de Tailwind**. Esta es la paleta operativa real:

| Uso                                   | Clase Tailwind            |
| ------------------------------------- | ------------------------- |
| Texto principal / títulos             | `text-stone-900`          |
| Texto secundario / labels suaves      | `text-stone-500`          |
| Fondo de página                       | `bg-white` (background)   |
| Superficie de card / inputs auxiliares| `bg-stone-50`             |
| Hover de superficies                  | `bg-stone-100`            |
| Botón primario                        | `bg-stone-500` → hover `bg-stone-400` |
| Borde de botón outline / inputs       | `border-stone-200`        |
| Topbar de navegación                  | `bg-stone-950`            |
| Indicador activo de navegación        | `bg-stone-800`            |
| Foco de input                         | `focus:border-stone-600`  |

### 2.2 Color de error / destructivo

- **Errores de formulario:** **`rose-800`** → `text-rose-800` y `border-rose-800`. Es el color
  estándar para mensajes de validación e inputs inválidos.
- **Acciones destructivas** (botón `destructive`, diálogos de borrado): token `--destructive`
  (`bg-destructive text-white`).

### 2.3 Tokens semánticos (CSS variables, oklch)

Definidos en `:root` y `.dark` en `src/styles/index.css`. Se exponen a Tailwind vía
`@theme inline` como `--color-*` (p. ej. `bg-primary`, `text-muted-foreground`,
`border-border`). Valores clave en claro:

| Token                  | Valor (oklch)                | Equivale a            |
| ---------------------- | ---------------------------- | --------------------- |
| `--background`         | `oklch(1 0 0)`               | blanco                |
| `--foreground`         | `oklch(0.145 0 0)`           | casi negro            |
| `--primary`            | `oklch(55.3% 0.013 58.071)`  | gris cálido (~stone-500) |
| `--secondary`/`--muted`/`--accent` | `oklch(0.97 0 0)`| gris muy claro        |
| `--destructive`        | `oklch(45.5% 0.188 13.697)`  | rojo                  |
| `--border` / `--input` | `oklch(0.922 0 0)`           | gris claro            |
| `--ring`               | `oklch(0.708 0 0)`           | gris medio (foco)     |
| `--radius`             | `0.625rem` (10px)            | radio base            |

Charts (`--chart-1..5`) y tokens `--sidebar-*` existen para gráficos/navegación.

> **Regla:** para UI nueva, usa la escala `stone` como hacen los componentes existentes.
> Usa tokens semánticos (`bg-background`, `text-muted-foreground`, `border-border`) cuando
> extiendas/edites primitivos shadcn que ya los usan. No introduzcas colores nuevos
> (azules, verdes, etc.) sin acordarlo.

### 2.4 Dark mode

`.dark` redefine todos los tokens (oklch oscuros) y `@custom-variant dark (&:is(.dark *))`
habilita el prefijo `dark:`. **La app opera en modo claro**; el dark está preparado pero no
es el estado por defecto. No asumas dark salvo petición explícita; si añades estilos, conserva
las variantes `dark:` que traen los componentes shadcn.

---

## 3. Tipografía

Fuentes cargadas vía Google Fonts en `src/styles/index.css` y expuestas como tokens:

| Token         | Fuente                | Uso                                                |
| ------------- | --------------------- | -------------------------------------------------- |
| `font-sans`   | **Plus Jakarta Sans** | Cuerpo, labels, inputs, botones (default del body) |
| `font-serif`  | **Fraunces**          | Títulos y encabezados (`font-serif font-bold`)     |
| `font-mono`   | **IBM Plex Mono**     | Código, datos monoespaciados, tickets/QR           |

**Escala de texto observada:**

- Título de página: `text-2xl sm:text-3xl font-serif font-bold text-stone-900` (ver `CustomHeader`).
- Título de card: `text-2xl font-semibold font-serif` (ver `CardTitle`).
- Cuerpo / inputs / labels: `text-sm`.
- Descripciones secundarias: `text-sm text-muted-foreground` o `text-stone-500`.

---

## 4. Forma, espaciado y layout

- **Radio:** botones `rounded-full` (pill); inputs y cards `rounded-lg`; chips/segmentos `rounded-full`.
- **Contenedor de página:** `mx-auto max-w-4xl|5xl|7xl w-full px-4 mt-8`.
  - Formularios de detalle → `max-w-4xl`.
  - Listados/tablas → `max-w-5xl`.
  - Topbar → `max-w-7xl`.
- **Grids de formulario:** `grid grid-cols-1 md:grid-cols-2 gap-6`; bloques verticales con `space-y-4` / `space-y-2`.
- **Mobile-first:** se diseña para móvil y se escala con `sm: md: lg:`.
- **Breakpoints (Tailwind):** `sm 640` · `md 768` · `lg 1024` · `xl 1280`.

---

## 5. Componentes del Design System (`src/components/ui`)

Mezcla de **primitivos shadcn/ui** (Radix) y **compuestos propios**. Todos se importan desde
el barrel: `import { Button, Card, AsyncBoundary } from "@/components/ui"`.

### Primitivos (shadcn, estilo new-york)
`Button`, `Input`, `Textarea`, `Label`, `Card` (+ Header/Title/Description/Content/Footer),
`Select`, `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `ContextMenu`, `Switch`,
`Avatar`, `Calendar`, `Table`, `ScrollArea`, `Carousel`, `InputOTP`, `Sonner` (Toaster).

### Compuestos propios (patrones de la app)
| Componente               | Para qué |
| ------------------------ | -------- |
| `AsyncBoundary`          | Render declarativo de loading/error/empty/data (ver Architecture Guide). |
| `CustomHeader`           | Encabezado de página: título serif + botón "volver" opcional (flecha). |
| `CardNavigation`         | Tarjeta-link de navegación con icono, título y descripción. |
| `Pagination`             | Paginación estándar (page / totalPages / onPageChange). |
| `FormInput`              | `Input` cableado a react-hook-form (`register` + `errors`). |
| `FormTextarea`           | `Textarea` cableado a RHF. |
| `FormSelectWithActions`  | Select RHF con acciones crear/editar/borrar inline de las opciones. |
| `AsyncSelect`            | Select con carga asíncrona de opciones. |
| `DeleteDialog`           | Confirmación de borrado reutilizable. |
| `CustomAlert` / `StatusMessage` / `Alert` | Mensajería de estado. |
| `FileDropZone`           | Subida de archivos drag & drop. |
| `Image`                  | Imagen con fallback (`/public/image_error.png`). |
| `LoaderSplash`           | Loader de pantalla completa (animación `loader-splash` en CSS). |

### Anatomía de un botón (referencia de variantes)

`Button` usa `class-variance-authority`. Base: `rounded-full text-sm font-medium`, foco con
`ring-ring/50 ring-[3px]`, `cursor-pointer`.

| `variant`     | Estilo |
| ------------- | ------ |
| `default`     | `bg-stone-500 text-white hover:bg-stone-400` |
| `destructive` | `bg-destructive text-white hover:bg-destructive/90` |
| `outline`     | `border bg-stone-50 hover:bg-stone-100 border-stone-200` |
| `secondary`   | `bg-secondary text-secondary-foreground` |
| `ghost`       | `hover:bg-accent hover:text-accent-foreground` |
| `link`        | `text-primary underline-offset-4 hover:underline` |

| `size`    | Padding |
| --------- | ------- |
| `default` | `px-8 py-3` |
| `sm`      | `px-6 py-2` |
| `lg`      | `px-12 py-4` |
| `icon`    | `size-9` |

`asChild` (Radix `Slot`) permite renderizar como `<Link>` u otro elemento conservando estilos.
Iconos dentro del botón se auto-dimensionan a `size-4`.

### Anatomía de un input

`h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm`,
`focus:border-stone-600 focus:shadow-sm`, `disabled:opacity-50`. Si `type="password"`,
incluye toggle de visibilidad con icono ojo (`EyeIcon`/`EyeOffIcon`).

### Anatomía de una card

`bg-stone-50 rounded-lg border-none shadow-none`. Sin elevación: la separación es por color.
`CardTitle` es serif. Padding de contenido `p-6`.

---

## 6. Patrones de UI/UX

### Navegación (topbar)
- Barra superior oscura (`bg-stone-950`, alto `h-24`) con logo a la izquierda, navegación por
  rol al centro y dropdown de usuario a la derecha. En móvil colapsa a menú hamburguesa.
- **Indicador activo deslizante:** un `div` absoluto (`bg-stone-800 rounded-full`) que se mueve
  con `transition-all duration-300 ease-out` siguiendo el item activo o en hover. La navegación
  visible por rol se define en `getNavigationConfig` (sidebar/utils).
- Enlaces externos (p. ej. `https://www.labase.pe`) abren en `_blank` con `rel="noopener noreferrer"`.

### Encabezado de página
Usa `CustomHeader` (título serif). Para acciones primarias, un `Button` a la derecha con icono
`PlusIcon` + texto (patrón "Nuevo X"), dentro de un `<Link to={ROUTES...}>`.

### Estados de carga, error y vacío
Tres estados SIEMPRE explícitos vía `AsyncBoundary` + componentes `LoadingState` / `ErrorState`
/ `EmptyState` por feature. Nunca dejes una lista sin estado vacío ni un fetch sin feedback.

### Feedback de acciones
- Éxito/error de mutaciones → `toast.success` / `toast.error` (sonner) con `description`.
- Confirmaciones destructivas → `DeleteDialog` / `AlertDialog`, nunca `window.confirm`.
- Toaster configurado con `expand` y `visibleToasts={1}` (una notificación a la vez).

### Formularios
- Layout en grid de 2 columnas en desktop, 1 en móvil.
- Cada campo: `Label` + control + mensaje de error (`text-sm text-rose-800`) cuando aplica.
- Prefijos visuales cuando aportan contexto (ej. `+51` pegado al input de teléfono).
- Placeholders con ejemplos reales ("Ej. Juan", "Ej. ejemplo@labase.com").

### Accesibilidad
- Componentes Radix → roles/teclado/foco correctos de base.
- `aria-current="page"` en el nav activo; `aria-invalid` dispara estilos de error en inputs.
- Mantén labels asociadas (`htmlFor`/`id`) — los `Form*` ya lo hacen.

---

## 7. Reglas rápidas para UI nueva

1. Reutiliza primitivos de `@/components/ui` antes de crear uno nuevo.
2. Paleta `stone`; error `rose-800`; títulos `font-serif font-bold`.
3. Botones `rounded-full`; cards/inputs `rounded-lg`.
4. Mezcla clases con `cn()`; deja que el consumidor pueda sobreescribir vía prop `className`.
5. Mobile-first con `md:`/`lg:`. Contenedor `mx-auto max-w-* px-4`.
6. Todo texto visible en español. Feedback con `toast`. Estados async con `AsyncBoundary`.
