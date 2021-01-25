const Schemas = require( "../models")



module.exports = {
    create: function(request,response){
       Schemas.Pantry.create(request.body).then(result=>response.json(result)).catch(err=>response.json(err))
    }
}


