const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Meet2Code", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
const Document = new mongoose.Schema({
  _id: String,
  data: Object,
})

module.exports = mongoose.model("Document", Document)