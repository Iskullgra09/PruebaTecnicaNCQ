const getTasks = 'SELECT * FROM tareas ORDER BY fecha_inicio ASC';
const getTasksFilteredByCollaborator = 'SELECT * FROM tareas WHERE colaborador_id = $1 ORDER BY fecha_inicio ASC';
const getTasksFilteredByState = 'SELECT * FROM tareas WHERE estado = $1 ORDER BY fecha_inicio ASC';
const getTasksFilteredByPriority = 'SELECT * FROM tareas WHERE prioridad = $1 ORDER BY fecha_inicio ASC';
const getTasksFilteredByDate = 'SELECT * FROM tareas WHERE fecha_inicio >= $1 AND fecha_fin <= $2 ORDER BY fecha_inicio ASC';
const insertTask = 'INSERT INTO tareas(descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const updateTask = 'UPDATE tareas SET descripcion = $1, colaborador_id = $2, estado = $3, prioridad = $4, fecha_inicio = $5, fecha_fin = $6, notas = $7 WHERE id = $8';
const deleteTask = 'DELETE FROM tareas WHERE id = $1;'

module.exports = {
    getTasks,
    getTasksFilteredByCollaborator,
    getTasksFilteredByState,
    getTasksFilteredByPriority,
    getTasksFilteredByDate,
    insertTask,
    updateTask,
    deleteTask,
}