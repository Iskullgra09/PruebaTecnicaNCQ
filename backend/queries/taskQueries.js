const getTasks = 'SELECT * FROM tareas';
const getTasksFilteredByCollaborator = 'SELECT * FROM tareas WHERE colaborador_id = $1';
const getTasksFilteredByState = 'SELECT * FROM tareas WHERE estado = $1';
const getTasksFilteredByPriority = 'SELECT * FROM tareas WHERE prioridad = $1';
const getTasksFilteredByDate = 'SELECT * FROM tareas WHERE fecha_inicio >= $1 AND fecha_fin <= $2';

module.exports = {
    getTasks,
    getTasksFilteredByCollaborator,
    getTasksFilteredByState,
    getTasksFilteredByPriority,
    getTasksFilteredByDate
}