const express = require('express');
const router = express.Router();

let contactController = require('../controllers/contacts');

router.post('/', contactController.createContacts);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContacts, contactController.contactByID);
router.put('/:id', contactController.updateContacts);
router.delete('/:id', contactController.deleteContacts);

module.exports = router;