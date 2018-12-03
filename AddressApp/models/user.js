const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        }
}));

// function createUser(name, address
//     , postalCode, email, phoneNumber, countryId) {
//     const user = new User({
//         name: name,
//         address: address,
//         postalCode: postalCode,
//         email: email,
//         phoneNumber: phoneNumber,
//         country: countryId
//     });

//     user.save().catch((err) => { console.log(err); });
// }

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(25).required(),
        address: Joi.string().min(3).max(25).required(),
        postalCode: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(5).max(50).
            regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            .required(),
        phoneNumber: Joi.string().min(9).max(10).required(),
        country: Joi.objectId(),
        region: Joi.objectId()
    };

    return Joi.validate(user, schema,{ abortEarly: false});
}

exports.User = User;
exports.validateUser = validateUser;