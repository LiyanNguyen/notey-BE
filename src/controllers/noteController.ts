import express from "express";
import { NoteType, NoteQueryType, NoteModel } from "../models/noteModel";

export const getNotes = async (req: express.Request, res: express.Response) => {
  try {
    const {
      color,
      rating,
      search,
      page = 1,
      limit = 12,
    } = req.query as unknown as NoteQueryType;
    const skip = (page - 1) * limit;

    const query = {
      ...(color !== "all" && { color: color }),
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const notes = await NoteModel.find(query)
      .sort({ rating: rating })
      .skip(skip)
      .limit(limit);
    return res.status(200).json(notes);
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
