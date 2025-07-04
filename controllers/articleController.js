const Article = require('../models/Article');

exports.getAllArticle = async (req, res) => {
    const publicOnly = !req.user;

    try {
        const limit = parseInt(req.query.limit) || 10;
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;

        let query = Article.find();
        if (publicOnly) {
            query = Article.find({ status: 'published' });
        }
        const articles = await query.limit(limit)
            .sort({ createdAt: sortOrder });

        res.status(201).json({
            success: true,
            message: 'Berhasil mengambail daftar artikel publik',
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Gagal mengambil data artikel' ,
            message2: error.message
        });
    }
};

exports.getArticleById = async (req, res) => {
    const publicOnly = !req.user;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({
        success: false, 
        message: 'Artikel tidak ditemukan' 
    });
    if (article.status == 'draft' && publicOnly){
        return res.status(404).json({
            success: false,
            message: 'Akses ditolak: hanya bisa melihat artikel publish'
        });
    }
    res.status(201).json({
        success: true,
        message: 'Berhasil mengambail data article',
        data: article
    });
};

exports.createArticle = async (req, res) => {
    const { title, content, status } = req.body;
    const existing = await Article.findOne({ title });
    if (existing) {
        return res.status(400).json({
            success: false, 
            message: 'Judul sudah digunakan' 
        });
    }
    try {
        const createdBy = req.user._id.toString();
        const newArticle = await Article.create({ title, content, status, createdBy });
        res.status(201).json({
            success: true,
            message: 'Artikel berhasil ditambahkan',
            data: {
                id: newArticle._id,
                title: newArticle.title,
                content: newArticle.content,
                status: newArticle.status,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: error.message 
        });
    }
};

exports.updateArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
    });

    if (req.user._id.toString() != article.createdBy) {
        return res.status(403).json({
            success: false, 
            message: 'Akses ditolak: bukan artikel buatanmu'
         });
    }
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!article) return res.status(404).json({
            success: false, 
            message: 'Artikel tidak ditemukan' 
        });
        res.json({
            success: true,
            message: 'Artikel berhasil diperbarui',
            data: {
                id: article._id,
                title: article.title,
                content: article.content,
                status: article.status,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: error.message
         });
    }
};

exports.deleteArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
    });

    if (req.user._id.toString() != article.createdBy) {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak: bukan artikel buatanmu'
        });
    }

    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Artikel berhasil dihapus'
          });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: 'Gagal menghapus artikel' 
        });
    }
};
