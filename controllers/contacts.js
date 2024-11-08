let contactModel = require('../models/contacts');

module.exports.createContacts = async function (req, res, next) {
        try {
        let contact = new contactModel(req.body);
        let result = await contactModel.create(contact);
        res.json(
            {
                success: true,
                message: 'User created successfully.',
            }
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllContacts = (req, res) => {
    contactModel.find()
        .then(contacts => {
            if (!contacts || contacts.length === 0) {
                return res.status(404).json({
                    message: "No contacts found"
                });
            }
            console.log('Contacts:', contacts);
            res.status(200).json(contacts);
        })
        .catch(err => {
            console.error('Error retrieving contacts:', err);
            res.status(500).json({
                message: "Error retrieving contacts",
                error: err.message
            });
        });
};

module.exports.getContacts = async function (req, res, next) {
    try {
        let uID = req.params.id;
        req.contac = await contactModel.findOne({_id: uID}); 
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.contactByID = async function (req, res, next) {
    res.json(req.contac);
}


module.exports.updateContacts = async function (req, res, next) {
    try {
        let uID = req.params.id;
        let updateContact = new contactModel(req.body);
        updateContact._id = uID;
        let result = await contactModel.updateOne({_id:uID}, updateContact);
        console.log('Update result:', result);
        if (result.modifiedCount > 0) {
            res.json({ 
                success: true,
                message: 'contact updated successfully',
                data: result
            });
        } else {
            throw new Error('contact not found. Are you sure it exists?');
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.deleteContacts = async function (req, res, next) {
    try {
        let uID = req.params.id;

        let result = await contactModel.deleteOne({ _id: uID });
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact deleted successfully.'
                }
            );
        } else {
            throw new Error('Contact not deleted. Are you sure it exists?')
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}