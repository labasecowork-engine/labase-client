---
name: clean-code
description: Principios de código limpio y mantenibilidad aplicados a labase-client — nombres, funciones pequeñas, separación de responsabilidades, DRY/KISS/YAGNI, barrels, ubicación de código y reducción de complejidad. Úsala al escribir, refactorizar o revisar cualquier código del repo.
---

# Clean Code — para labase-client

Cómo mantener el código limpio respetando los patrones reales del proyecto.

## Nombres
- Identificadores en **inglés**, descriptivos y sin abreviaturas crípticas. Texto de UI y
  comentarios en **español**.
- Sigue las convenciones del repo: carpetas `snake_case`, componentes `PascalCase`, hooks
  `useXxx`, servicios `verboRecurso`, schemas `xxxSchema`, constantes `SCREAMING_SNAKE_CASE`.
- El nombre revela la intención: `useCreateEmployee`, `getEmployees`, `EmptyState`.

## Funciones y componentes pequeños
- Una función/componente = una responsabilidad. Si hace fetch + valida + renderiza + navega,
  divídelo: page (composición) ↔ hook (lógica) ↔ componente (presentación).
- Evita "páginas Dios". Extrae `components/` (UI) y `hooks/` (lógica) de la feature.
- Pocos parámetros: si un componente recibe muchísimas props (como un `DialogManager`),
  considera agrupar en objetos o dividir responsabilidades.

## Separación de responsabilidades (clave en este repo)
- **Servicios:** solo I/O HTTP. No UI, no estado.
- **Hooks:** lógica/estado/efectos. No JSX salvo el imprescindible.
- **Componentes/pages:** presentación y composición. No reglas de negocio dispersas.
- **Interceptores:** auth y errores transversales — no los dupliques en cada servicio.

## DRY / KISS / YAGNI
- **DRY con criterio:** extrae cuando algo se repite por 2.ª/3.ª vez y la abstracción es clara
  (ej. `AsyncBoundary`, `FormInput`, `cn`). No abstraigas por anticipado.
- **KISS:** prefiere la solución directa. La librería ya resuelve mucho (RHF, React Query, zod);
  no reinventes loading states, validaciones manuales ni manejo de token.
- **YAGNI:** no añadas props/opciones/config "por si acaso". Construye lo que la feature pide.

## Ubicación correcta
- Coloca el código en su alcance mínimo (feature → dominio → global). Promueve solo cuando se
  reutiliza. Borra código muerto (hay restos de NIUBIZ/pagos: no los amplíes, elimínalos si
  estorban y se confirma).

## Legibilidad
- Imports vía barrels y alias `@`; relativos cortos dentro de la feature.
- Early returns en vez de anidación profunda (ver guards: `if (!user) return null`).
- Constantes con nombre en vez de "magic values" (`USER_TYPE_ADMIN`, `ROUTES.Admin.X`,
  `staleTime`).
- Comentarios que explican el **porqué**, no el qué; el código dice el qué.

## Consistencia > preferencia personal
- Imita el estilo del archivo/vecindario que tocas (densidad de comentarios, formato, patrón
  de hook/page). Prettier (`prettier 3.6`) y ESLint mandan sobre el formato.

## Checklist al revisar
- [ ] ¿Nombres claros y según convención?
- [ ] ¿Responsabilidades separadas (servicio/hook/componente)?
- [ ] ¿Sin duplicación evidente ni abstracción prematura?
- [ ] ¿Código en su ubicación de alcance correcta? ¿Sin código muerto?
- [ ] ¿Early returns, constantes con nombre, imports limpios?
- [ ] ¿`npm run lint` pasa?
