import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { Router } from 'express';

const router = new Router();

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashPassword, role });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ error: 'Could not register user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
        const existingUser = await User.findOne({ email });
       
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passMatch = await bcrypt.compare(password, existingUser.password);
        if (!passMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log(passMatch)

        res.status(200).json(existingUser);
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Could not log in' });
    }
});

export default router;
