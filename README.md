# EchoPost Setup Instructions

Follow these steps to set up the EchoPost project on your local environment.

---

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Composer**: [Download Composer](https://getcomposer.org/)
- **PHP**: Ensure PHP is installed and properly configured.
- **MySQL**: A MySQL server for the database.

---

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aungthuhein2005/EchoPost.git
   cd EchoPost
   ```

2. **Install Node.js Dependencies**
   ```bash
   npm i
   ```

3. **Install PHP Dependencies**
   ```bash
   composer install
   ```

4. **Create the Database**
   - Log in to your MySQL server:
     ```bash
     mysql -u your_username -p
     ```
   - Create a new database:
     ```sql
     CREATE DATABASE your_database_name;
     ```

5. **Configure Environment Variables**
   - Edit the `.env` file and update the database configuration:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

6. **Run Migrations**
   - Create the database tables:
     ```bash
     php artisan migrate
     ```

7. **Seed the Database** (Optional)
   - Populate the database with initial data:
     ```bash
     php artisan db:seed
     ```

---

## Additional Commands

- **Start the Development Server:**
  ```bash
  php artisan serve
  ```

- **Build Frontend Assets:**
  ```bash
  npm run dev
  ```

---

## Notes

- Ensure the `.env` file is properly configured before running migrations or starting the server.
- For any issues, check the logs in the `storage/logs` directory.

---

Feel free to reach out for further assistance!

