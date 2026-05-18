# Dark Souls 2 — 100% Progression Engine

A free checklist app for **Dark Souls 2: Scholar of the First Sin**. Use it on your phone or PC while you play. Tick off items, track quests, follow a build guide, and see what you might miss.

This is a **fan-made tool**. It is not made by or connected to FromSoftware or Bandai Namco.

---

## What you need on your computer

1. **Node.js** (version 18 or newer)  
   Download from [https://nodejs.org](https://nodejs.org) if you do not have it. Pick the “LTS” installer.

2. **This project folder**  
   Either download a ZIP from GitHub, or clone the repo (see below).

You do **not** need an account inside the app. It runs on your machine in the browser.

---

## How to start the app (easiest way)

Open a terminal (Command Prompt or PowerShell on Windows, Terminal on Mac/Linux).

Go into the project folder, then run:

```bash
npm start
```

The first time, this installs a few packages (may take a minute). Then it opens a local website.

Open your browser and go to:

**http://localhost:5173**

To stop the app, press `Ctrl+C` in the terminal.

### If `npm start` does not work

Try these steps one at a time:

```bash
cd ds2-engine
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## What the app does

| Tab | What it is for |
|-----|----------------|
| **Overview** | How far you are through the run, warnings, quick links |
| **Areas** | Checklists for each area in walkthrough order |
| **Quests** | NPC questlines (Lucatiel, Benhart, and others) |
| **Trackers** | Gestures, covenants, Estus shards, bone dust |
| **Build** | Level-up roadmaps and gear lists (many builds to pick from) |
| **Farming** | Where to farm souls and upgrade materials |
| **Items** | Boss souls, secret walls, shop unlocks, item search |
| **Enemies** | Weaknesses and drop info |
| **Simulator** | Try stats and gear on paper |
| **Get OP** | Extra tips (paths, leveling, etc.) |

Checking a box in an **area** can also tick related **quest** steps automatically.

---

## Where your progress is saved

- Progress is stored **in your browser** on this computer (not on a server).
- Use **Export** in the top bar to download a backup file (JSON).
- Use **Import** to load a backup or move your save to another PC.
- You can create **multiple profiles** (e.g. one per character) from the profile menu.

If you clear browser data for this site, you can lose progress unless you exported a backup.

---

## Put this project on GitHub (for the owner)

If you are setting up the repo for the first time:

1. Create a new empty repository on [GitHub](https://github.com/new).  
   Name idea: `ds2-sotfs-progression-engine`.  
   Do **not** add a README or .gitignore on GitHub (this project already has them).

2. In a terminal, from this folder:

```bash
git init
git add .
git commit -m "Initial commit: DS2 SotFS progression engine"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub user and repo name.

More detail: see [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md).

---

## Share the app online (optional)

Anyone can run it locally with the steps above. To host a public copy:

```bash
cd ds2-engine
npm install
npm run build
```

Upload the `ds2-engine/dist` folder to [GitHub Pages](https://pages.github.com), Netlify, or Vercel as a static site. No API keys are required.

---

## Project layout (short)

| Folder / file | Purpose |
|---------------|---------|
| `ds2-engine/` | The web app (main code) |
| `DS2_SotFS_100_Percent_Walkthrough.md` | Full walkthrough text |
| `DS2_SOTFS_ENGINE_CONTEXT.md` | Notes for developers |
| `Builds_Guide/` | Extra build comparison notes |

---

## Problems?

| Problem | What to try |
|---------|-------------|
| `npm` is not recognized | Install Node.js and restart the terminal |
| Port 5173 is busy | Close other dev servers, or restart the PC |
| Blank page | Hard-refresh the browser (`Ctrl+F5`) |
| Progress disappeared | Import your last exported JSON backup |

---

## License and game content

Dark Souls 2 and all related names belong to their owners. This project is for personal fan use. Do not sell it or claim it is official.
