const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme-please';

function auth(requiredRole){
  return function (req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ error: 'Token ausente' });
    const parts = authHeader.split(' ');
    if(parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Token malformado' });
    const token = parts[1];
    try{
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if(requiredRole && payload.role !== requiredRole) return res.status(403).json({ error: 'Permissão negada' });
      next();
    }catch(err){
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
}

module.exports = auth;
