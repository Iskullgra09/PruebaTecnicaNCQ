const getTasks = 'SELECT * FROM tareas ORDER BY id ASC';
const getTasksFilteredByCollaborator = 'SELECT * FROM tareas WHERE colaborador_id = $1';
const getTasksFilteredByState = 'SELECT * FROM tareas WHERE estado = $1';
const getTasksFilteredByPriority = 'SELECT * FROM tareas WHERE prioridad = $1';
const getTasksFilteredByDate = 'SELECT * FROM tareas WHERE fecha_inicio >= $1 AND fecha_fin <= $2';
const insertTask = 'INSERT INTO tareas(descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const updateTask = 'UPDATE tareas SET descripcion = $1, colaborador_id = $2, estado = $3, prioridad = $4, fecha_inicio = $5, fecha_fin = $6, notas = $7 WHERE id = $8';

module.exports = {
    getTasks,
    getTasksFilteredByCollaborator,
    getTasksFilteredByState,
    getTasksFilteredByPriority,
    getTasksFilteredByDate,
    insertTask,
    updateTask,
}