const Schemas = require( "../models")



module.exports = {
 
    createRecipe: function(request,response){
        Schemas.Recipe.create(request.body).then(result=>response.json(result)).catch(err=>response.json(err))
    },
    getOne: function(request,response){
        Schemas.Recipe.findOne({_id: request.params.id}).then(result=>response.json(result)).catch(err=>response.json(err))
    }

}
