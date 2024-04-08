// // actions/auth.actions.ts
// import User from "../database/models/user.model"  // Adjust the path as necessary to where your User model is located

// export async function fetchAdminStatus(clerkId: string): Promise<{ isUserAdmin: boolean }> {
//   // Check if ADMIN_EMAIL is set in your environment variables
//   const adminEmail = process.env.ADMIN_EMAIL;
//   if (!adminEmail) {
//     console.error("ADMIN_EMAIL is not set in environment variables.");
//     return { isUserAdmin: false };
//   }

//   try {
//     // Find the user in the database by Clerk ID
//     const user = await User.findOne({ clerkId: clerkId }).exec();

//     // Check if the user exists and if their email matches the admin email
//     const isUserAdmin = !!user && user.email === adminEmail;

//     return { isUserAdmin: isUserAdmin };
//   } catch (error) {
//     console.error("Error fetching user from database:", error);
//     return { isUserAdmin: false };
//   }
// }

// actions/auth.actions.ts
import { connectToDatabase } from "../database"; // Assuming this is the function to establish a database connection
import User from "../database/models/user.model"; // Adjust the path as necessary

export const fetchAdminStatusByEmail = async (email:string) => {
    try {
        await connectToDatabase();

        // Assuming you want to check against a list of admin emails, not just one
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",") : [];

        // Locate the user by their email
        const user = await User.findOne({ email }).exec();

        // Check if the user exists and if their email is in the list of admin emails
        const isUserAdmin = user && adminEmails.includes(user.email);

        return {
            isUserAdmin: !!isUserAdmin, // Convert truthy/falsy value to boolean
        };
    } catch (error) {
        console.error("Error fetching admin status by email:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};
