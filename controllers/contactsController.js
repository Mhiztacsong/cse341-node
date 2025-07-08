const contactModel = require('../models/contactModel');

const getAll = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

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

module.exports = { getAll, getOne };
