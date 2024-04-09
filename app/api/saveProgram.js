// pages/api/saveProgram.js
import { connectToDatabase } from "@/lib/database";
import { getSession } from "@clerk/nextjs/api";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getSession(req, res);
      const userId = session.userId;
      const { programId } = req.body;
      
      await connectToDatabase();
      // Logic to save the program to the user's profile

      return res.status(200).json({ message: "Program saved successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error saving program." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
