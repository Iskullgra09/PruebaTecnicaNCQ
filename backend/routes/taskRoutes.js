var express = require('express');
var router = express.Router();

const taskController = require('../controllers/taskController.js');

router.post('/getTasks', taskController.getTasks);
router.post('/getTasksFiltered', taskController.getTasksFiltered);

module.exports = router;