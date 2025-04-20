const express = require("express")
const router = new express.Router()
const multer = require("multer")
const RegisterModel = require('./../models/Register')
const RecipeModel = require('./../models/recipeModel')

const imgconfig = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, "./uploads")
    },
    filename:(req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith("image")){
        callback(null, true)
    }else{
        callaback(new Error("only image is allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

router.post("/create", upload.single("photo"), async(req, res)=>{
    const {title} = req.body
    const {ingredients} = req.body
    const {method} = req.body
    const {tag} = req.body
    const {filename} = req.file
    const {description} = req.body
    const {author} = req.body
    const {date} = req.body
    const {youtube} = req.body

    if(!title || !ingredients){
        res.status(401).json({status:401,
            message:"fill all the data"
        })
    }

    try{
        const recipedata = new RecipeModel({
            title: title,
            ingredients: ingredients,
            method: method,
            tag: tag,
            imgpath:filename,
            description: description,
            author:author,
            date:date,
            youtube:youtube
        })

        const finaldata = await recipedata.save()
        res.status(201).json({status:201, finaldata})
    }catch(err){
        res.status(401).json({status:401, err})
    }
})


router.get("/recipe", async(req, res) => {
    // RecipeModel.find()
    // .then(recipe => res.json(recipe))
    // .catch(err => res.json(err))

    try{const getRecipe = await RecipeModel.find()

    res.status(201).json({status:201, getRecipe})}
    catch(err){
        res.status(401).json({status:401, err})
    }
})

router.post("/search", async(req, res) => {

    const {query} = req.body

    console.log(query);
    

    if(!query) return res.json([])
     
    const regex = new RegExp(query, 'i')
    try{


        const filter = {
            $or: [
                {title: regex},
                {author:regex},
                {tag: {$regex: regex}}
            ]
        }
    //   const {title, tag, author} = req.query

    //   let filter = {}

    //   if(title){
    //     filter.title = {$regex: title, $options: 'i'}

    //   }

    //   if(tag){
    //     filter.tag = { $regex: tag, $options: 'i' };
    //   }


    //   if(author) {
    //     filter.author = {$regex: author, $options: 'i'}
    //   }

      const recipes = await RecipeModel.find(filter)


      res.json(recipes)

    //   res.json({
    //     success: true,
    //     recipes,
    // })



    }catch (err){
       res.status(500).json({
        status: 'fail',
        message: err.message
       })
    }
})

router.get("/recipepage/:id", async(req, res) => {
    const {id} = req.params;
    const recipeById = await RecipeModel.findById(id)

    res.json({
        success: true,
        recipeById,
    })
})


router.post("/login", (req, res) => {
    const {email, password} = req.body
    RegisterModel.findOne({email, email})
    .then(user => {
        if(user) {
            if(user.password == password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

router.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email:email})
    .then(user => {
        if(user){
            res.json("Already have an account")
        } else{
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json("Account created"))
            .catch(err => res.json("Error")) 
        }
    })
    .catch(err => res.json(err))

})


module.exports = router