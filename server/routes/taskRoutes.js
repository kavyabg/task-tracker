const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth'); // protect routes

// ✅ Create
router.post('/', authMiddleware, async (req, res) => {
  console.log("📥 POST /api/tasks HIT ✅");
  console.log("🧑‍💻 Authenticated user:", req.user);
  console.log("📝 Incoming task data:", req.body);

  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Task creation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Read
router.get('/', authMiddleware, async (req, res) => {
  console.log("📄 GET /api/tasks HIT");

  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Fetch tasks error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update
router.put('/:id', authMiddleware, async (req, res) => {
  console.log(`✏️ PUT /api/tasks/${req.params.id} HIT`);

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error("❌ Update error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete
router.delete('/:id', authMiddleware, async (req, res) => {
  console.log(`🗑️ DELETE /api/tasks/${req.params.id} HIT`);

  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
