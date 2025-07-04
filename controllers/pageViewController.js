const PageView = require('../models/PageView');

exports.addPageView = async (req, res) => {
    const { articleId } = req.body;
    try {
        const newPageView = await PageView.create({ articleId });
        res.status(201).json({
            success: true,
            message: 'Anda mengunjungi artikel',
        });
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: error.message 
        });
    }
};

exports.getCount = async (req, res) => {
    try {
        const { articleId, startAt, endAt } = req.query;
        const filter = {};
        if (articleId) {
            filter.articleId = articleId;
        }
        if (startAt || endAt) {
            const readAtFilter = {};
            if (startAt && !isNaN(Date.parse(startAt))) {
                readAtFilter.$gte = new Date(startAt);
            }

            if (endAt && !isNaN(Date.parse(endAt))) {
                readAtFilter.$lte = new Date(endAt);
            }

            if (Object.keys(readAtFilter).length > 0) {
                filter.readAt = readAtFilter;
            }
        }
        const count = await PageView.countDocuments(filter);

        res.status(201).json({
            success: true,
            message: 'Berhasil mengambail jumlah pengunjung',
            data: count +" Page Views"
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Gagal mengambil data page view' ,
            message2: error.message
        });
    }
};

exports.aggregateDate = async (req, res) => {
    try {
        const { interval = 'daily' } = req.query;

        let dateFormat;
        switch (interval) {
            case 'hourly':
                dateFormat = { $dateToString: { format: '%Y-%m-%d %H:00', date: '$readAt' } };
                break;
            case 'monthly':
                dateFormat = { $dateToString: { format: '%Y-%m', date: '$readAt' } };
                break;
            case 'daily':
            default:
                dateFormat = { $dateToString: { format: '%Y-%m-%d', date: '$readAt' } };
                break;
        }

        const result = await PageView.aggregate([
            {
                $group: {
                    _id: dateFormat,
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 4. Format output
        const data = result.map(item => ({
            date: item._id,
            pageViews: item.count
        }));

        res.status(200).json({
            success: true,
            message: `Berhasil mengambil agregasi page view (${interval})`,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil agregasi page view',
            error: error.message
        });
    }
  };