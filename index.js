const express = require('express');
const app=express()
const port =process.env.PORT||5000
const connectDB=require('./connectDB/connectDB')
const Contact =require('./models/user')
const router = express.Router()
app.use('/api',router)
router.use(express.json())

router.get('/Contact',async(req,res)=>{
    try {
        const data=await Contact.find().exec()
        res.status(200).json({"contact":data})
    } catch (error) {
        res.status(504).json({"msg":error})
    }
})

router.delete('/Contact/:id',(req,res)=>{
    Contact.findByIdAndRemove(req.params.id,(err)=>{
        err? res.status(504).send(err):res.status(200).send('contact deleted')
    })
})
router.put('/Contact/:id',async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const {name} = req.body;
    console.log(name)
    try {
        await Contact.findByIdAndUpdate({_id:id},{$set:{name:name}})
        res.status(200).send({msg:"data updated...."})
    } catch (error) {
        res.status(500).send({msg:"server error"})
        console.log(error)
    }
})
router.post('/Contact',async(req,res)=>{
    try {
        console.log(req.body)
        const {name} = req.body ; 
        const newName = new Contact({name});
        const contact  = await newName.save();
        res.status(200).send({msg:"user added",todo:contact})
    } catch (error) {
        res.send('server error')
        console.log(error)
    }
    })
connectDB()

app.listen(5000,err=>err?console.log('error',err):console.log(`server is runnig on port ${port}`))