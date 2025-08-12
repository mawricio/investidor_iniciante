require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./server/models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/investidor360';
(async ()=>{
  try{
    await mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true });
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@exemplo.com';
    const password = process.env.SEED_ADMIN_PASS || 'senha123';
    const existing = await User.findOne({ email });
    if(existing){ console.log('Usuário já existe:', email); process.exit(0); }
    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ email, passwordHash: hash, name: 'Admin', role: 'admin' });
    console.log('Usuário criado:', u.email);
    mongoose.disconnect();
  }catch(err){ console.error(err); mongoose.disconnect(); }
})();
