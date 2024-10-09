const request = require('supertest');
const app = require('../server'); // Adjust path as needed

describe('Products API', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should add a new product', async () => {
        const product = { id: '123', name: 'Test Product', price: 100 };
        const res = await request(app)
            .post('/api/products')
            .send(product);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include(product);
    });

    // Add more tests for updating, deleting, etc.
});
