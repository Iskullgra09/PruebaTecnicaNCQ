var express = require('express');
var router = express.Router();

const taskController = require('../controllers/taskController.js');

router.post('/getTasksFiltered', taskController.getTasksFiltered);

module.exports = router;