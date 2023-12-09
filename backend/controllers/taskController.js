const pool = require('../connectionPG/config');
const queries = require('../queries/taskQueries');

const getTasks = (req, res) => {
    
    pool.query(queries.getTasks, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
    
}   

const getTasksFiltered = (req, res) => {

    var filter = req.body.filter;
    var filterType = req.body.filterType;

    if (filterType == 'Colaborador'){
        filter = parseInt(filter);
        pool.query(queries.getTasksFilteredByCollaborator, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'Estado'){
        pool.query(queries.getTasksFilteredByState, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'Prioridad'){
        pool.query(queries.getTasksFilteredByPriority, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    
    
} 

module.exports = {
    getTasks,
    getTasksFiltered,
}