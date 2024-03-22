import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController";

const noteRoute = express.Router();

noteRoute.get("/notes", getNotes);
noteRoute.post("/notes", createNote);
noteRoute.delete("/notes/:id", deleteNote);
noteRoute.patch("/notes/:id", updateNote);

export default noteRoute;
