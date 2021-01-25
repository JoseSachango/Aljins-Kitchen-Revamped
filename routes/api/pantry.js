const router = require("express").Router()
const pantryController = require("../../controllers/pantryControllers")




router.route("/")
    .post(pantryController.create)
    



module.exports = router