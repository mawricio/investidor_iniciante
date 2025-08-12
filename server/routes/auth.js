const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-please';

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ sub: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

module.exports = router;
