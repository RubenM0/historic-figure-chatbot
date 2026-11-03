---
name: JSX Component
description: Add or update a React JSX component in the historic-figure-chatbot Vite app
---

Use this for UI changes in the historic-figure-chatbot app. Do not add a backend or new dependencies.

1. Keep components in `src/` as `.jsx` files. This project is JSX, not TypeScript.
2. Put styles in a CSS, or the main CSS, file file next to the component and import that CSS from the component.
3. Use function components and match the style of the file you are editing.
4. Wire a new component in from `src/App.jsx` unless the user names another parent.
5. Do not edit `package.json`, `vite.config.js`, or the README for a component change.
6. After JSX changes, run `npm run lint`.
7. Always say which files you have modified
