// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.YOUR_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_PRIVATE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      // Aquí va el código para manejar el método GET
      const { data, error } = await supabase.from("loans").select("*");
      console.log(data);
      res.status(200).send(JSON.stringify(data, null, 2));
      break;
    case "POST":
      // Aquí va el código para manejar el método POST
      const { data: postData, error: postError } = await supabase
        .from("loans")
        .insert([
          {
            name: body.name,
            last_name: body.last_name,
            title: body.title,
            loan_date: body.loan_date,
            return_date: body.return_date,
          },
        ]);
      if (postError) {
        console.error(postError);
        return res.status(500).json({ error: postError.message });
      }
      return res.status(200).json("correcto");
      break;
    case "PUT":
      // Aquí va el código para manejar el método PUT
      break;
    case "DELETE":
      const { id } = query;
      if (!id) {
        return res.status(400).json({ error: 'Se requiere el campo "id"' });
      }
      const { data: deleteData, error: deleteError } = await supabase
        .from("loans")
        .delete()
        .match({ id });
      if (deleteError) {
        console.error(deleteError);
        return res.status(500).json({ error: deleteError.message });
      }
      return res.status(200).json("Préstamo eliminado correctamente");
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
