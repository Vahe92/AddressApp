const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const hbs = require('express-handlebars');
const { Country, createCountry } = require('./models/country');
const { Region } = require('./models/region');
const { User, validateUser } = require('./models/user');

const app = express();

app.engine('hbs',hbs({extName: 'hbs'}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, '/public')));

const db = config.get('connectionString');

mongoose.connect(db)
.then(() => console.log(`Succesfully conected to ${db}`))
.catch(err => console.log(`Could not connect to ${db}`));

// createCountry('UK', [
//   new Region({ name : 'London'}),
//   new Region({ name : 'North West'}),
//   new Region({ name : 'South East'})
// ]);

// createCountry('Germany', [
//   new Region({ name : 'Berlin'}),
//   new Region({ name : 'Bavaria'}),
//   new Region({ name : 'Hamburg'})
// ]);

// createCountry('Denmark', [
//   new Region({ name : 'Capital Region of Denmark'}),
//   new Region({ name : 'Central Denmark Region'}),
//   new Region({ name : 'North Denmark Region'})
// ]);

app.get('/', async (req, res) => {
    const countries =  await Country.find().select({ name: 1});
    res.render('index',{ countries:countries });
  });

app.get('/regions/:countryId', async (req, res) => {
  console.log(req.params.countryId);
    const selectedCountry =  await Country.find({_id: req.params.countryId});
    //console.log(selectedCountry);
    res.send(selectedCountry[0].regions);
  });

app.post('/users', async (req, res) => {
    let result = validateUser(req.body);
    
    if(result.error){
      console.log(result.error.details.length);
      let errorMessages = result.error.details.map(m => m.message);
      res.status(400).send(errorMessages);
      console.log("uuu");
      return;
    }

    const {name, address, postalCode, email, phoneNumber, country, region} = req.body;

    const selectedCountry = await Country.find({_id: country});

    if(!selectedCountry){
      res.status(400).send("Incorrect country");
    }
    else{
      const selectedRegion = selectedCountry[0].regions.find(r => r._id == region);
      if(!selectedRegion)
        res.status(400).send("Incorrect region");
      }


     let user = new User({
      name: name,
      address: address,
      postalCode: postalCode,
      email: email,
      phoneNumber: phoneNumber,
      country: ObjectId(country)
     });

    user = await user.save().catch((err) => { console.log(err); });

    res.send(user);
  });

const port = process.env.PORT || 4999;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;