const router = require("express").Router();
const pantryRoutes = require("./pantry");

// pantry routes
router.use("/pantry", pantryRoutes);



module.exports = router;
