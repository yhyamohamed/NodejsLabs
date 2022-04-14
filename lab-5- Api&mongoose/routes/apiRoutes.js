const express = require("express");
const router = express.Router();
const client = require("../models/clients");
const clientController = require('../controller/clientController');

router.get("/clients", clientController.index);
router.get("/clients/:id",clientController.show);
router.post("/clients",clientController.add );
router.put("/clients/:id", clientController.update);
router.delete("/clients/:id", clientController.delete);
module.exports = router;
