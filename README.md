# RentBack- (منصة رنت باك)

Interactive rental marketplace platform with user identity verification, AI product inspection, secure booking, delivery tracking, and damage protection.

---

## 📋 Prerequisites

Make sure the following software is installed on your computer:

1. **Git**: [Download Git](https://git-scm.com/)
2. **Node.js** (v18 or higher recommended): [Download Node.js](https://nodejs.org/) (npm comes bundled with it)

*(Optional: You can also use [Bun](https://bun.sh) instead of npm)*

---

## 🚀 Setup & Installation Guide

Follow these steps to set up and run the system on your PC (Mac, Windows, or Linux):

### 1. Clone the repository
Open your terminal (macOS/Linux) or Command Prompt / PowerShell / Git Bash (Windows) and run:
```bash
git clone https://github.com/Mariam-Hany908/RentBack-.git
```

### 2. Navigate into the project folder
> ⚠️ **Important:** You must enter the project directory before running npm commands:
```bash
cd RentBack-
```

### 3. Install dependencies
Install all required packages:
```bash
npm install
```
*(If using Bun: `bun install`)*

### 4. Create the environment file
Copy the `.env.example` file to create your local `.env`:

- **macOS / Linux / Git Bash:**
  ```bash
  cp .env.example .env
  ```
- **Windows Command Prompt:**
  ```cmd
  copy .env.example .env
  ```
- **Windows PowerShell:**
  ```powershell
  Copy-Item .env.example .env
  ```

*(Optional: You can add your `GEMINI_API_KEY` inside `.env` if using Gemini AI features).*

### 5. Start the development server
```bash
npm run dev
```

### 6. Open the system in your browser
Once Vite starts, open your browser and navigate to:
```
http://localhost:3000
```

---

## 🛠️ Available Scripts

- `npm run dev`: Runs the application in development mode with Hot Module Replacement (HMR) on port 3000.
- `npm run build`: Compiles and bundles TypeScript and assets for production into the `dist/` directory.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Checks TypeScript types without emitting code.

---

## ❓ Common Issues & Troubleshooting

1. **`npm error Missing script: "dev"` or `Missing script: "start"`**:
   - Cause: You ran the command outside the project folder.
   - Fix: Ensure you run `cd RentBack-` first.

2. **Port 3000 is already in use**:
   - Cause: Another application is using port 3000.
   - Fix: Stop the process using port 3000 or run Vite on a different port:
     ```bash
     npx vite --port 3001
     ```

3. **Node version mismatch**:
   - Cause: Node.js version is too old.
   - Fix: Update Node.js to version 18.x or 20.x+ from [nodejs.org](https://nodejs.org/).
