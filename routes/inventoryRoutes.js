const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');
const Product = require('../models/Product'); // Cần để tạo SP

// 1. Route tạo sản phẩm (Để kích hoạt tạo Inventory tự động)
router.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Các routes Inventory
router.get('/', invController.getAll);
router.get('/:id', invController.getById);
router.post('/add-stock', invController.addStock);
router.post('/reservation', invController.reservation);
router.post('/sold', invController.sold);

module.exports = router;