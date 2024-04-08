import { fetchAdminStatusByEmail } from "@/lib/actions/auth.actions"; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body; // Expecting the email to be sent directly in the request body

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    try {
      const { isUserAdmin } = await fetchAdminStatusByEmail(email);
      res.status(200).json({ isUserAdmin });
    } catch (error) {
      console.error('Failed to fetch admin status by email', error);
      res.status(500).json({ error: 'Failed to determine admin status by email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
