// import { protect } from "../middlewares/authMiddleware";
const {protect} = require('../middlewares/authMiddleware')
const express = require("express");
const { getAllNotes, getUserNote, getNotesById, createNote, deleteNote, updateNote, aggregationMethod } = require("../controllers/notesController");

const router = express.Router();

router.route("/all").get(getAllNotes);
router.route("/aggregation").post(aggregationMethod);
router.route("/create").post(protect, createNote);
router.route("/delete").post(protect, deleteNote);
router.route("/update").post(protect, updateNote);
router.route("/one-note").get(getNotesById);
router.route("/notes").get(protect, getUserNote)

module.exports = router;
