const pool = require('../connectionPG/config');
const queries = require('../queries/collaboratorQueries');  

const getCollaborators = (req, res) => {
    
    pool.query(queries.getCollaborators, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
    
}   

module.exports = {
    getCollaborators,
}