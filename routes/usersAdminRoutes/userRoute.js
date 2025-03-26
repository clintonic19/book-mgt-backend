const express = require('express');
const { userAdmin } = require('../../controllers/usersAdminController/userController');
const router = express.Router();


//POST ADMIN API
router.post('/admin', userAdmin);


module.exports = router;