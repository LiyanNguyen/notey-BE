import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  description: string;
  rating: number;
  color: "blue" | "red" | "yellow" | "green" | "slate";
}

export interface INoteQuery extends Omit<INote, "color" | "rating"> {
  color: INote["color"] | "all";
  rating: "ascending" | "descending";
  search?: string;
  page?: number;
  limit?: number;
}

const NoteSchema: Schema<INote> = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 150,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    color: {
      type: String,
      required: true,
      enum: ["blue", "red", "yellow", "green", "slate"],
    },
  },
  {
    timestamps: true,
  }
);

export const NoteModel =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
