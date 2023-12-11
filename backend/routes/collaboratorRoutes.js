var express = require('express');
var router = express.Router();

const collaboratorController = require('../controllers/collaboratorController');

router.post('/getAllCollaborators', collaboratorController.getCollaborators);

module.exports = router;