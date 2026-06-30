const express = require('express');
const router = express.Router();
const {
  getTasks,
  getStats,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  deleteCompleted,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// all task routes are protected
router.use(protect);

router.get('/stats', getStats);
router.delete('/completed', deleteCompleted);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTask);

module.exports = router;
