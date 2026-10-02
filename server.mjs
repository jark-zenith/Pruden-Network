import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { randomUUID } from 'node:crypto'

const PORT = Number(process.env.PORT || 8787)
const DIST = join(process.cwd(), 'dist')
const nodes = new Map()
const tokens = new Map()

const json = (res, status, data) => { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(data)) }
const readBody = async req => { let raw=''; for await (const chunk of req) raw += chunk; return raw ? JSON.parse(raw) : {} }
const publicNodes = () => [...nodes.values()].map(({token, clients, ...node}) => node)
const broadcast = (event, payload) => { const data = \`event: \${event}\\ndata: \${JSON.stringify(payload)}\\n\\n\`; for (const node of nodes.values()) for (const client of node.clients) client.write(data) }
const auth = req => { const header=req.headers.authorization||''; const token=header.startsWith('Bearer ')?header.slice(7):''; return tokens.get(token) }
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'}

const server = createServer(async (req,res) => {
  try {
    const url = new URL(req.url, \`http://\${req.headers.host}\`)
    if (url.pathname === '/api/health') return json(res,200,{ok:true,service:'PRUDEN Network Core',version:'0.1.0',nodes:nodes.size,uptime:Math.round(process.uptime())})

    if (url.pathname === '/api/nodes/register' && req.method === 'POST') {
      const input=await readBody(req); const name=String(input.name||'').trim().slice(0,48); const type=String(input.type||'WEB').trim().slice(0,24)
      if(!name) return json(res,400,{error:'Node name is required'})
      const nodeId=\`PN-\${randomUUID().split('-')[0].toUpperCase()}\`; const token=randomUUID().replaceAll('-','')
      const node={nodeId,name,type,status:'ONLINE',connectedAt:new Date().toISOString(),lastSeen:new Date().toISOString(),clients:new Set(),token}
      nodes.set(nodeId,node); tokens.set(token,node); broadcast('nodes',publicNodes())
      return json(res,201,{nodeId,token,node:publicNodes().find(n=>n.nodeId===nodeId)})
    }

    if (url.pathname === '/api/nodes' && req.method === 'GET') {
      const node=auth(req); if(!node) return json(res,401,{error:'PRUDEN node authentication required'})
      node.lastSeen=new Date().toISOString(); return json(res,200,{nodes:publicNodes(),self:{nodeId:node.nodeId,name:node.name}})
    }

    if (url.pathname === '/api/messages' && req.method === 'POST') {
      const sender=auth(req); if(!sender) return json(res,401,{error:'PRUDEN node authentication required'})
      const input=await readBody(req); const message=String(input.message||'').trim().slice(0,1000); const to=String(input.to||'NETWORK')
      if(!message) return json(res,400,{error:'Message is required'})
      const packet={id:randomUUID(),from:sender.nodeId,fromName:sender.name,to,message,timestamp:new Date().toISOString()}
      if(to==='NETWORK') broadcast('message',packet)
      else { const recipient=nodes.get(to); if(!recipient) return json(res,404,{error:'Target node is not online'}); for(const client of recipient.clients) client.write(\`event: message\\ndata: \${JSON.stringify(packet)}\\n\\n\`) }
      return json(res,202,{delivered:true,packet})
    }

    if (url.pathname === '/api/events' && req.method === 'GET') {
      const token=url.searchParams.get('token')||''; const node=tokens.get(token); if(!node) return json(res,401,{error:'PRUDEN node authentication required'})
      node.status='ONLINE'; node.lastSeen=new Date().toISOString()
      res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive','X-Accel-Buffering':'no'})
      node.clients.add(res); res.write(\`event: ready\\ndata: \${JSON.stringify({nodeId:node.nodeId,network:'PRUDEN',status:'ONLINE'})}\\n\\n\`); broadcast('nodes',publicNodes())
      const heartbeat=setInterval(()=>{try{res.write(': heartbeat\\n\\n')}catch{}},20000)
      req.on('close',()=>{clearInterval(heartbeat);node.clients.delete(res);node.status='AWAY';node.lastSeen=new Date().toISOString();broadcast('nodes',publicNodes())})
      return
    }

    if (url.pathname === '/api/nodes/disconnect' && req.method === 'POST') {
      const node=auth(req); if(!node) return json(res,401,{error:'PRUDEN node authentication required'})
      node.status='OFFLINE'; node.lastSeen=new Date().toISOString(); broadcast('nodes',publicNodes()); return json(res,200,{disconnected:true})
    }

    let filePath=normalize(join(DIST,url.pathname==='/'?'index.html':url.pathname)); if(!filePath.startsWith(DIST)) filePath=join(DIST,'index.html')
    try { await stat(filePath) } catch { filePath=join(DIST,'index.html') }
    const file=await readFile(filePath); res.writeHead(200,{'Content-Type':mime[extname(filePath)]||'application/octet-stream'}); res.end(file)
  } catch(error) { json(res,500,{error:'PRUDEN core error',detail:error instanceof Error?error.message:'Unknown error'}) }
})
server.listen(PORT,()=>console.log(\`PRUDEN Network Core listening on \${PORT}\`))