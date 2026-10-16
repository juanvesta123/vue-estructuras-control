// Consola local de evidencias: salida de procesos PowerShell reales, solo lectura.
import http from 'node:http'
import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { WebSocketServer } from 'ws'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = {
  if: 'src/views/IfView.vue', show: 'src/views/ShowView.vue',
  for: 'src/views/ForView.vue', key: 'src/views/KeyView.vue',
  router: 'src/router/index.js', nav: 'src/App.vue',
  build: '.github/workflows/deploy.yml', config: 'package.json',
  spa: 'tests/navigation.test.js', motion: 'src/components/HeroDiagram.vue',
}
const server = http.createServer(async (req, res) => {
  const routes = {
    '/': ['scripts/evidence-terminal.html', 'text/html; charset=utf-8'],
    '/xterm.js': ['node_modules/@xterm/xterm/lib/xterm.js', 'text/javascript'],
    '/xterm.css': ['node_modules/@xterm/xterm/css/xterm.css', 'text/css'],
    '/fit.js': ['node_modules/@xterm/addon-fit/lib/addon-fit.js', 'text/javascript'],
  }
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname
  if (!routes[pathname]) { res.writeHead(404); res.end(); return }
  try {
    const [file, type] = routes[pathname]
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' })
    res.end(await readFile(path.join(root, file)))
  } catch { res.writeHead(500); res.end('No se pudo abrir el recurso local.') }
})
const wss = new WebSocketServer({ server, verifyClient: ({ origin }) => origin === 'http://127.0.0.1:4182' })
wss.on('connection', socket => {
  let process
  socket.on('message', async data => {
    let request
    try { request = JSON.parse(data) } catch { return }
    const file = files[request.file]
    if (!file || process) return
    const content = (await readFile(path.join(root, file), 'utf8')).split(/\r?\n/)
    const templateStart = content.findIndex(line => line.trim() === '<template>')
    let skip = 0, count = 26
    if (['if', 'show', 'for', 'key'].includes(request.file) && request.part !== 'state') {
      const directive = { if: 'v-if=', show: 'v-show=', for: 'v-for=', key: 'v-bind:key=' }[request.file]
      const directiveLine = content.findIndex((line, index) => index > templateStart && line.includes(directive))
      skip = Math.max(0, directiveLine - 5)
    }
    if (request.file === 'nav') skip = Math.max(0, content.findIndex(line => line.includes('<nav ')))
    if (request.file === 'build') { skip = 16; count = 24 }
    if (request.file === 'spa') { skip = Math.max(0, content.findIndex(line => line.includes('for (const')) - 2); count = 24 }
    if (request.part === 'next') skip += 26
    const command = `Get-Content -LiteralPath '${file}' -Encoding UTF8 | Select-Object -Skip ${skip} -First ${count}`
    socket.send(JSON.stringify({ type: 'start', command, path: root, file, skip, count }))
    // La cadena procede exclusivamente de la lista cerrada de archivos, nunca del cliente.
    const encoded = Buffer.from(`$ProgressPreference = 'SilentlyContinue'; [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); ${command}`, 'utf16le').toString('base64')
    process = spawn('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], { cwd: root, windowsHide: true })
    const stream = (chunk, type = 'stdout') => socket.readyState === 1 && socket.send(JSON.stringify({ type, text: chunk.toString('utf8') }))
    process.stdout.on('data', chunk => stream(chunk))
    process.stderr.on('data', chunk => stream(chunk, 'stderr'))
    process.on('close', code => { process = null; if (socket.readyState === 1) socket.send(JSON.stringify({ type: 'end', code })) })
    process.on('error', error => { process = null; if(socket.readyState === 1)socket.send(JSON.stringify({ type:'stderr', text:error.message })) })
  })
  socket.on('close', () => process?.kill())
})
server.listen(4182, '127.0.0.1', () => console.log('Terminal real de evidencias: http://127.0.0.1:4182/'))
