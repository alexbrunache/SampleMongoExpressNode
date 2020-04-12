const mongoose = require('mongoose');

let SampleData = mongoose.Schema({
    name: String,
    city: String
}, {
    versionKey: false
});


// Export the model
module.exports = mongoose.model('Sample', SampleData, "sampleData");