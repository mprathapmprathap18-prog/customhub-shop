require('dotenv').config({ path: 'backend/config/config.env' });
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const img = (id) => `https://images.unsplash.com/${id}?w=600&h=600&fit=crop`;
const brandLogo = {
    public_id: 'customhub-logo',
    url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop',
};

const gifts = [
    ['Personalized Name Mug', 'Custom ceramic mug with a name or short message.', 'Custom Mugs', 349, 599, 'photo-1514228742587-6b1558fcc103'],
    ['Luxury Festival Gift Hamper', 'Dry fruits, chocolates and a greeting card in a premium box.', 'Gift Hampers', 1499, 2199, 'photo-1607344645866-009c320b63e0'],
    ['Handmade Birthday Greeting Card', 'Premium handmade card with envelope.', 'Greeting Cards', 149, 249, 'photo-1513475382585-d06e58bcb0e0'],
    ['Red Rose Bouquet (12 Stems)', 'Fresh red roses wrapped with ribbon.', 'Flowers', 799, 1199, 'photo-1513201099705-a9746e1fd1ea'],
    ['Assorted Chocolate Gift Box', '24-piece mixed chocolate box in a gift tin.', 'Chocolates', 599, 899, 'photo-1481391319762-47dff72954d9'],
    ['Wooden Photo Frame 8x10', 'Warm wood finish frame with a stand.', 'Photo Frames', 449, 799, 'photo-1519710168189-1ddc167f5d3b'],
    ['Silver Pendant Gift Set', 'Pendant and chain in a velvet gift box.', 'Jewelry', 1299, 1999, 'photo-1515562141207-7a88fb7ce338'],
    ['Giant Teddy Bear Gift', 'Soft plush teddy bear with a bow.', 'Soft Toys', 899, 1499, 'photo-1559715541-5daf8a0296d0'],
    ['Custom Name Keychain', 'Laser-cut wooden keychain with a name of your choice.', 'Personalized Gifts', 249, 399, 'photo-1513885535751-8b9238bd345a'],
    ['Couple Photo Mug Pair', 'Set of two mugs printed with your photos.', 'Custom Mugs', 649, 999, 'photo-1514228742587-6b1558fcc103'],
    ['Corporate Welcome Hamper', 'Tea, cookies and a notebook for office gifting.', 'Gift Hampers', 1899, 2599, 'photo-1607344645866-009c320b63e0'],
    ['Mixed Seasonal Bouquet', 'Seasonal mixed flowers with tissue wrap.', 'Flowers', 699, 999, 'photo-1513201099705-a9746e1fd1ea'],
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const owner = await User.findOne({ role: { $in: ['admin', 'owner'] } }) || await User.findOne();
        if (!owner) {
            console.error('No user found. Create an admin/owner account first.');
            process.exit(1);
        }

        await Product.deleteMany({});
        const docs = gifts.map(([name, description, category, price, cuttedPrice, photo]) => ({
            name,
            description,
            highlights: ['Gift wrapped', 'CustomHub Gift Shop exclusive', 'Ready to surprise'],
            specifications: [
                { title: 'Occasion', description: 'Birthday, Anniversary, Festival' },
                { title: 'Packaging', description: 'Gift box included' },
            ],
            price,
            cuttedPrice,
            images: [{ public_id: photo, url: img(photo) }],
            brand: { name: 'CustomHub', logo: brandLogo },
            category,
            stock: 50,
            warranty: 1,
            user: owner._id,
        }));

        await Product.insertMany(docs);
        console.log(`Replaced catalog with ${docs.length} gift items.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
