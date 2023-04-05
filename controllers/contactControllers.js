const contactsModel = require("../models/contactModels");
const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contactsValue = await contactsModel.find({ user_id: req.user.id });
  res.status(200).json(contactsValue);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contactsValue = await contactsModel.findById(id);
  if (!contactsValue) {
    throw new Error("Contact not found");
  }
  res.status(200).json(contactsValue);
});

//@desc udpate contact
//@route GET /api/contacts/:id
//@access private
const putContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newBody = req.body;
  console.log(newBody);
  const updatedContact = await contactsModel.findByIdAndUpdate(
    id,
    { name: newBody.name },
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
});

//@desc create contact
//@route GET /api/contacts/
//@access private
// name, email, phone
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const user_id = req.user.id;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory");
  }
  const contactValue = await contactsModel.create({
    user_id,
    name,
    email,
    phone,
  });
  res.status(200).json(contactValue);
});

//@desc delete contact
//@route GET /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedContact = await contactsModel.findByIdAndDelete(id);
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  getContact,
  putContact,
  postContact,
  deleteContact,
};
