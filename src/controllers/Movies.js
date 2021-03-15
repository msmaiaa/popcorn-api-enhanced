const db = require('../utils/database');
const Movie = require('../models/Movie')

module.exports = {
    listMovies: async(req,res)=>{
        try{
            const data = await db.find(Movie, req.query)
            return res.status(200).send(data)
        }
        catch(e){
            return res.status(404).send({message:'Error while trying to list movies'})
        }
    }
}