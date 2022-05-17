const Notes = require("../models/notesModel");

const getAllNotes = async (req, res) => {

    const filter = {};
	const allNotes = await Notes.find(filter);

	res.status(200).json(allNotes)
}

const getUserNote = async (req, res) => {
    const userId = req.user._id
    const notes = await Notes.find({ user: userId });

	res.status(200).json(notes)
}

const getNotesById = async (req, res) => {
    const {id} = req.body
    const note = await Notes.findOne({ _id: id });

	res.status(200).json(note)
}

const createNote = async (req, res) => {
    const { title, description } = req.body

    if (!title || !description) {
        res.status(400)
        throw new Error ("All fields are required!")
        return
    } else {
        let newNote = new Notes ({ title, description, user : req.user._id })
        const createdNote = await newNote.save();

        res.status(201).json(createdNote);
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.body

    let note = await Notes.findById(id)

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error ('You are not allowed to delete')
        return
    } 
    if (note) {
        await note.remove();
        res.status(200).json({ sucess : true })
    } else {
        res.status(404);
        throw new Error("Note not Found");
    }


}

const updateNote = async (req, res) => {
    const { title, description, id  } = req.body;

    const note = await Note.findById(id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      note.title = title;
      note.description = description;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
}

module.exports = { getAllNotes, getUserNote, getNotesById, createNote, deleteNote, updateNote };