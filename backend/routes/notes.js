const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../model/Notes')
const { body, validationResult } = require('express-validator');

//fetching all notes..with port: http://localhost:5000/api/notes/fetchallnotes.... login required...

router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})




//adding notes with port: http://localhost:5000/api/notes/addnote.... login required..

router.post('/addnote',fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res)=>{
     try {
        const {title , description, tag} = req.body;
        const valid = validationResult(req);
        if(!valid.isEmpty()){
           return res.status(400).json({error: valid.array()})
        }
   
        const newnote = new Notes({
            title, 
            description,
            tag,
            user: req.user.id,
        })
        const savenote = await newnote.save()
          res.json(savenote)
     } catch (error) {
        console.error(error)
        res.status(500).send({error:'Internal Server '})
     }
})

//update an existing note by port: http://localhost:5000/api/notes/updatenote...... login required

router.put('/updatenote/:id', fetchuser, async(req, res)=>{
          try {
            const changednote = {} ; 

            const {title, description, tag} = req.body;

            if(title){changednote.title = title}

            if(description){changednote.description = description}

            if(tag){changednote.tag = tag}

            let note = await Notes.findById(req.params.id)
            if(!note){
                return res.status(400).json({error: 'Not Found'})
            }
            if(note.user.toString() !== req.user.id ){
                return res.status(401).json({error: "Not Allowed"})
            }
            note = await Notes.findByIdAndUpdate(req.params.id, {$set : changednote} , {new: true})
            res.json(note)
          } catch (error) {
            console.error(error)
            res.status(500).send("Internal Server Error")
          }
})

//delete an existing note with port : http://localhost:5000/api/notes/deletenote.... login required

router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(400).json({error: 'Not Found'})}
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: 'Not Allowed'})
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json(note)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;