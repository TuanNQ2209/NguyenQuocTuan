const Inventory = require('../models/Inventory');

exports.getAll = async (req, res) => {
    const data = await Inventory.find().populate('product');
    res.json(data);
};

exports.getById = async (req, res) => {
    const data = await Inventory.findById(req.params.id).populate('product');
    res.json(data);
};

exports.addStock = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        
        // Kiểm tra nếu thiếu dữ liệu thì báo lỗi thay vì crash server
        if (!product || !quantity) {
            return res.status(400).json({ error: "Thiếu product ID hoặc quantity!" });
        }

        const inv = await Inventory.findOneAndUpdate(
            { product }, 
            { $inc: { stock: Number(quantity) } }, // Ép kiểu số để an toàn
            { new: true }
        );
        res.json(inv);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeStock = async (req, res) => {
    const { product, quantity } = req.body;
    const inv = await Inventory.findOneAndUpdate(
        { product, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Không đủ hàng trong kho" });
    res.json(inv);
};

exports.reservation = async (req, res) => {
    const { product, quantity } = req.body;
    // Giảm stock và tăng reserved
    const inv = await Inventory.findOneAndUpdate(
        { product, stock: { $gte: quantity } },
        { $inc: { stock: -quantity, reserved: quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Không đủ hàng để đặt trước" });
    res.json(inv);
};

exports.sold = async (req, res) => {
    const { product, quantity } = req.body;
    // Giảm reserved và tăng soldCount
    const inv = await Inventory.findOneAndUpdate(
        { product, reserved: { $gte: quantity } },
        { $inc: { reserved: -quantity, soldCount: quantity } },
        { new: true }
    );
    if (!inv) return res.status(400).json({ message: "Không đủ số lượng đặt trước để bán" });
    res.json(inv);
};