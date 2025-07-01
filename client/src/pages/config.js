import dummyImage from "../assets/dummy.png"

export const products = [
  {
    id: 1,
    name: 'Organic Bananas',
    brand: 'Fresh Farms',
    image: dummyImage,
    rating: 4,
    inStock: true,
    price: 60,
  },
  {
    id: 2,
    name: 'Almond Milk',
    brand: 'NutriPure',
    image: dummyImage,
    rating: 5,
    inStock: true,
    price: 120,
  },
  {
    id: 3,
    name: 'Brown Rice',
    brand: 'Healthy Grains',
    image: dummyImage,
    rating: 3,
    inStock: true,
    price: 80,
  },
  {
    id: 4,
    name: 'Free-range Eggs (12 pcs)',
    brand: 'Farm Fresh',
    image: dummyImage,
    rating: 4,
    inStock: false,
    price: 150,
  },
  {
    id: 5,
    name: 'Organic Tomatoes',
    brand: 'Green Valley',
    image: dummyImage,
    rating: 4,
    inStock: true,
    price: 50,
  },
  {
    id: 6,
    name: 'Whole Wheat Bread',
    brand: 'BakeHouse',
    image: dummyImage,
    rating: 5,
    inStock: true,
    price: 40,
  },
  {
    id: 7,
    name: 'Peanut Butter',
    brand: 'Nutty Delights',
    image: dummyImage,
    rating: 4,
    inStock: true,
    price: 200,
  },
  {
    id: 8,
    name: 'Fresh Spinach (250g)',
    brand: 'Green Leaf',
    image: dummyImage,
    rating: 3,
    inStock: true,
    price: 35,
  },
  {
    id: 9,
    name: 'Honey',
    brand: 'Nature’s Nectar',
    image: dummyImage,
    rating: 5,
    inStock: false,
    price: 250,
  },
  {
    id: 10,
    name: 'Greek Yogurt',
    brand: 'DairyPure',
    image: dummyImage,
    rating: 4,
    inStock: true,
    price: 90,
  },
];

export const data = [
    {
        "id": 1,
        "name": "Groceries & Food",
        "slug": "groceries-and-food",
        "imageURL": "http://localhost:3000/images/category-1/category-1.webp",
        "subcategories": [
            {
                "id": 1,
                "name": "Fruits & Vegetables",
                "imageURL": "http://localhost:3000/images/category-1/subcategory-1/subcategory-1.webp",
                "products": [
                    {
                        "id": 1,
                        "name": "Brinjal Big",
                        "brand": "GreenHarvest",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-1.webp",
                        "rating": 4.2,
                        "inStock": true,
                        "price": 45,
                        "slug": "brinjal-big"
                    },
                    {
                        "id": 2,
                        "name": "Chili Hybrid",
                        "brand": "FarmFresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-2.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 35,
                        "slug": "chili-hybrid"
                    },
                    {
                        "id": 3,
                        "name": "Mushroom Button",
                        "brand": "Organic Roots",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-3.webp",
                        "rating": 4.7,
                        "inStock": true,
                        "price": 75,
                        "slug": "mushroom-button"
                    },
                    {
                        "id": 4,
                        "name": "Lime",
                        "brand": "Citrus Valley",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-4.webp",
                        "rating": 4.1,
                        "inStock": true,
                        "price": 20,
                        "slug": "lime"
                    },
                    {
                        "id": 5,
                        "name": "Brinjal Long Green",
                        "brand": "VeggieLand",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-5.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 50,
                        "slug": "brinjal-long-green"
                    },
                    {
                        "id": 6,
                        "name": "Green Mountain Banana",
                        "brand": "Tropical Bites",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-6.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 55,
                        "slug": "green-mountain-banana"
                    },
                    {
                        "id": 7,
                        "name": "Small Onion",
                        "brand": "SpiceFarm",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-7.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 40,
                        "slug": "small-onion"
                    },
                    {
                        "id": 8,
                        "name": "Brinjal Purple Striped",
                        "brand": "GreenHarvest",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-8.webp",
                        "rating": 4.2,
                        "inStock": true,
                        "price": 48,
                        "slug": "brinjal-purple-striped"
                    },
                    {
                        "id": 9,
                        "name": "Brinjal Purple",
                        "brand": "Nature's Basket",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-9.webp",
                        "rating": 4,
                        "inStock": true,
                        "price": 42,
                        "slug": "brinjal-purple"
                    },
                    {
                        "id": 10,
                        "name": "Gooseberry",
                        "brand": "Ayurveda Greens",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-10.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 30,
                        "slug": "gooseberry"
                    },
                    {
                        "id": 11,
                        "name": "Cucumber",
                        "brand": "CoolFarm",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-11.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 25,
                        "slug": "cucumber"
                    },
                    {
                        "id": 12,
                        "name": "Big chilli",
                        "brand": "FarmFresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-1/product-12.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 38,
                        "slug": "big-chilli"
                    }
                ],
                "slug": "fruits-and-vegetables"
            },
            {
                "id": 2,
                "name": "Meat, Fish & Eggs",
                "imageURL": "http://localhost:3000/images/category-1/subcategory-2/subcategory-2.webp",
                "products": [
                    {
                        "id": 1,
                        "name": "Seaking Sole",
                        "brand": "Seaking",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-1.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 480,
                        "slug": "seaking-sole"
                    },
                    {
                        "id": 2,
                        "name": "UPF Healthy Eggs Daily 6 pc",
                        "brand": "UPF",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-2.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 60,
                        "slug": "upf-healthy-eggs-daily-6-pc"
                    },
                    {
                        "id": 3,
                        "name": "UPF Healthy Eggs Daily 12pc",
                        "brand": "UPF",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-3.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 110,
                        "slug": "upf-healthy-eggs-daily-12pc"
                    },
                    {
                        "id": 4,
                        "name": "Cut Chicken (Skin Less) Approx 900g-1kg",
                        "brand": "FreshCuts",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-4.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 260,
                        "slug": "cut-chicken-skin-less-approx-900g-1kg"
                    },
                    {
                        "id": 5,
                        "name": "Prakrithi Quail Egg 12's",
                        "brand": "Prakrithi",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-5.webp",
                        "rating": 4.2,
                        "inStock": true,
                        "price": 90,
                        "slug": "prakrithi-quail-egg-12s"
                    },
                    {
                        "id": 6,
                        "name": "Chicken Idiyirachi 100g",
                        "brand": "Malabar Meats",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-6.webp",
                        "rating": 4,
                        "inStock": true,
                        "price": 65,
                        "slug": "chicken-idiyirachi-100g"
                    },
                    {
                        "id": 7,
                        "name": "Merlin Fish Approx 450g-500g",
                        "brand": "Seafresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-7.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 320,
                        "slug": "merlin-fish-approx-450g-500g"
                    },
                    {
                        "id": 8,
                        "name": "Mackerel Fish Approx.950g-1Kg",
                        "brand": "Seafresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-8.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 280,
                        "slug": "mackerel-fish-approx950g-1kg"
                    },
                    {
                        "id": 9,
                        "name": "White Squid Whole Fish Approx.450g-500g",
                        "brand": "OceanCatch",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-9.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 350,
                        "slug": "white-squid-whole-fish-approx450g-500g"
                    },
                    {
                        "id": 10,
                        "name": "Prawns Approx.450g-500g",
                        "brand": "OceanCatch",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-10.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 400,
                        "slug": "prawns-approx450g-500g"
                    },
                    {
                        "id": 11,
                        "name": "Chicken Bone In Breast approx. 400g-500g",
                        "brand": "FreshCuts",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-11.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 180,
                        "slug": "chicken-bone-in-breast-approx-400g-500g"
                    },
                    {
                        "id": 12,
                        "name": "Chicken Whole Leg Approx.500g",
                        "brand": "FreshCuts",
                        "image": "http://localhost:3000/images/category-1/subcategory-2/product-12.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 200,
                        "slug": "chicken-whole-leg-approx500g"
                    }
                ],
                "slug": "meat-fish-and-eggs"
            },
            {
                "id": 3,
                "name": "Masalas & Spices",
                "imageURL": "http://localhost:3000/images/category-1/subcategory-3/subcategory-3.webp",
                "products": [
                    {
                        "id": 1,
                        "name": "Grandmas Kashmiri Chilli Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-1.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 55,
                        "slug": "grandmas-kashmiri-chilli-powder-100g"
                    },
                    {
                        "id": 2,
                        "name": "Grandmas Coriander Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-2.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 45,
                        "slug": "grandmas-coriander-powder-100g"
                    },
                    {
                        "id": 3,
                        "name": "Eco Fresh Cumin Seed 100g",
                        "brand": "Eco Fresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-3.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 50,
                        "slug": "eco-fresh-cumin-seed-100g"
                    },
                    {
                        "id": 4,
                        "name": "Eco Fresh Coriander Seed 100gm",
                        "brand": "Eco Fresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-4.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 48,
                        "slug": "eco-fresh-coriander-seed-100gm"
                    },
                    {
                        "id": 5,
                        "name": "Grandmas Sambar Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-5.webp",
                        "rating": 4.7,
                        "inStock": true,
                        "price": 52,
                        "slug": "grandmas-sambar-powder-100g"
                    },
                    {
                        "id": 6,
                        "name": "Turmeric Whole 250g",
                        "brand": "Nature's Basket",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-6.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 60,
                        "slug": "turmeric-whole-250g"
                    },
                    {
                        "id": 7,
                        "name": "Grandmas Chicken Masala 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-7.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 58,
                        "slug": "grandmas-chicken-masala-100g"
                    },
                    {
                        "id": 8,
                        "name": "Grandmas Meat Masala 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-8.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 60,
                        "slug": "grandmas-meat-masala-100g"
                    },
                    {
                        "id": 9,
                        "name": "Nourish You Black Chia Seed 500g",
                        "brand": "Nourish You",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-9.webp",
                        "rating": 4.7,
                        "inStock": true,
                        "price": 210,
                        "slug": "nourish-you-black-chia-seed-500g"
                    },
                    {
                        "id": 10,
                        "name": "Natural Spices Cardamom 50Gm",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-10.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 185,
                        "slug": "natural-spices-cardamom-50gm"
                    },
                    {
                        "id": 11,
                        "name": "Natural Spices JeeraPremium 100g",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-11.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 70,
                        "slug": "natural-spices-jeerapremium-100g"
                    },
                    {
                        "id": 12,
                        "name": "Natural Spices Khuskhus 50Gm",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-12.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 160,
                        "slug": "natural-spices-khuskhus-50gm"
                    }
                ],
                "slug": "masalas-and-spices"
            },
            {
                "id": 4,
                "name": "Snacks & Beverages",
                "imageURL": "http://localhost:3000/images/category-1/subcategory-4/subcategory-4.webp",
                "products": [
                    {
                        "id": 1,
                        "name": "Grandmas Kashmiri Chilli Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-1.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 55,
                        "slug": "grandmas-kashmiri-chilli-powder-100g"
                    },
                    {
                        "id": 2,
                        "name": "Grandmas Coriander Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-2.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 45,
                        "slug": "grandmas-coriander-powder-100g"
                    },
                    {
                        "id": 3,
                        "name": "Eco Fresh Cumin Seed 100g",
                        "brand": "Eco Fresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-3.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 50,
                        "slug": "eco-fresh-cumin-seed-100g"
                    },
                    {
                        "id": 4,
                        "name": "Eco Fresh Coriander Seed 100gm",
                        "brand": "Eco Fresh",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-4.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 48,
                        "slug": "eco-fresh-coriander-seed-100gm"
                    },
                    {
                        "id": 5,
                        "name": "Grandmas Sambar Powder 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-5.webp",
                        "rating": 4.7,
                        "inStock": true,
                        "price": 52,
                        "slug": "grandmas-sambar-powder-100g"
                    },
                    {
                        "id": 6,
                        "name": "Turmeric Whole 250g",
                        "brand": "Nature's Basket",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-6.webp",
                        "rating": 4.3,
                        "inStock": true,
                        "price": 60,
                        "slug": "turmeric-whole-250g"
                    },
                    {
                        "id": 7,
                        "name": "Grandmas Chicken Masala 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-7.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 58,
                        "slug": "grandmas-chicken-masala-100g"
                    },
                    {
                        "id": 8,
                        "name": "Grandmas Meat Masala 100g",
                        "brand": "Grandmas",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-8.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 60,
                        "slug": "grandmas-meat-masala-100g"
                    },
                    {
                        "id": 9,
                        "name": "Nourish You Black Chia Seed 500g",
                        "brand": "Nourish You",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-9.webp",
                        "rating": 4.7,
                        "inStock": true,
                        "price": 210,
                        "slug": "nourish-you-black-chia-seed-500g"
                    },
                    {
                        "id": 10,
                        "name": "Natural Spices Cardamom 50Gm",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-10.webp",
                        "rating": 4.6,
                        "inStock": true,
                        "price": 185,
                        "slug": "natural-spices-cardamom-50gm"
                    },
                    {
                        "id": 11,
                        "name": "Natural Spices JeeraPremium 100g",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-11.webp",
                        "rating": 4.5,
                        "inStock": true,
                        "price": 70,
                        "slug": "natural-spices-jeerapremium-100g"
                    },
                    {
                        "id": 12,
                        "name": "Natural Spices Khuskhus 50Gm",
                        "brand": "Natural Spices",
                        "image": "http://localhost:3000/images/category-1/subcategory-3/product-12.webp",
                        "rating": 4.4,
                        "inStock": true,
                        "price": 160,
                        "slug": "natural-spices-khuskhus-50gm"
                    }
                ],
                "slug": "snacks-and-beverages"
            }
        ]
    }
]

export const categories = [
    "Fruits & Vegetables",
    "Meat, Fish & Eggs",
    "Masalas & Spices",
    "Snacks & Beverages",
    "Frozen Foods",
    "Tea, Coffee & Malted Drinks",
    "Breakfast & Instant Foods"
];

export const categories_url_slug = {
    "Fruits & Vegetables": "fruits-and-vegetables",
    "Meat, Fish & Eggs": "meat-fish-and-eggs",
    "Masalas & Spices": "masalas-and-spices",
    "Snacks & Beverages": "snacks-and-beverages",
    "Frozen Foods": "frozen-foods",
    "Tea, Coffee & Malted Drinks": "tea-coffee-and-malted-drinks",
    "Breakfast & Instant Foods": "breakfast-and-instant-foods"
}

export const API_URL = "https://hypermarket-ko9l.onrender.com";
export const STRIPE_PK = 'pk_test_51RfzFq083DKTvRy9WsZOLXi3r3veXzKYcy97IZZu1yq3ClVQoo1nLSVivRfoqEIM7uCh46T3LJ9TuX7q1PkU0SeD003D0VdtSY';