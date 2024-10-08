const express = require('express');
const TaskController = require('../controladores/controller');

const router = express.Router();

router.get('/tasks', TaskController.listarTasks);
router.get('/tasks/:id', TaskController.listarTaskPorId);
router.post('/tasks', TaskController.cadastrarTask);
router.put('/tasks/:id', TaskController.atualizarTask);
router.delete('/tasks/:id', TaskController.excluirTask);

module.exports = router;