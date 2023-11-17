// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.YOUR_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_PRIVATE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { data, error } = await supabase.from("products").select("*");
  console.log(data);
  res.status(200).send(JSON.stringify(data, null, 2));
}
