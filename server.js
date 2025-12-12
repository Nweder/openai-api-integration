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

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /ask – browser sends { question: "..." }
app.post("/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question || "";

    const response = await client.responses.create({
      model: "gpt-4o-mini", 
      input: userQuestion
    });

    const answer = response.output[0].content[0].text;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
