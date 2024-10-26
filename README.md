# Portfolio Website Backend

This is an Express backend server for my website. It handles form submissions and integrates with Google reCAPTCHA and Nodemailer for email notifications.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd portfolio-website-backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```properties
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    RECAPTCHA_SITE_KEY=your-site-key
    RECAPTCHA_SECRET_KEY=your-secret-key
    ```

## Running the Server

To start the server, run:
```sh
npm start