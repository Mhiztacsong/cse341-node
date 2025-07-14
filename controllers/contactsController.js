const contactModel = require('../models/contactModel');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

// GET one contact by ID
const getOne = async (req, res) => {
  try {
    const contact = await contactModel.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact by ID:', err);
    res.status(500).json({ message: 'Failed to fetch contact by ID' });
  }
};

// POST - Create new contact
const createContact = async (req, res) => {
  try {
    const newContact = await contactModel.createContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT - Update existing contact
const updateContact = async (req, res) => {
  try {
    const updated = await contactModel.updateContact(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ message: 'Failed to update contact' });
  }
};

// DELETE - Remove a contact
const deleteContact = async (req, res) => {
  try {
    const deleted = await contactModel.deleteContact(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};

module.exports = {
  getAll,
  getOne,
  createContact,
  updateContact,
  deleteContact
};
