const Sample = require('../models/models');

// Create and Save a new sample record
exports.create = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "Sample city can not be empty"
        });
    }

    // Create a Sample Record
    const sample = new Sample({
        name: req.body.name || "Orphan", 
        city: req.body.city
    });

    // Save Sample in the database
    sample.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the sample sample."
        });
    });
};

// Retrieve and return all sample records from the database.
exports.findAll = (req, res) => {
    Sample.find()
    .then(sample => {
        res.send(sample);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sample records."
        });
    });
};

// Find a single samplerecord with a sampleID
exports.findOne = (req, res) => {
    Sample.findById(req.params._id)
    .then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "Sample record not found with id " + req.params._id
            });            
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sample record not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving sample record with id " + req.params._id
        });
    });
};

// Update a sample record identified by the sampleID in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.city) {
        return res.status(400).send({
            message: "Sample city can not be empty"
        });
    }

    // Find sample record and update it with the request body
    Sample.findByIdAndUpdate(req.params._id, {
        name: req.body.name || "Orphan",
        city: req.body.city
    })
    .then(sample => {
        if(!sample) {

            return res.status(404).send({
                message: "Sample record not found with id " + req.params._id
            });
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sample record not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating sample record with id " + req.params._id
        });
    });
};

// Delete a sampleRecord with the specified sampleID in the request
exports.delete = (req, res) => {
    Sample.findByIdAndRemove(req.params._id)
    .then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "Sample not found with id " + req.params._id
            });
        }
        res.send({message: "Sample deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sample not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete sample with id " + req.params._id
        });
    });
};