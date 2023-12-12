const pool = require('../connectionPG/config');
const queries = require('../queries/collaboratorQueries');  

const getCollaborators = (req, res) => {
    
    pool.query(queries.getCollaborators, (error, results) => {
        if (error) {res.status(400).json({success : false, data : [], error : error})}
        res.status(200).json({success : true, data : results.rows, error : []})
    })
    
}   

module.exports = {
    getCollaborators,
}