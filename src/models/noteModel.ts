import mongoose from "mongoose";

export type NoteType = {
  title: string;
  description: string;
  createdAt?: Date;
  upddatedAt?: Date;
  rating: number;
  color: "blue" | "red" | "yellow" | "green" | "slate";
};

export type NoteQueryType = {
  rating: "ascending" | "descending";
  color: "blue" | "red" | "yellow" | "green" | "slate" | "all";
  search: string;
};

const NoteSchema = new mongoose.Schema(
  {
    title: { required: true, type: String, minlength: 5, maxlength: 25 },
    description: { required: true, type: String, minlength: 5, maxlength: 150 },
    rating: { required: true, type: Number, min: 1, max: 10 },
    color: {
      required: true,
      type: String,
      enum: ["blue", "red", "yellow", "green", "slate"],
    },
  },
  { timestamps: true }
);

export const NoteModel = mongoose.model("Note", NoteSchema);
