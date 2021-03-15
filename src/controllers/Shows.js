const db = require('../utils/database');
const Show = require('../models/Show')

module.exports = {
    listShows: async(req,res)=>{
        try{
            const data = await db.find(Show, req.query)
            return res.status(200).send(data)
        }
        catch(e){
            return res.status(404).send({message:'Error while trying to list shows'})
        }
    }
}