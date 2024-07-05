const { Schema,model } = require('mongoose')

const BlogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },coverImageUrl:{
        type:String
    },createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Blog= model('blog',BlogSchema)

module.exports = Blog