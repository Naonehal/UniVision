# UniVision

Welcome to UniVision, a comprehensive platform designed to help you navigate the world of university programs. Effortlessly explore a vast array of offerings, compare programs side-by-side, and find the perfect fit for your academic journey. Whether you're seeking undergraduate, graduate, or professional programs, UniVision has you covered.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Key Technologies](#key-technologies)
- [Database](#database)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Program Discovery**: Browse through a wide variety of university programs.
- **Detailed Program Information**: Access comprehensive details about each program, including course requirements, admission criteria, tuition fees, and more.
- **Program Comparison**: Compare multiple programs side-by-side to evaluate their offerings.
- **User Profiles**: Manage saved programs.
- **Search and Filtering**: Use keywords and university filters to find programs that match your interests.
- **Admin Panel**: Add, update, and delete university programs.
- **Responsive Design**: Enjoy a seamless experience on various devices.
- **Image Upload**: Programs can include images.

## Getting Started

Follow these instructions to get UniVision up and running on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

-   **Node.js** (v18 or higher)
-   **npm** or **yarn** (package manager)
-   **MongoDB** (set up a local MongoDB instance or use a cloud-based service)
-   **Clerk Account**: For user authentication.
-   **UploadThing Account**: For file uploading.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone (https://github.com/Naonehal/UniVision.git)
    cd UniVision
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    - Create a `.env.local` file in the root directory.
    - Add the following variables, replacing the placeholders with your actual values:
        ```env
        MONGODB_URI='your_mongodb_uri'
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY='your_clerk_publishable_key'
        CLERK_SECRET_KEY='your_clerk_secret_key'
         NEXT_PUBLIC_UPLOADTHING_URL= 'your_uploadthing_url'
        UPLOADTHING_SECRET='your_uploadthing_secret'
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/profile"
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/profile"
        ```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 in your browser to view the application.

License
This project is licensed under the MIT License.


That should provide a comprehensive overview of the project. Let me know if you would like any modifications or further improvements! I'm here to help. 😊
