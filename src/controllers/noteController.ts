import express from "express";
import { NoteType, NoteModel } from "../models/noteModel";

export const getNotes = async (_: express.Request, res: express.Response) => {
  try {
    const users = await NoteModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, description, rating, color }: NoteType = req.body;

    if (!title || !description || !rating || !color) {
      return res.sendStatus(400);
    }

    const createdNote = await NoteModel.create({
      title,
      description,
      rating,
      color,
    });

    return res.status(200).json(createdNote).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedNote = await NoteModel.findOneAndDelete({ _id: id });

    return res.status(200).json(deletedNote).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, description, rating, color }: NoteType = req.body;

    if (!title || !description || !rating || !color) {
      return res.sendStatus(400);
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rating,
        color,
      },
      { runValidators: true }
    );

    return res.status(200).json(updatedNote).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
