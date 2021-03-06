import bcrypt from 'bcryptjs';

const data = {

    users: [
        {
            name: 'Prachi',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Noor',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },

    ],

    products: [
        {
            name: 'Bamboo Toothbrush',
            category: 'Toothbrush',
            image: ['/images/Toothbrush.jpg','/images/Toothbrush1.jpg','/images/Toothbrush2.jpg','/images/Toothbrush3.jpg','/images/Toothbrush4.jpg', '/images/Toothbrush5.jpg'],
            price: 120,
            countInStock:10,
            brand: 'Jeeva',
            rating: 4.75,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            name: 'Bamboo Comb',
            category: 'Combs',
            image: ['/images/Comb.jpg','/images/Comb1.jpg','/images/Comb2.jpg','/images/Comb3.jpg','/images/Comb4.jpg'],
            price: 120,
            countInStock:0,
            brand: 'Jeeva',
            rating: 4.0,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            name: 'Bamboo Earbuds',
            category: 'Toothbrush',
            image: ['/images/Earbuds.jpg', '/images/Earbuds1.jpg', '/images/Earbuds2.jpg', '/images/Earbuds3.jpg','/images/Earbuds4.jpg'],
            price: 120,
            countInStock:15,
            brand: 'Jeeva',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        }
    ],
};

export default data;