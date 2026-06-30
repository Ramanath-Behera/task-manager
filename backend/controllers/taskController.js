const Task = require('../models/Task');

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { status, search, sort } = req.query;

    // build the filter object
    let filter = { user: req.user.id };

    if (status === 'completed') filter.completed = true;
    if (status === 'pending') filter.completed = false;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // build sort option
    let sortOption = { createdAt: -1 }; // default: newest first

    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'priority') {
      // High > Medium > Low — we handle this manually after fetching
      sortOption = { createdAt: -1 };
    }
    if (sort === 'dueDate') sortOption = { dueDate: 1 };

    let tasks = await Task.find(filter).sort(sortOption);

    // manual sort by priority if needed
    if (sort === 'priority') {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      tasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.log('Get tasks error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// GET /api/tasks/stats
const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ user: userId });
    const completed = await Task.countDocuments({ user: userId, completed: true });
    const pending = await Task.countDocuments({ user: userId, completed: false });

    // overdue = not completed and due date is in the past
    const overdue = await Task.countDocuments({
      user: userId,
      completed: false,
      dueDate: { $lt: new Date() },
    });

    res.status(200).json({ total, completed, pending, overdue });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      priority: priority || 'Medium',
      dueDate: dueDate || null,
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    console.log('Create task error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // make sure this task belongs to the logged in user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const { title, description, priority, dueDate, completed } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;
    task.completed = completed ?? task.completed;

    await task.save();

    res.status(200).json({ message: 'Task updated', task });
  } catch (error) {
    console.log('Update task error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// PATCH /api/tasks/:id/toggle
const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ message: 'Task toggled', task });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// DELETE /api/tasks/completed
const deleteCompleted = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id, completed: true });
    res.status(200).json({ message: 'Completed tasks deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getTasks, getStats, createTask, updateTask, deleteTask, toggleTask, deleteCompleted };
