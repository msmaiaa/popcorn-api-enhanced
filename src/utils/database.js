
const buildQuery = (q) =>{
    let query = {}
    let page = 1;
    let limit = 20;
    if(q.page){
        page = q.page;
    }
    if(q.genre){
        query.genres = {"$regex": q.genre, "$options": "i"}
    }
    if(q.limit && q.limit > 1 && q.limit <= 50){
        limit = q.limit
    }

    return{
        query,
        options:{
            page: page,
            limit: limit,
            sort: {"rating.watching": "-1"}
        }
    }
}

module.exports = {
    find: async(schema, query)=>{
        let dbQuery = buildQuery(query);
        return schema.paginate(dbQuery.query, dbQuery.options)
        .then((res)=>{
            return {
                totalFound:res.totalDocs,
                limit: res.limit,
                page: res.page,
                totalPages: res.totalPages,
                data:res.docs
            };
        })
    }
}