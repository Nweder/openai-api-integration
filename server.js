import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enkel historik (för demo). Nollställs när servern startas om.
const messages = [
  { role: "system", content: "You are a helpful assistant. Reply clearly and briefly." }
];

app.get("/history", (req, res) => {
  // Skicka utan system-raden till UI om du vill
  res.json({ messages: messages.filter(m => m.role !== "system") });
});

app.post("/ask", async (req, res) => {
  try {
    const userQuestion = (req.body?.question || "").trim();
    if (!userQuestion) return res.status(400).json({ error: "Missing question" });

    // Lägg in user-meddelandet i historiken
    messages.push({ role: "user", content: userQuestion });

    // Skicka HELA historiken till modellen
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // byt vid behov
      messages
    });

    const answer = response.choices?.[0]?.message?.content ?? "No answer.";

    // Spara assistant-svaret
    messages.push({ role: "assistant", content: answer });

    res.json({ answer, messages: messages.filter(m => m.role !== "system") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
