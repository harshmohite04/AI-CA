// server.js - MCP AI CA with MongoDB Atlas + Groq

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const axios = require("axios");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if we can't connect to the database
  });

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// ✅ User Schema with Transactions
const transactionSchema = new mongoose.Schema({
  date: String,
  description: String,
  amount: Number,
  type: String,
  category: String
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  transactions: [transactionSchema]
});

const User = mongoose.model("User", userSchema);

// ✅ Save transactions (per user)
app.post("/api/upload/:userId", async (req, res) => {
  const userId = req.params.userId;
  const transactions = req.body;

  console.log("Received request for userId:", userId);
  console.log("Transactions data:", JSON.stringify(transactions, null, 2));

  try {
    // Find user and update transactions array
    const user = await User.findOneAndUpdate(
      { userId },
      { 
        $set: { transactions },
        $setOnInsert: { userId }
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true 
      }
    );
    
    console.log("MongoDB save result:", JSON.stringify(user, null, 2));
    
    // Verify the data was saved
    const savedUser = await User.findOne({ userId });
    console.log("Verification - Retrieved user:", JSON.stringify(savedUser, null, 2));

    res.json({ 
      message: `Saved ${transactions.length} transactions for ${userId}`,
      user: user
    });
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
    res.status(500).json({ 
      error: "Failed to save transactions",
      details: err.message 
    });
  }
});

// ✅ Suggestion from Groq
app.get("/api/suggest/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ userId });
    if (!user || !user.transactions || user.transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this user." });
    }

    const prompt = `
You are a financial advisor AI. Based on these bank transactions, provide financial suggestions:
1. Spending summary by category
2. Unusual patterns
3. Saving tips
4. Investment recommendations

Transactions:
${JSON.stringify(user.transactions, null, 2)}

Respond in plain English.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ advice: reply });
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate advice from Groq." });
  }
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ MCP AI CA Server (MongoDB + Groq) is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
