const mongoose = require('mongoose');
const Joi = require('joi');
const { regionSchema } = require('./region');

const Country = mongoose.model('Country', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  regions: [regionSchema]
}));

//don't need to use async
function createCountry(name, regions) {
  const country = new Country({
    name: name,
    regions: regions
  });

  country.save().catch((err) => { console.log(err); });
}

// function valiateCountry(country) {
//   const schema = {
//     name: Joi.string().min(3).max(25).required(),
//     regions: Joi.array().min(1).items(Joi.object({
//       name: Joi.string().min(2).max(50).required()
//     })).required()
// };

// return Joi.validate(country, schema);
// }

exports.Country = Country;
exports.createCountry = createCountry;