const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");


// ➤ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const task = new Task({
      title,
      priority,
      dueDate,
      userId: req.user.id
    });

    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ GET USER TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;