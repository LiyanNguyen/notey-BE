import { app } from "..";
import request from "supertest";

describe("notes API", () => {
  let testObjectId: string;

  it("GET", async () => {
    const res = await request(app).get("/notes?color=all&rating=ascending");
    expect(res.status).toEqual(200);
  });

  it("POST - error (missing input)", async () => {
    const res = await request(app).post("/notes").send({
      title: "this will not be posted",
      // missing description
      rating: 5,
      color: "red",
    });

    expect(res.status).toEqual(400);
    expect(res.body.title === "dev test title");
  });
  

  it("POST - error (wrong input)", async () => {
    const res = await request(app).post("/notes").send({
      title: "this will not be posted",
      description: "this should not be created in the DB",
      rating: 25, //over 10 rating - error
      color: "red",
    });

    expect(res.status).toEqual(400);
    expect(res.body.title === "dev test title");
  });

  it("POST", async () => {
    const res = await request(app).post("/notes").send({
      title: "dev test title",
      description: "this is coming from dev test",
      rating: 5,
      color: "blue",
    });

    expect(res.status).toEqual(200);
    expect(res.body.title === "dev test title");

    // get the id of the object we created in this test
    // well use the same object to patch and delete
    testObjectId = res.body._id;
  });

  it("PATCH", async () => {
    const res = await request(app).patch(`/notes/${testObjectId}`).send({
      title: "EDITED dev test title",
      description: "edited! this is coming from dev test",
      rating: 10,
      color: "red",
    });

    expect(res.status).toEqual(200);
  });

  it("PATCH - error (missing input)", async () => {
    const res = await request(app).patch(`/notes/${testObjectId}`).send({
      title: "EDITED dev test title",
      description: "edited! this is coming from dev test",
      // missing rating
      color: "red",
    });

    expect(res.status).toEqual(400);
  });

  it("DELETE", async () => {
    const res = await request(app).delete(`/notes/${testObjectId}`);

    expect(res.status).toEqual(200);
    expect(res.body.title === "EDITED dev test title");
  });
});

