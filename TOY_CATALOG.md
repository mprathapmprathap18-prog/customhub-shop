# Toy Shop Categories & Products Reference

## Available Toy Categories

The Toy Shop platform now supports the following product categories:

1. **Action Figures** - Superhero figures, collectibles, and character toys
2. **Dolls & Accessories** - Barbie dolls, baby dolls, doll houses, and accessories
3. **Building Blocks** - LEGO sets, construction toys, and brick building systems
4. **Board Games** - Classic and modern board games for families
5. **Remote Control** - RC cars, drones, boats, and remote control toys
6. **Puzzles** - Jigsaw puzzles, 3D puzzles, and brain teasers
7. **Outdoor Toys** - Skates, skateboards, scooters, bikes, and outdoor play equipment
8. **Educational** - STEM toys, science kits, coding robots, and learning games
9. **Soft Toys** - Plush toys, teddy bears, and cuddly companions

## Sample Toy Products Available

### 1. LEGO Classic Large Creative Brick Box
- **Category:** Building Blocks
- **Price:** ₹2,499 (MRP: ₹3,999)
- **Rating:** 4.5/5 (245 reviews)
- **Brand:** LEGO
- **Description:** Build endless possibilities with 790 LEGO Classic bricks
- **Warranty:** 12 months
- **Stock:** 50 units

### 2. Marvel Spider-Man Action Figure
- **Category:** Action Figures
- **Price:** ₹899 (MRP: ₹1,299)
- **Rating:** 4.3/5 (180 reviews)
- **Brand:** Hasbro
- **Description:** 6-inch Marvel Spider-Man with 16 points of articulation
- **Warranty:** 6 months
- **Stock:** 75 units

### 3. Barbie Dream House Playset
- **Category:** Dolls & Accessories
- **Price:** ₹4,999 (MRP: ₹7,499)
- **Rating:** 4.6/5 (320 reviews)
- **Brand:** Mattel
- **Description:** 3-story Barbie Dream House with 8+ rooms and working elevator
- **Warranty:** 12 months
- **Stock:** 30 units

### 4. Monopoly Board Game
- **Category:** Board Games
- **Price:** ₹799 (MRP: ₹1,199)
- **Rating:** 4.4/5 (410 reviews)
- **Brand:** Hasbro
- **Description:** Classic Monopoly for 2-6 players
- **Warranty:** 12 months
- **Stock:** 100 units

### 5. 2.4GHz Remote Control Car
- **Category:** Remote Control
- **Price:** ₹1,499 (MRP: ₹2,499)
- **Rating:** 4.2/5 (156 reviews)
- **Brand:** Hot Wheels
- **Description:** High-speed RC car with 15+ km/h speed
- **Warranty:** 6 months
- **Stock:** 45 units

### 6. 1000 Piece World Map Puzzle
- **Category:** Puzzles
- **Price:** ₹599 (MRP: ₹899)
- **Rating:** 4.1/5 (89 reviews)
- **Brand:** Ravensburger
- **Description:** Detailed 1000-piece world map jigsaw puzzle
- **Warranty:** 12 months
- **Stock:** 60 units

### 7. Kids Roller Skates with LED Lights
- **Category:** Outdoor Toys
- **Price:** ₹1,299 (MRP: ₹1,999)
- **Rating:** 4.3/5 (203 reviews)
- **Brand:** Hudora
- **Description:** Adjustable roller skates with LED light-up wheels
- **Warranty:** 12 months
- **Stock:** 55 units

### 8. Coding Robot for Kids
- **Category:** Educational
- **Price:** ₹2,199 (MRP: ₹3,499)
- **Rating:** 4.7/5 (287 reviews)
- **Brand:** Ozobot
- **Description:** Programmable robot that teaches coding basics
- **Warranty:** 12 months
- **Stock:** 40 units

### 9. Giant Teddy Bear (100cm)
- **Category:** Soft Toys
- **Price:** ₹1,599 (MRP: ₹2,399)
- **Rating:** 4.8/5 (512 reviews)
- **Brand:** Steiff
- **Description:** Super soft cuddly teddy bear, machine washable
- **Warranty:** 12 months
- **Stock:** 35 units

### 10. Diecast Metal Model Cars Set (12 pcs)
- **Category:** Action Figures
- **Price:** ₹699 (MRP: ₹1,099)
- **Rating:** 4.2/5 (134 reviews)
- **Brand:** Hot Wheels
- **Description:** Premium diecast metal cars with detailed interiors
- **Warranty:** 12 months
- **Stock:** 80 units

### 11. 3D City Building Puzzle
- **Category:** Puzzles
- **Price:** ₹1,299 (MRP: ₹1,999)
- **Rating:** 4.4/5 (167 reviews)
- **Brand:** 4D Cityscape
- **Description:** 216-piece 3D puzzle of famous city landmarks
- **Warranty:** 12 months
- **Stock:** 42 units

### 12. Professional Skateboard
- **Category:** Outdoor Toys
- **Price:** ₹2,499 (MRP: ₹3,999)
- **Rating:** 4.5/5 (278 reviews)
- **Brand:** Tony Hawk
- **Description:** Professional-grade skateboard with ABEC-7 bearings
- **Warranty:** 6 months
- **Stock:** 28 units

### 13. Science Crystal Growing Kit
- **Category:** Educational
- **Price:** ₹799 (MRP: ₹1,299)
- **Rating:** 4.6/5 (234 reviews)
- **Brand:** National Geographic
- **Description:** Complete crystal growing kit with minerals and tools
- **Warranty:** 12 months
- **Stock:** 58 units

### 14. Uno Card Game
- **Category:** Board Games
- **Price:** ₹399 (MRP: ₹599)
- **Rating:** 4.3/5 (756 reviews)
- **Brand:** Mattel
- **Description:** Classic Uno card game for 2-10 players
- **Warranty:** 12 months
- **Stock:** 150 units

### 15. Baby Rattle & Teething Ring Set
- **Category:** Educational
- **Price:** ₹449 (MRP: ₹699)
- **Rating:** 4.5/5 (189 reviews)
- **Brand:** Sophie la Girafe
- **Description:** BPA-free silicone teething rings and colorful rattles
- **Warranty:** 12 months
- **Stock:** 95 units

## Adding New Toy Products

### Via Admin Panel
1. Navigate to Admin Dashboard
2. Click on "Add New Product"
3. Fill in product details:
   - **Name:** Product name
   - **Description:** Product description
   - **Category:** Select from available toy categories
   - **Price:** Selling price in rupees
   - **Cutted Price:** Original/MRP
   - **Stock:** Available quantity
   - **Brand:** Toy brand/manufacturer
   - **Images:** Upload product images
   - **Warranty:** Warranty period in months

### Via API
POST `/api/v1/product/new`

```json
{
  "name": "Product Name",
  "description": "Product description",
  "category": "Category Name",
  "price": 1000,
  "cuttedPrice": 1500,
  "brand": "Brand Name",
  "stock": 50,
  "warranty": 12,
  "images": []
}
```

## Price Range
- **Budget Toys:** ₹399 - ₹999
- **Mid-Range Toys:** ₹1,000 - ₹2,999
- **Premium Toys:** ₹3,000 - ₹7,499
- **Deluxe Toys:** ₹7,500+

## Popular Brands in Stock
- LEGO
- Hasbro
- Mattel
- Hot Wheels
- Ravensburger
- National Geographic
- Steiff
- Ozobot
- Tony Hawk
- Hudora
- Sophie la Girafe
- 4D Cityscape

## Special Features
✅ Filter by category
✅ Price range filtering
✅ Rating-based sorting
✅ Quick add to cart
✅ Wishlist functionality
✅ Product reviews and ratings
✅ Secure checkout
✅ Multiple payment options
✅ Fast delivery tracking

---
Updated: 2024
Toy Shop - The Ultimate Online Toy Destination
