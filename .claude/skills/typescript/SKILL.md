---
name: typescript
description: Convenciones de TypeScript para labase-client — modo strict, interfaces vs uniones de constantes, genéricos, evitar any, tipos de formulario/respuesta y barrels tipados. Úsala al definir tipos, schemas, servicios o cualquier código TS/TSX.
---

# TypeScript — convenciones para labase-client

`tsconfig.app.json` está en **strict** con `noUnusedLocals`, `noUnusedParameters`,
`noFallthroughCasesInSwitch`, `verbatimModuleSyntax`. El build (`tsc -b`) debe pasar sin errores.

## Reglas base
- **Prohibido `any`.** Usa `unknown` + narrowing, genéricos, o un tipo preciso. Si un cast es
  inevitable, acótalo y coméntalo (como el `as unknown as UseFormWatch<...>` documentado).
- **`interface` para formas de objeto** (props, respuestas, formularios). `type` para uniones,
  intersecciones y utilitarios.
- **Imports de solo-tipo con `import type`** (lo exige `verbatimModuleSyntax`):
  `import type { User } from "@/types/user"`.
- No uses `enum` de TS. Usa **uniones de constantes string**:
  ```ts
  export const USER_TYPE_ADMIN = "admin";
  export const USER_TYPE_CLIENT = "client";
  export interface User { user_type: "admin" | "employee" | "client"; }
  ```
  Esto da literales tree-shakeables y evita el runtime de `enum`.

## Tipos de dominio
- Tipos globales (compartidos por toda la app) → `src/types/<dominio>/index.ts`.
- Tipos de una feature → `features/<feature>/types/index.ts`.
- Convención de nombres:
  - Formularios: `XxxForm` (lo que entra al `useForm`/servicio de creación).
  - Respuestas del backend: `XxxResponse`, listas paginadas `ListXxxResponse`.
  - Envoltura estándar de API: `Response<T>` (tiene `data?: T`, `description`, etc.).

## Genéricos y reutilizables
- Componentes y helpers reutilizables se tipan con genéricos restringidos. Ejemplos del repo:
  - `FormInput<T extends FieldValues>` usa `Path<T>`, `UseFormRegister<T>`, `FieldErrors<T>`.
  - `AsyncBoundary<T>` con render-prop `children: (data: T) => ReactNode`.
- Deriva tipos cuando puedas en vez de redeclararlos: `z.infer<typeof schema>`,
  `React.ComponentProps<"button">`, `VariantProps<typeof buttonVariants>`.

## Zod + tipos
- El schema es la fuente de verdad de validación; deriva el tipo del form con `z.infer` cuando
  el form y el schema coincidan, o mantén `XxxForm` explícito si difieren (fechas, etc.).
- Mensajes de error de zod en español.

## Servicios
- Tipa el retorno: `Promise<ListUsersResponse>`. Extrae `data.data` de `Response<T>` y lanza
  `new Error("...")` si falta, para que React Query lo trate como error.

## Barrels
- Cada carpeta reexporta su API pública en `index.ts`. Reexporta tipos con `export *` o
  `export type { ... }` según convenga; respeta `import type` en los consumidores.

## Checklist al revisar TS
- [ ] ¿Cero `any`? ¿`import type` para tipos?
- [ ] ¿`interface` para objetos, uniones de constantes en vez de `enum`?
- [ ] ¿Retornos de servicios tipados y validados?
- [ ] ¿Tipos en la ubicación correcta (global vs feature)?
- [ ] ¿`npm run build` (tsc) pasa sin unused/strict errors?
