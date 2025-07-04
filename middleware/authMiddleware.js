const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user || user.token !== token) {
                return res.status(401).json({ message: 'Token tidak valid atau sudah logout' });
            }
            req.user = await User.findById(decoded.id).select('-password -token');

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Tidak ada token, akses ditolak' });
    }
}; 
const optionalProtect = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth?.startsWith('Bearer')) {
        try {
            const token = auth.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (user && user.token === token) {
                req.user = user; 
            }
        } catch (err) {
        }
    }
    next(); // tetap lanjut meskipun tanpa user
  };

module.exports = { protect, optionalProtect };
