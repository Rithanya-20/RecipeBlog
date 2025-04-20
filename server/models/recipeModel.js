const mongoose = require("mongoose")


const RecipeModelSchema = new mongoose.Schema({
    title: String,
    ingredients: Array,
    method: Array,
    imgpath: String,
    tag: Array,
    description: String,
    author:String,
    date:String,
    youtube: String

})

const RecipeModel = mongoose.model("create", RecipeModelSchema)

module.exports = RecipeModel