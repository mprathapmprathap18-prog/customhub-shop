require('dotenv').config({ path: 'backend/config/config.env' });
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const brandLogo = {
    public_id: 'customhub-logo',
    url: '/logo.png',
};

const productsData = [
    {
        name: 'Diecast Land Rover Defender SUV Metal Model (Wilderness Edition)',
        description: 'Heavy alloy diecast Defender SUV miniature car in black with white safari roof and wilderness side-gear. Features openable doors, realistic interior dashboard, rugged rubber tires, and pull-back action.',
        category: 'Toy Cars & Diecast',
        price: 500,
        cuttedPrice: 899,
        images: [{ public_id: 'defender-car-01', url: '/images/products/defender-car.jpg' }],
        highlights: [
            '1:32 Scale Diecast Alloy Metal Body',
            'Openable Doors & Detailed Safari Roof Rack',
            'Wilderness Edition Black & White Roof Finish',
            'Perfect Collector Item & Gift for Car Lovers'
        ],
        specifications: [
            { title: 'Material', description: 'Diecast Zinc Alloy + ABS Plastic' },
            { title: 'Scale', description: '1:32 Scale Detailed Model' },
            { title: 'Features', description: 'Openable Doors, Rubber Tyres, Roof Rack' },
            { title: 'Color', description: 'Glossy Black with Alpine White Roof' },
        ],
        stock: 35,
        warranty: 1,
    },
    {
        name: 'Cute Duck LED Night Light Lamp (Soft Silicone Touch Bedside Light)',
        description: 'Super adorable glowing duck night lamp made from food-grade BPA-free soft squishy silicone. Emits a soothing warm ambient light that relieves stress and helps peaceful sleep. Rechargeable via USB with multiple brightness levels.',
        category: 'Night Lamps & Decor',
        price: 300,
        cuttedPrice: 599,
        images: [{ public_id: 'duck-lamp-01', url: '/images/products/duck-night-lamp.jpg' }],
        highlights: [
            'Ultra-Soft Squishy BPA-Free Silicone',
            'Eye-Caring Warm Ambient Glow',
            'Rechargeable USB Battery (8+ Hours Backup)',
            'Touch Tap Brightness Sensor'
        ],
        specifications: [
            { title: 'Material', description: 'Washable Soft Silicone + ABS Base' },
            { title: 'Battery', description: 'Built-in 1200mAh USB Rechargeable' },
            { title: 'Light Color', description: 'Warm Golden Yellow (3000K)' },
            { title: 'Control', description: 'Tap Touch Sensor' },
        ],
        stock: 50,
        warranty: 1,
    },
    {
        name: 'Adorable Bunny Rabbit LED Night Lamp (Soft Silicone Ambient Light)',
        description: 'Charming glowing bunny rabbit night lamp with blue dungarees and ribbon accent. Crafted from ultra-soft silicone with smooth, glare-free warm illumination. Perfect bedside companion for kids, bedrooms, and romantic gift surprises.',
        category: 'Night Lamps & Decor',
        price: 400,
        cuttedPrice: 799,
        images: [{ public_id: 'bunny-lamp-01', url: '/images/products/bunny-night-lamp.jpg' }],
        highlights: [
            'Cute Bunny Character with Blue Overalls',
            'Soft Anti-Drop Silicone Material',
            'USB Fast Charging with Long Battery Life',
            'Ideal Birthday & Festival Gift'
        ],
        specifications: [
            { title: 'Material', description: 'Premium Soft Silicone Body' },
            { title: 'Power Source', description: 'USB Type-C Rechargeable' },
            { title: 'Illumination', description: 'Gentle Warm Bedside Light' },
            { title: 'Safety', description: 'Zero-Heat LED, Child Friendly' },
        ],
        stock: 45,
        warranty: 1,
    },
    {
        name: 'Custom Sublimation Photo Ceramic Mug (Heat Press HD Print)',
        description: 'Glossy white ceramic coffee mug customized with your high-definition photo, quote, or company logo using heat-press sublimation printing that never fades.',
        category: 'Custom Mugs',
        price: 249,
        cuttedPrice: 499,
        images: [{ public_id: 'custom-mug-01', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcc103?w=600&h=600&fit=crop' }],
        highlights: [
            'HD Sublimation Thermal Print (100% Fade Proof)',
            'Microwave & Dishwasher Safe',
            '350ml Premium Glossy White Ceramic',
            'Customized with your Photos & Text'
        ],
        specifications: [
            { title: 'Capacity', description: '350 ml' },
            { title: 'Material', description: 'Ceramic' },
            { title: 'Print Method', description: 'Heat-press Sublimation' },
        ],
        stock: 100,
        warranty: 1,
    },
    {
        name: 'Personalized Wooden Collage Photo Frame (8x12 Inch)',
        description: 'Handcrafted warm walnut finish wooden frame designed for displaying family photos, couple memories, and birthday portraits with crystal-clear front acrylic glass.',
        category: 'Photo Frames',
        price: 399,
        cuttedPrice: 799,
        images: [{ public_id: 'photo-frame-01', url: 'https://images.unsplash.com/photo-1519710168189-1ddc167f5d3b?w=600&h=600&fit=crop' }],
        highlights: [
            'Durable High-Grade Engineered Wood',
            'High-Clarity Shatterproof Acrylic Front',
            'Table Stand & Wall Mount Included',
            'Customized Photo Print Included'
        ],
        specifications: [
            { title: 'Dimensions', description: '8 x 12 Inches' },
            { title: 'Mounting', description: 'Wall & Table Top Stand' },
        ],
        stock: 60,
        warranty: 1,
    },
    {
        name: 'Custom Magic Color Changing Photo Mug (Heat Sensitive)',
        description: 'Black heat-sensitive ceramic mug that magically reveals your personalized photo when filled with hot coffee, tea, or milk.',
        category: 'Custom Mugs',
        price: 349,
        cuttedPrice: 699,
        images: [{ public_id: 'magic-mug-01', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcc103?w=600&h=600&fit=crop' }],
        highlights: [
            'Magical Thermo-Chromic Coating',
            'Reveals Hidden Photo on Pouring Hot Liquid',
            '325ml Ceramic Coffee Mug',
            'Exciting Surprise Birthday Gift'
        ],
        specifications: [
            { title: 'Effect', description: 'Heat Reactive Magic Reveal' },
            { title: 'Capacity', description: '325 ml' },
        ],
        stock: 80,
        warranty: 1,
    },
    {
        name: 'Luxury Festival & Birthday Gift Hamper Basket',
        description: 'Curated luxury surprise hamper box containing premium roasted dry fruits, artisanal chocolates, personalized greeting card, and custom keepsake keychain.',
        category: 'Gift Hampers',
        price: 999,
        cuttedPrice: 1999,
        images: [{ public_id: 'gift-hamper-01', url: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop' }],
        highlights: [
            'Handcrafted Ribbon-Tied Gift Box',
            'Includes Chocolates, Dry Fruits & Custom Card',
            'Custom Name Tag on Ribbon',
            'Ready to Gift Direct Delivery'
        ],
        specifications: [
            { title: 'Packaging', description: 'Luxury Hardboard Box with Satin Bow' },
            { title: 'Occasion', description: 'Birthday, Anniversary, Diwali, New Year' },
        ],
        stock: 40,
        warranty: 1,
    },
    {
        name: 'Custom Acrylic Spotify Song Plaque with Wooden Stand',
        description: 'Crystal clear acrylic plaque customized with your favorite song, scannable Spotify code, and favorite memory photo. Scannable with the Spotify app to play music instantly.',
        category: 'Personalized Gifts',
        price: 349,
        cuttedPrice: 699,
        images: [{ public_id: 'spotify-plaque-01', url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=600&fit=crop' }],
        highlights: [
            'Scannable Working Spotify Music Code',
            'HD UV Printed Photo on Clear Acrylic',
            'Natural Solid Pine Wood Base Stand',
            'Trending Gift for Couples & Friends'
        ],
        specifications: [
            { title: 'Material', description: '4mm Cast Acrylic Sheet + Pine Wood Base' },
            { title: 'Dimensions', description: '6 x 8 Inches' },
        ],
        stock: 75,
        warranty: 1,
    }
];

(async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || process.env.DB_URI || 'mongodb+srv://customHub:customHub1234@cluster0.1otpqcp.mongodb.net/toyshop?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Atlas');

        const owner = await User.findOne({ role: { $in: ['admin', 'owner'] } }) || await User.findOne();
        if (!owner) {
            console.error('No admin/owner found.');
            process.exit(1);
        }

        await Product.deleteMany({});
        console.log('Cleared old unwanted products.');

        const docs = productsData.map((item) => ({
            ...item,
            brand: { name: 'CustomHub', logo: brandLogo },
            user: owner._id,
            ratings: 5,
            numOfReviews: 12,
            reviews: [
                {
                    user: owner._id,
                    name: 'Vignesh K',
                    rating: 5,
                    comment: 'High quality product, fast delivery in Krishnagiri. Highly recommended!',
                }
            ]
        }));

        await Product.insertMany(docs);
        console.log(`✅ Successfully inserted ${docs.length} curated products into MongoDB Atlas!`);
        process.exit(0);
    } catch (err) {
        console.error('Error seeding products:', err);
        process.exit(1);
    }
})();
