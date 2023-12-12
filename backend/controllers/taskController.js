const pool = require('../connectionPG/config');
const queries = require('../queries/taskQueries');

const getTasksFiltered = (req, res) => {

    var filter = req.body.filter;
    var filterType = req.body.filterType;

    if (filterType == 'Collaborator') {
        filter = parseInt(filter);
        pool.query(queries.getTasksFilteredByCollaborator, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'State') {
        pool.query(queries.getTasksFilteredByState, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'Priority') {
        pool.query(queries.getTasksFilteredByPriority, [filter], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'Date') {
        const dates = filter.split('/');
        pool.query(queries.getTasksFilteredByDate, [dates[0], dates[1]], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    else if (filterType == 'All') {
        pool.query(queries.getTasks, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows)
        })
    }
}

const insertTask = (req, res) => {

    var description = req.body.description;
    var collaborator_id = req.body.collaborator_id;
    var state = req.body.state;
    var priority = req.body.priority;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var notes = req.body.notes;

    pool.query(queries.insertTask, [description, collaborator_id, state, priority, startDate, endDate, notes], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })

}

module.exports = {
    getTasksFiltered,
    insertTask,
}