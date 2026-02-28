
import express from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "wfh-toolkit-secret-key-123";

// In-memory "database"
const users: any[] = [];
const userProgress: Record<string, any> = {};

app.use(express.json());
app.use(cookieParser());

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ user: { id: newUser.id, email: newUser.email } });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ user: { id: user.id, email: user.email } });
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Get Current User
app.get("/api/auth/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ user: null });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.json({ user: null });
    res.json({ user });
  });
});

// Get Progress
app.get("/api/progress", authenticateToken, (req: any, res) => {
  const progress = userProgress[req.user.id] || {};
  res.json(progress);
});

// Save Progress
app.post("/api/progress", authenticateToken, (req: any, res) => {
  userProgress[req.user.id] = req.body;
  res.json({ status: "ok" });
});

// --- Vite Integration ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
