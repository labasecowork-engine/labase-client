---
name: product-engineering
description: Mentalidad de product engineering para labase-client — pensar en el usuario (admin/cliente/empleado), estados límite (loading/error/empty/permisos), feedback, flujos completos, métricas y entregar valor end-to-end. Úsala al planificar features, decidir alcance o revisar que un flujo esté realmente terminado.
---

# Product Engineering — para labase-client

No solo "hacer que funcione": entregar una experiencia completa y útil para el negocio del
coworking. Piensa en el producto, no solo en el ticket.

## Conoce al usuario
Tres roles, tres realidades (ver `CLAUDE.md`):
- **Admin:** opera el coworking; necesita eficiencia, listados filtrables, acciones masivas,
  confirmaciones claras antes de borrar, feedback inmediato.
- **Cliente:** reserva espacios; necesita simplicidad, claridad de disponibilidad/precio y
  confirmaciones tranquilizadoras.
- **Empleado:** registra asistencia/comunicación; flujos cortos, móvil-first.

Antes de construir, pregúntate: ¿qué rol lo usa, en qué contexto (móvil/desktop), qué decisión
o tarea está intentando completar?

## Entrega flujos completos, no fragmentos
Una feature "terminada" cubre el camino entero:
1. **Estado inicial / vacío:** ¿qué ve el usuario sin datos? (`EmptyState` con llamada a acción).
2. **Carga:** `LoadingState` (no pantalla en blanco).
3. **Éxito:** datos bien presentados + acciones obvias.
4. **Error:** `ErrorState` + mensaje accionable (el interceptor da mensajes legibles).
5. **Feedback de acciones:** `toast.success/error` con `description` que diga qué pasó y qué sigue.
6. **Confirmaciones destructivas:** `DeleteDialog`, nunca borrar sin confirmar.
7. **Permisos:** el `RoleGuard` protege rutas; no muestres acciones que el rol no puede ejecutar.

> Si entregas el "happy path" pero no vacío/error/feedback, **no está terminado**.

## Estados límite (edge cases) que SIEMPRE se consideran
- Listas vacías, primera vez sin datos.
- Errores de red / 4xx / 5xx (ya hay `getErrorMessageByStatus`).
- Sesión expirada (401 → vuelve a login).
- Inputs inválidos (validación zod con mensajes claros).
- Paginación en 1 sola página, filtros que no devuelven nada.
- Móvil: ¿el formulario/tabla es usable en pantalla pequeña?

## Alcance e iteración
- Define el MVP del flujo y constrúyelo end-to-end antes de pulir detalles.
- No metas opciones especulativas (YAGNI). Resuelve la necesidad real del rol.
- Reutiliza patrones existentes (otra feature CRUD ya resuelta) para ir más rápido y consistente.
- Cambios outward-facing o difíciles de revertir (borrados masivos, envíos de newsletter):
  confirma intención y deja feedback claro.

## Lenguaje y microcopy
- Todo en español, tono claro y cercano. Mensajes de error útiles (qué pasó + qué hacer).
- Placeholders con ejemplos reales; títulos de página descriptivos (`useTitle`).
- Botones con verbo + objeto ("Nuevo empleado", "Crear reserva").

## Calidad como parte del producto
- `npm run lint` y `npm run build` verdes antes de dar por hecho.
- Rendimiento percibido: debounce en búsquedas, estados de carga, no recargas innecesarias.
- Accesibilidad básica (labels, foco, teclado) = más usuarios atendidos.

## Checklist "¿está realmente listo?"
- [ ] ¿Cubre vacío / carga / éxito / error / confirmación / feedback?
- [ ] ¿Funciona y se ve bien en móvil y desktop?
- [ ] ¿El rol correcto lo ve y los demás no?
- [ ] ¿El microcopy en español ayuda a decidir/actuar?
- [ ] ¿Reutiliza patrones del repo en vez de inventar?
- [ ] ¿Lint + build pasan?
