const mongoose = require('mongoose');
const Inventory = require('./Inventory');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

// Middleware: Tự động tạo Inventory sau khi Product được tạo thành công
productSchema.post('save', async function(doc) {
    await Inventory.create({
        product: doc._id,
        stock: 0,
        reserved: 0,
        soldCount: 0
    });
});

module.exports = mongoose.model('Product', productSchema);