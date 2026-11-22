# Agents must follow these rules when working on the historic chatbot assignment

This file is shared with the repository. Any agent used by anyone working in this project must follow it. Local skills named below may be missing. If they cannot be loaded, follow this file anyway.

Work in this repository. `package.json` must be named `historic-figure-chatbot`. If it is not, stop. The historic figure is Julius Caesar.

There is NO TypeScript. Do not add `.ts` or `.tsx` files, a `tsconfig`, or convert any file. `@types/react` and `@types/react-dom` are leftover Vite template packages. They do not make this a TypeScript project. Do not write types, and DO NOT add more `@types` packages.

The backend exists so DO NOT create another one. Each part may edit only its selected area. If a task needs a file outside that area, stop and say which part must change it.

## Stack

- Frontend: JSX + React + Vite. Components are `.jsx`. Entry is `index.html` → `src/main.jsx`.
- UI: plain CSS next to each component. Spectral and the variables in `src/index.css` are the visual base. No CSS framework, no second font, no design system.
- Backend: JavaScript + Express, CommonJS (`require`), in `myserver/`. Entry is `myserver/index.js` on port `3000`.

## Skills and subagents

Load the matching skill before editing. Naming a skill here does not mean its files are in the repo. `.agents/` and `.claude/` stay local for now unless asked to be pushed.

- `historic-figure-chatbot` — assignment skill at `.agents/skills/historic-figure-chatbot/` (linked from `.opencode/skills/` and `.claude/skills/`). Load it before editing this app's page, chat, bio, styles, or public assets. It does not edit `myserver/`.
- `react-vite-ui` — general React + Vite interface skill. Load it for frontend or UI work on this assignment. It does not edit the backend.
- `jsx-component` — superseded. Do not use. Rules moved to `historic-figure-chatbot` and `react-vite-ui`.
- `run-app` — install, run, lint, or build the Vite app from this directory. It does not start the Express server.
- `frontend` — subagent for this assignment's React UI. It loads `react-vite-ui`, and also `historic-figure-chatbot` when the package name matches. It may edit only the frontend and UI areas below, and only the area the task needs.

## Areas

| Part | May edit | Must not edit |
| --- | --- | --- |
| Frontend | `src/*.jsx`, `index.html` | `src/*.css`, `public/`, `myserver/`, root `package.json`, lockfiles, `vite.config.js` |
| UI | `src/*.css`, `public/` | `src/*.jsx`, `index.html`, `myserver/`, root `package.json`, lockfiles, `vite.config.js` |
| Backend | `myserver/` | `src/`, `index.html`, `public/`, root `package.json`, lockfiles, `vite.config.js` |

`vite.config.js` already proxies `/api` to `http://localhost:3000`. Leave it alone unless the user asks to change that proxy.

## Frontend rules

Frontend is JSX + React + Vite. Write `.jsx` only. Use function components, and match the naming, imports, and quotes of the file you are editing.

- `src/App.jsx` owns the message list and the `fetch` to `/api/chat`.
- `src/ChatWindow.jsx` renders messages.
- `src/Composer.jsx` keeps the draft, clears it on submit, and calls `onSend`. It does not store messages and it does not call the API.
- Wire a new component in from `src/App.jsx` unless the user names another parent. If that component needs a new CSS file, stop and leave that file to the UI part.
- The browser calls `/api/chat`, not `http://localhost:3000`.
- Do not invent a new request or response shape. Follow the contract in Backend rules. If the task needs a new one, stop and name the decision.
- Do not add a dependency or a router.
- After JSX changes, run `npm run lint` from this directory, by itself. Do not start `npm run dev` unless the user asked to run the app.
- Node.js 20.19+ or 22.12+ is required. Run `npm install` when `node_modules` is missing or `package-lock.json` changed. Leave `node_modules` and `dist` out of the repo.

## UI rules

UI is plain CSS and files in `public/`. Reuse the Spectral font and the variables in `src/index.css`. Add a variable only when an existing one does not fit.

- Keep a component's CSS next to that component. `App.jsx` uses `App.css`, `ChatWindow.jsx` uses `ChatWindow.css`, and `Composer.jsx` uses `Composer.css`.
- Files in `public/` are served from `/`. `public/romeart.jpeg` is `/romeart.jpeg`, not `/public/romeart.jpeg`. The favicon is `/images/favicon.jpg`.
- Do not change state, effects, event handlers, or the API call. Those belong to the frontend part.
- Do not introduce a design system, a CSS framework, or a second font unless asked.
- After CSS changes, run `npm run lint` from this directory, by itself.

## Backend rules

Backend is JavaScript + Express in `myserver/` only. There is absolutely no TypeScript here either.

- `myserver/index.js` listens on port `3000` and uses `express.json()`.
- Contract: `POST /api/chat` with `{ "message": string }`. A missing message returns `400` and `{ "error": "Message required" }`. A valid message returns `{ "reply": string }`.
- Do not change that request or response shape unless the user asks. The frontend already depends on it. If it must change, say so before editing, and do not edit the frontend yourself.
- Do not add a dependency unless the user asks.
- There is no start script. From `myserver/`, run `node index.js`.
