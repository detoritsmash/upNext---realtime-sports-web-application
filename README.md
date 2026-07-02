# upNext---realtime-sports-web-application
this is a web application designed for mobile phones where users can see and get updates on real time sports data.

# the file architecture
```text 
upnext-sports-app/
├── backend/                  # Dev A's Workspace
│   ├── src/
│   │   ├── config/           # Database & Redis initializers
│   │   ├── controllers/      # Route handler logic
│   │   ├── models/           # MongoDB/PostgreSQL schemas
│   │   ├── routes/           # API Endpoints (/api/fixtures)
│   │   └── services/         # Third-party API polling loops
│   ├── .env                  # Environment tokens (Git ignored)
│   ├── index.js              # Entry point & WebSocket setup
│   └── package.json
│
└── frontend/                 # Dev B's Workspace
    ├── public/
    ├── src/
    │   ├── assets/           # Logos, custom SVG icons
    │   ├── components/       # Reusable UI (MatchCard, BottomNav)
    │   ├── views/            # Dashboard tabs (Live, Schedules)
    │   ├── App.jsx           # Main state controller & Socket init
    │   ├── main.jsx
    │   └── index.css         # Tailwind directives
    ├── tailwind.config.js    # Tailwind layout overrides
    ├── vite.config.js        # Build configuration
    └── package.json
```