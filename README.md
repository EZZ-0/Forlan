# Dark Souls 2 — 100% Progression Engine

A free checklist you open in your web browser while you play **Dark Souls 2: Scholar of the First Sin**.

Tick off items, track quests, follow a build guide, and see what you might miss.

**Fan-made tool** — not official, not made by FromSoftware or Bandai Namco.

**Get the project:** [https://github.com/EZZ-0/Forlan](https://github.com/EZZ-0/Forlan)

---

## Before you start (one-time setup)

You need two things on your computer:

### 1. Install Node.js (lets the app run)

1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the big green **LTS** download button
3. Run the installer — keep clicking **Next** until it finishes

You only do this once.

### 2. Download this project onto your computer

Pick **one** way below.

#### Way A — Download ZIP (easiest, no extra programs)

1. Open [https://github.com/EZZ-0/Forlan](https://github.com/EZZ-0/Forlan)
2. Click the green **Code** button
3. Click **Download ZIP**
4. Unzip the file (right-click → **Extract All** on Windows)
5. Remember where the folder is — it will be called **Forlan**

#### Way B — Using Git (if you already use Git)

Open **Command Prompt** or **PowerShell**, then type these lines **one at a time**. Press **Enter** after each line and wait until it finishes.

```
git clone https://github.com/EZZ-0/Forlan.git
```

```
cd Forlan
```

That creates a **Forlan** folder with everything inside.

---

## How to open the engine (first time)

### Step 1 — Open a terminal

**Windows**

1. Press the **Windows** key
2. Type `cmd` or `powershell`
3. Press **Enter**

**Mac**

1. Open **Terminal** from Applications → Utilities

### Step 2 — Go into the project folder

Type this (change the path if your folder is somewhere else), then press **Enter**:

**Windows example** (if you unzipped to Downloads):

```
cd C:\Users\YourName\Downloads\Forlan
```

**Tip:** In File Explorer, open your **Forlan** folder, click the address bar at the top, copy the path, then type `cd ` and paste it.

### Step 3 — Start the app

Type this and press **Enter**:

```
npm start
```

- The **first time**, it may take 1–2 minutes (it is downloading small support files). That is normal.
- When you see a line like `Local: http://localhost:5173`, it is ready.

### Step 4 — Open it in your browser

1. Open **Chrome**, **Edge**, or **Firefox**
2. In the address bar, type:

```
http://localhost:5173
```

3. Press **Enter**

You should see the DS2 checklist app. Leave the black terminal window open while you play.

### Step 5 — When you are done playing

1. Click the terminal window
2. Press **Ctrl** and **C** at the same time

That stops the app. Your checkboxes are still saved in the browser for next time.

---

## How to open it again (next day, next session)

You do **not** need to download everything again.

1. Open terminal (same as before)
2. Go to the **Forlan** folder again:

```
cd C:\Users\YourName\Downloads\Forlan
```

(use your real path)

3. Start it:

```
npm start
```

4. Browser → `http://localhost:5173`

That is it.

---

## Where your progress is saved

- Your checkmarks stay **in your browser** on this computer.
- Click **Export** in the app (top bar) to save a backup file to your PC.
- Click **Import** to load that backup (useful if you change computers).
- You can make more than one profile (different characters) from the profile menu in the app.

If you delete browser data for this site, you can lose progress — so **Export** once in a while if you care about your run.

---

## What each tab is for

| Tab | What it does |
|-----|----------------|
| **Overview** | Overall progress and warnings |
| **Areas** | Checklists for each area |
| **Quests** | NPC questlines |
| **Trackers** | Gestures, covenants, Estus, bone dust |
| **Build** | Pick one of **21 builds**, level roadmap, gear checklist (progress saved per build) |
| **Farming** | Soul and material farming spots |
| **Items** | Boss souls, secrets, shops |
| **Enemies** | Weaknesses and drops |
| **Simulator** | Try stats and gear |
| **Get OP** | Extra tips |

---

## Switching builds mid-run

1. Open the **Build** tab.
2. Use **Choose your build** at the top.
3. Your **area checkboxes** stay the same (same playthrough).
4. **Level roadmap** ticks are saved **separately for each build** — switch back anytime.

Use **Export** in the top bar to back up everything.

---

## Quick help

| Something went wrong | Try this |
|----------------------|----------|
| `npm` is not recognized | Install Node.js from [nodejs.org](https://nodejs.org), close the terminal, open a new one, try again |
| Page will not load | Make sure `npm start` is still running and you typed `http://localhost:5173` |
| Blank or stuck page | Refresh the browser (Ctrl+F5) |
| Lost my checkmarks | Use **Import** if you exported a backup before |

---

## For developers

Technical notes and GitHub publishing help:

- [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)
- [DS2_SOTFS_ENGINE_CONTEXT.md](DS2_SOTFS_ENGINE_CONTEXT.md)

---

## Disclaimer

**Node.js:** If commands like `npm` do nothing or say “not recognized” right after you installed Node.js, close every terminal window, open a fresh one, and try again. If it still fails, restart your computer once, then try `npm start` again.

**Game content:** Dark Souls 2 and related names belong to their owners. This project is for personal fan use only. Do not sell it or say it is an official product.
