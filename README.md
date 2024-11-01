
# Lead Management App

## Description
This repository contains the source code for a lead management application, developed as part of a take-home assessment for the Senior Software Engineer position at Freedom Forever LLC. The application manages a large dataset using Laravel for the backend, MySQL for data storage, and a React frontend. Key features include viewing, inserting, updating, and searching records in the dataset.

The application also provides features like Authentication, data caching, filtering with pagination and sorting, and Unit and feature tests to validate application functionality.

## Infrastructure Pre-requisites
To run this application, please ensure you have the following installed:
- **PHP** 8.1
- **Composer** v2
- **Node.js** v20.x.x or higher
- **MySQL**

## Installation

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2: Setup the API Server

1. **Create a MySQL Database**  
   Create a new MySQL database. You may name it as you wish.

2. **Seed the Database**  
   Seed the database with the initial data from the provided dump, which contains:
   - A `leads` table with 1 million test records
   - A `lead_status` table

3. **Configure Database Credentials**  
   Create a .env file
    ```bash
   touch .env
   ```

   Copy and paste content from `.env.example` and Update your database configuration in the `.env` file:
   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=your_database_host
   DB_PORT=your_databse_port
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

5. **Install Backend Dependencies**  
   Navigate to the API directory, install dependencies, and set up the database:
   ```bash
   cd API
   composer install
   ```

6. **Run Migrations**  
   Use the custom migration command:
   ```bash
   php artisan migrate:modular
   ```

7. **Start the API Server**  
   Start the server to serve the API:
   ```bash
   php artisan serve
   ```

### Step 3: Setup the Frontend Server

1. **Navigate to Frontend Directory and Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL**  
   Update `API_URL` in `src/config.js` if your API base URL differs from `http://127.0.0.1:8000/api`.

3. **Start the Frontend Server**  
   ```bash
   npm start
   ```

## Running Feature and Unit Tests

The application includes several unit and feature tests using PHPUnit to validate its functionality.

### Test Configuration

1. **Create a Testing Environment File**  
   Create a `.env.testing` file in the root and add:
   ```plaintext
   DB_CONNECTION=sqlite
   DB_DATABASE=database/testing.sqlite
   ```

2. **Update phpunit.xml Configuration**  
   Uncomment or add the following lines in `phpunit.xml`:
   ```xml
   <env name="DB_CONNECTION" value="sqlite"/>
   <env name="DB_DATABASE" value="database/testing.sqlite"/>
   ```
3. **Create SQLite file**  
   Create a SQLite file at the path as we defined in the above configuration:
   ```bash
   touch database/testing.sqlite
   ```
   
4. **Run the Tests**  
   Execute the following command to run all tests:
   ```bash
   php artisan test
   ```

---
