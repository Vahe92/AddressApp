const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
    name:  { type: String, required: true, trim: true}
  });
  

  const Region = mongoose.model("Region", regionSchema);

  exports.Region = Region;
  exports.regionSchema = regionSchema;