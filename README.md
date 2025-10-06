# KindnessHub - A React & Manifest Application

Welcome to KindnessHub, a web application designed to be a positive space on the internet. Users can sign up, log in, and share stories of kindness, gratitude, or positive news.

This project is a full-stack application built with React on the frontend and [Manifest](https://www.mnfst.com/) as the exclusive backend solution. All backend operations are handled via the `@mnfst/sdk`.

## Features

- **User Authentication**: Secure signup and login for users.
- **Content Creation**: Authenticated users can create, read, update, and delete their own posts.
- **Public Feed**: All posts are publicly visible to inspire others.
- **Ownership & Policies**: Manifest policies ensure users can only edit their own content.
- **Auto-Generated Admin Panel**: A complete admin dashboard is available to manage users and posts.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    The frontend application will start on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## Accessing the Admin Panel

A powerful, auto-generated admin panel is available to manage all backend data.

-   **URL**: [Access the Admin Panel](${config.BACKEND_URL}/admin)
-   **Default Admin Email**: `admin@manifest.build`
-   **Default Admin Password**: `admin`

From the admin panel, you can manage users, view all posts, and oversee the entire application's data without writing any extra code.
