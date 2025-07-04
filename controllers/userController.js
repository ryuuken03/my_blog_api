const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .select('name username updatedAt')
            .limit(limit)
            .sort({ createdAt: sortOrder });

        res.status(201).json({
            success: true,
            message: 'Berhasil mengambail daftar user',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Gagal mengambil data user' 
        });
    }
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
        success: false, 
        message: 'User tidak ditemukan' 
    });

    res.status(201).json({
        success: true,
        message: 'Berhasil mengambail data user',
        data: user
    });
};

exports.createUser = async (req, res) => {
    const { name, username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
        return res.status(400).json({
            success: false, 
            message: 'Username sudah digunakan' 
        });
    }
    try {
        const newUser = await User.create({ name, username, password });
        res.status(201).json({
            success: true,
            message: 'User berhasil ditambahkan',
            data: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: error.message 
        });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
        return res.status(403).json({
            success: false, 
            message: 'Akses ditolak: bukan data kamu'
         });
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!user) return res.status(404).json({
            success: false, 
            message: 'user tidak ditemukan'
         });
        res.json({
            success: true,
            message: 'User berhasil diperbarui',
            data: {
                id: user._id,
                name: user.name,
                username: user.username,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: error.message
         });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
        return res.status(403).json({
            success: false, 
            message: 'Akses ditolak: bukan data kamu' 
        });
    }

    try {
        await User.findByIdAndDelete(userId);
        res.json({
            success: true,
            message: 'User berhasil dihapus'
          });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: 'Gagal menghapus user' 
        });
    }
};
