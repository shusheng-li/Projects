# Project Setup Instructions

This guide provides step-by-step instructions for setting up the backend and frontend of the project locally.

## Backend Setup

1. **Activate the Python Virtual Environment**
   - Navigate to the project root directory and activate the virtual environment:
     ```bash
     source myenv/bin/activate
     ```

2. **Install Python Dependencies**
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```

3. **Run the Backend Server**
   - Start the Flask backend server:
     ```bash
     python main.py
     ```
   - The backend will be available at `http://127.0.0.1:5000`.

## Frontend Setup

1. **Navigate to the Frontend Directory**
   - Change to the `web` directory:
     ```bash
     cd web
     ```

2. **Install Node.js Dependencies**
   - Install the required Node.js packages:
     ```bash
     npm install
     ```

3. **Run the Frontend Development Server**
   - Start the React development server:
     ```bash
     npm start
     ```
   - The frontend will be available at `http://localhost:3000`.

## Testing the Application

1. Open the frontend in your browser at `http://localhost:3000`.
2. The frontend will communicate with the backend running locally at `http://127.0.0.1:5000`.

## Notes

- Ensure both the backend and frontend servers are running simultaneously for the application to work.
- Update any hardcoded API URLs in the frontend to point to `http://127.0.0.1:5000` if necessary.
