module.exports = (app) => {
    const sample = require('../controllers/controllers');

    // Create new sample record
    app.post('/sample', sample.create);

    // Retrieve all sample records
    app.get('/sample', sample.findAll);

    // Retrieve a sample record with ID
    app.get('/sample/:_id', sample.findOne);

    // Update a sample record with ID
    app.put('/sample/:_id', sample.update);

    // Delete a sample record with ID
    app.delete('/sample/:_id', sample.delete);
}