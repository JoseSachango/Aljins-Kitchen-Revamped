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

    findById: function(req, res) {
        Schemas.Pantry
            .find({userId:req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
}


