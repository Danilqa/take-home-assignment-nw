import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'
import { route } from './routes.ts'

const port = Number(process.env.PORT ?? 3000)

// The built web app. In development Vite serves the app and proxies `/api` here.
// `dev` looks a file up on each request, so the server also starts before the first build.
const serveWebApp = sirv(fileURLToPath(new URL('../web-app/dist', import.meta.url)), {
  dev: true,
})

createServer((request, response) => {
  serveWebApp(request, response, () => {
    // A path such as `//` is not a valid relative URL, so the origin is prepended.
    const { pathname } = new URL(`http://localhost${request.url ?? '/'}`)
    const { status, body } = route(request.method, pathname)

    response
      .writeHead(status, { 'content-type': 'application/json' })
      .end(JSON.stringify(body))
  })
}).listen(port, () => {
  console.info(`Server listening on http://localhost:${String(port)}`)
})
