## Installation

1. **Clone the Repository**:
   git clone <repository-url>

2. **Install Dependencies**:
   npm install

3. **Create a `.env` File**:
   Create a `.env` file in the root directory of the project, with the following contents:
   MONGO_URI=mongodb://localhost:27017/my_database
   PORT=5000
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password

   - **MONGO_URI**: The connection string for your MongoDB instance.
   - **PORT**: The port on which the server will run.
   - **JWT_SECRET**: Secret key for JWT signing.
   - **EMAIL_USER**: Your email address for sending confirmation emails.
   - **EMAIL_PASS**: The password for your email account.

## Running the Application

1. **Compile TypeScript to JavaScript**:
   npm run build

2. **Start the Server**:
   npm start

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in with email and password.
- **POST /api/auth/confirm**: Confirm user email using a code.
- **POST /api/auth/logout**: Log out (requires JWT token).

### Garage Management

- **GET /api/garages?type=all**: Fetch all garages from both external API and MongoDB.
- **GET /api/garages?type=limit&limit=10**: Fetch a limited number of garages.
- **POST /api/garages**: Add a new garage to the database (requires JWT token).
