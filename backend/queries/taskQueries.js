const getTasks = 'SELECT * FROM tareas';
const getTasksFilteredByCollaborator = 'SELECT * FROM tareas WHERE colaborador_id = $1';
const getTasksFilteredByState = 'SELECT * FROM tareas WHERE estado = $1';
const getTasksFilteredByPriority = 'SELECT * FROM tareas WHERE prioridad = $1';

module.exports = {
    getTasks,
    getTasksFilteredByCollaborator,
    getTasksFilteredByState,
    getTasksFilteredByPriority,
}