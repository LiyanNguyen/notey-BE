import { faker } from "@faker-js/faker";
import { NoteModel } from "../models/noteModel";

const allowedColors = ["blue", "red", "yellow", "green", "slate"];

export const seedFakeData = async (count: number) => {
  try {
    const fakeNotes = [];
    for (let i = 0; i < count; i++) {
      const title = faker.lorem.words(2);
      const description = faker.lorem.sentence();
      const rating = faker.number.int({ min: 1, max: 10 });
      const color = allowedColors[Math.floor(Math.random() * allowedColors.length)];

      fakeNotes.push({ title, description, rating, color });
    }
    await NoteModel.insertMany(fakeNotes);
    console.log("Fake data seeded successfully");
  } catch (error) {
    console.error("Error seeding fake data:", error);
  }
};
