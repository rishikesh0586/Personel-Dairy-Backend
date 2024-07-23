import express from 'express';
import { createUser } from '../Controllers/User.controller.js';
const router = express.Router();

router.get('/signup', createUser);

 router.get('/', (req, res) => {
res.status(200).json({
    Message:"Success"
})
});

export default router;