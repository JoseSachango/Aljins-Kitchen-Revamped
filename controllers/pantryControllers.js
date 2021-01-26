const Schemas = require( "../models")



module.exports = {
    create: function(request,response){
        Schemas.Pantry.create(request.body).then(result=>response.json(result)).catch(err=>response.json(err))
    },

    remove: function(request, response) {
        Schemas.Pantry.findById({ _id: request.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => response.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(request, response) {
        Schemas.Pantry
        //maybe req.body.value 
            .find({userId:request.params.id})
            .then(dbModel => response.json(dbModel))
            .catch(err => response.status(422).json(err));
        }
}


