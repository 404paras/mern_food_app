import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { Router } from 'express';

const router = new Router();

router.post('/register', async (req, res) => {
    const { name, email, password ,mobile} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashPassword, role: 'user',mobile:mobile });
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

        res.status(200).json(existingUser);
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Could not log in' });
    }
});

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error in getting all users:', error);
        res.status(500).json({ error: 'Could not retrieve users' });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error in deleting user:', error);
        res.status(500).json({ error: 'Could not delete user' });
    }
});

export default router;
