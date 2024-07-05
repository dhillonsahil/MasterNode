const {Router} = require('express');
const router = Router();
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog')
const Comment = require('../models/comment')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //   cb(null, path.resolve(`./public/uploads/${req.user._id}`))
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName =`${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })

  const upload = multer({ storage: storage });
  

router.get('/add-new',(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
})

router.post("/",upload.single("coverImage"),async (req,res)=>{
     const {title,content}= req.body;
    const blog = await Blog.create({
        content:content,
        title:title,
        coverImageUrl:`/uploads/${req.file.filename}`,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.post("/comment/:blogId",async (req,res)=>{
   await Comment.create({
    content:req.body.content,
    createdBy:req.user._id,
    blogId:req.params.blogId
  })

  return res.redirect(`/blog/${req.params.blogId}`)
})

router.get("/:id",async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("Blog",{
        blog:blog,
        user:req.user,
        comments:comments
    })
})


module.exports=router;