const express = require("express");
const routes = express.Router();

const {
  getContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../customMiddleware/validateTokenHandler");

routes.use(validateToken);

routes.get("/", getContacts);

routes.get("/:id", getContact);

routes.post("/", postContact);

routes.put("/:id", putContact);

routes.delete("/:id", deleteContact);

module.exports = routes;
