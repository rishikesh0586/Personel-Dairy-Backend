import express from 'express';
import { register,readAllUser,updateUser,deleteUser } from '../Controllers/User.Controller.js';
import { login } from '../Controllers/Auth.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/getuser', readAllUser);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);


 router.get('/', (req, res) => {
res.status(200).json({
    Message:"Success"
})
});

export default router;