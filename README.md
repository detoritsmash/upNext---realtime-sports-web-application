# System Architecture - upNext (Realtime Sports Web App)
 
Repo: https://github.com/detoritsmash/upNext---realtime-sports-web-application
Status: Project is still in progress (see notes below on what's built vs planned)
 
## What this project is meant to do
A mobile-first web app where users can see real-time sports scores (live, upcoming,
finished matches), search for teams/leagues, and get live score updates pushed to
them without refreshing the page.
 
## Planned vs Actual Architecture
 
```
                    [ Browser / Mobile Web ]
                             |
              -----------------------------------
              |                                  |
        HTTP requests                     WebSocket connection
     (Axios/Fetch - NOT WIRED UP YET)      (Socket.io - connects, no data pushed yet)
              |                                  |
              v                                  v
       [ React Frontend - Vite ]  <----------  [ Socket.io Server ]
        (Dev B's workspace)                     (part of backend/index.js)
                                                        |
                                                        v
                                          [ Express.js Backend - Dev A's workspace ]
                                             backend/index.js
                                                |         |
                                    -------------         -------------
                                    |                                  |
                          [ Redis (Upstash) ]                [ MongoDB Atlas ]
                          live_matches cache                  connected, but
                          (football only,                     no models/data
                           refreshed every                    stored yet
                           15 min via cron)
                                    ^
                                    |
                        [ SportsService.js - polling job ]
                                    |
                                    v
                     [ External API: api-sports.io (football) ]
```
 
## Layers, explained simply
 
**Frontend (React + Vite, Dev B)**
- Set up with routing (`react-router-dom`) - has 4 routes: Home, Match Details,
  Search, Not Found.
- Right now the pages are just placeholders (e.g. Home just shows "🏠 Home Page").
  No real UI, no data fetching yet.
- There are empty service files (`api.js`, `matches.js`, `socket.js`) clearly meant
  to hold the Axios calls and the Socket.io client connection - just not written yet.
**Backend (Express + Socket.io, Dev A)**
- One Express app (`backend/index.js`) that does three things: serves REST routes,
  runs a Socket.io server, and starts the DB connections.
- Socket.io currently supports clients connecting and joining/leaving a "match room"
  (`join_match` / `leave_match` events) - but nothing is emitted back to those rooms
  yet, so live push updates aren't working end-to-end yet.
- CORS is wide open (`origin: '*'`) since this is still local dev between the two
  devs.
**Caching layer (Redis / Upstash)**
- Used as a short-lived cache for live match data (`live_matches` hash, keyed by
  match ID).
- A cron job (`SportsService.js`) refreshes this from the football API every 15
  minutes.
**Database (MongoDB Atlas)**
- Connected in code (`connectDB()`), but there are no Mongoose models or schemas
  in the repo yet, and nothing is being written to it. It's set up for future use
  (likely for upcoming/finished match history, per the README's planned folder
  structure) but not used yet.
**External data source**
- `v3.football.api-sports.io` - only football is integrated. No basketball or
  other sport has been wired in yet, even though the app is meant to cover
  multiple sports eventually.
## Tech stack
- Backend: Node.js, Express 5, Socket.io, ioredis, Mongoose, node-cron, axios
- Frontend: React (Vite), react-router-dom, Tailwind (per README, config exists)
- Data: Redis (Upstash) for live cache, MongoDB Atlas for persistent storage (planned)
- External API: api-sports.io (football fixtures)
