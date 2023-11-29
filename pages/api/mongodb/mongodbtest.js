import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const books = db.collection("books");

  switch (method) {
    case "POST":
      const dataBook = {
        title: body.title,
        author: body.author,
        genre: body.genre,
        publication_date: body.publication_date,
      };
      try {
        const answer = await books.insertOne(dataBook);
        return res.status(200).json({ message: "Se añadió con éxito" });
      } catch (error) {
        return res.status(500).json({ message: "Algo falló" });
      }
      break;
    case "GET":
      const result = await books.find().toArray();
      return res.status(200).json(result);
      break;
  }
}
