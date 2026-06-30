<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:typescript-conventions -->
# TypeScript & Code Conventions

## Strict mode is ON
- `tsconfig.json` has `"strict": true` — no implicit any, strict null checks, strict function types, etc.
- The `any` type is **forbidden** (enforced by `@typescript-eslint/no-explicit-any: error`)

## Commands
- `npm run lint` — run ESLint (includes `@typescript-eslint` rules)
- `npm run typecheck` — run `tsc --noEmit` for full project type check
- `npm run build` — build + lint + typecheck

## Pull Requests
- CI (GitHub Actions) runs lint + typecheck on every push/PR to main branch
- All warnings/errors must be resolved before merging
<!-- END:typescript-conventions -->
