# GitHub setup guide

Step-by-step for publishing this project on GitHub.

---

## Before you push

- Install [Git](https://git-scm.com/downloads) if you do not have it.
- Create a free [GitHub](https://github.com) account.
- This folder should already have Git initialized and an initial commit (if you ran the setup from the maintainer).

---

## 1. Create an empty repository on GitHub

1. Log in to GitHub.
2. Click **+** → **New repository**.
3. Repository name example: `ds2-sotfs-progression-engine`
4. Description example: `Fan-made 100% checklist for Dark Souls 2 Scholar of the First Sin`
5. Choose **Public** (so friends can clone it) or **Private**.
6. Leave **Add a README**, **Add .gitignore**, and **Choose a license** **unchecked**.
7. Click **Create repository**.

GitHub will show you commands — use the ones below instead if this repo already has commits.

---

## 2. Connect your local folder to GitHub

Open PowerShell or Command Prompt in the project folder (`DS2 guide`).

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

If GitHub asks you to sign in, use a **Personal Access Token** as the password (not your GitHub password). Create one under: GitHub → Settings → Developer settings → Personal access tokens.

---

## 3. If the remote already exists

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 4. Everyday Git commands

After you change files:

```bash
git status
git add .
git commit -m "Describe what you changed"
git push
```

---

## 5. What is not uploaded (on purpose)

See `.gitignore`. Notable exclusions:

- `node_modules/` — too large; users run `npm install`
- `DS2 guide - Copy/` — duplicate backup folder
- `*.pdf` — large; walkthrough is in the `.md` file
- `/ds2_progress.json` at project root — personal save file

---

## 6. GitHub Pages (free website)

1. Push the repo to GitHub.
2. In the repo on GitHub: **Settings** → **Pages**.
3. Source: **GitHub Actions** or build locally and deploy `ds2-engine/dist`.

Simple manual deploy after `npm run build` in `ds2-engine`:

- Use the **upload artifact** flow on Netlify drag-and-drop, or
- Add a GitHub Actions workflow later to build on each push.

---

## 7. Let friends download it

Share the repo URL. They click **Code** → **Download ZIP**, or:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm start
```

Then open http://localhost:5173.
