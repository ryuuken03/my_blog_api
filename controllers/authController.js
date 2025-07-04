const generateToken = require('../utils/generateToken');
const User = require('../models/User');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        user.token = token;
        await user.save();
        res.json({
            success: true,
            message: 'Login berhasil',
            data:{
                _id: user._id,
                name: user.name,
                username: user.username,
                token: token
            }
        });
    } else {
        res.status(401).json({
            success: false, 
            message: 'username atau password salah' 
        });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.token = null;
        await user.save();

        res.json({
            success: true,
            message: 'Logout berhasil'
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: 'Logout gagal' 
        });
    }
  };
