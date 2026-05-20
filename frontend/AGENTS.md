<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Style guide - Keep it consistent

## Layout

- Do not wrap `App.tsx` in `div` elements. Use the root layout directly.

- The `app/` directory contains the complete routing structure and necessary UI files.

- Do not create `pages/` directory or any files outside of `app/` for pages.

- Use `use-client` when necessary, but avoid cluttering every file with it.

- Do not wrap components in `div` elements if not needed.

## JSX formatting

- Do not add unnecessary `div` wrappers around elements.

- Use self-closing tags (`<ComponentName />`) instead of `<div><ComponentName /></div>` when wrapping the element is not needed for styling or layout.

- Keep JSX clean and avoid unnecessary nesting.

## Components

- Use `src/components` for shared and reusable UI components.

- Use `components/` sub-folders inside `app/` for layout-specific components.

- Do not create component files in `app/` directly. Place them in a `components/` sub-folder within the relevant app directory (e.g., `app/dashboard/components/`).

- Prefer smaller, focused components over large, monolithic ones.

- Use clear, descriptive component names.

## API routes

- All API routes must be placed in the `app/api/` directory, following Next.js 14+ conventions.

- Route handlers should use `export async function GET(request: Request) { ... }`, etc.

- Do not use the deprecated `pages/api/` directory or any files outside of `app/api/`.

## CSS & styling

- Avoid using `className="w-screen h-screen"` or `className="flex min-h-screen flex-col bg-slate-900 text-white antialiased p-8"` in multiple components. Apply these styles once in your global CSS file or layout component.

- Use Tailwind CSS utility classes for styling.

- Keep styling consistent and avoid inline styles where Tailwind classes can be used.

## TypeScript

- Always use TypeScript for new files.

- Infer types when possible to reduce boilerplate.

## File Organization

- Avoid creating duplicate or unused files. For example, if `app/user/actions.ts` is not needed, remove it.

<!-- END:nextjs-agent-rules -->
