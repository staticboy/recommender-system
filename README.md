# Setup
## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- Optionals: [Tailwindcss IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) + [Auto Close HTML Tags](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) + [Auto Rename HTML Tags](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) + [View Git Commit History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Initial setup
1. Pull/Clone from repository
2. Run `npm ci` on git bash to install required libraries

## Run app locally
**Frontend**: cd to client folder (`cd client`) on Git Bash and run `npm run dev`. A local link will be provided in either of these formats 
- `http://127.0.0.1:xxxx`
- `http://localhost:xxxx`.
Any uncommitted frontend changes made locally will reflect on this link.

**Backend**: cd to server folder (`cd server`) on Git Bash and run `npm run start`. Any local api calls will be in this format: `http://localhost:3000/xxxx`. 

To view the database direct, download PostgreSQL and pgAdmin4. Connect to database server to view tables and database functions.

To test any apis locally, download Postman and run the api call there

[How to send a request using Postman](https://learning.postman.com/docs/getting-started/sending-the-first-request/)


**Note: If local deployment doesn't work, run `npm ci` in the respective folder, then deploy again. Deployment requires all libraries to be up to date.** 

# General
## How to format your commit messages

[Guide on how to properly format commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
