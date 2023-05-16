const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('./prisma');
const authRouter = express.Router();


authRouter.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                ...req.body,
                password: hashedPassword,
                registration_type: "Native"
            },
        });
        const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '30d' });
        res.json({ token });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '30d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}



module.exports = {
    authRouter: authRouter,
    verifyToken: verifyToken
} 