const db = require('../utils/database');
const Anime = require('../models/Anime')

module.exports = {
    listAnimes: async(req,res)=>{
        try{
            const data = await db.find(Anime, req.query)
            return res.status(200).send(data)
        }
        catch(e){
            return res.status(404).send({message:'Error while trying to list animes'})
        }
    }
}