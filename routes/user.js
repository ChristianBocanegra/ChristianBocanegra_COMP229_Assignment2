const express = require('express');
const router = express.Router();

let userController = require('../controllers/user');

router.post('/', userController.createUser); 
router.get('/', userController.getAllUser); 
router.get('/:id', userController.getUser, userController.userByID); 
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


