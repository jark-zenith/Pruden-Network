# PRUDEN Network

PRUDEN Network is the software-network foundation for the PRUDEN technology ecosystem.

## v0.1 — Network Core

The first operational layer includes:

- node enrollment and unique PRUDEN node identity
- token-authenticated API access
- live node presence
- server-sent event (SSE) signaling
- network broadcast messaging
- targeted node messaging
- network health endpoint
- cinematic PRUDEN console
- PRUDEN P-mark branding

## Run locally

\`\`\`
npm install
npm run build
npm start
\`\`\`

Then open \`http://localhost:8787\`.

For frontend development, run \`npm run dev\` and keep the core server running on port 8787. Set \`VITE_API_URL\` when the core is hosted elsewhere.

## Architecture

\`\`\`
PRUDEN NODE
    │ HTTPS
    ▼
PRUDEN NETWORK CORE
 ┌──┼──────────────┐
 │  │              │
API NODE REGISTRY SIGNAL BUS
 │  │              │
 └──┴──────────────┘
        │
 Future: persistent identity, PostgreSQL, Redis,
 WebSocket transport, native device agents,
 encrypted device tunnels and hardware gateways.
\`\`\`

## v0.1 limitation

The node registry is currently in-memory. Restarting the core clears enrolled nodes and tokens. This is intentional for the first network proof and is not yet production-grade identity storage.

v0.1 operates over the existing Internet. It is not an ISP and does not provide independent Internet access.
