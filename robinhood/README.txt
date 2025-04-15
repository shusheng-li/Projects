Project Setup Instructions

To set up this project, please follow the steps below:

1. Install Python dependencies using pip:
    ```
    pip3 install -r requirements.txt
    ```

2. Install Node.js using Homebrew:
    ```
    brew install node
    ```

3. If the Node.js installation encounters issues, you may need to perform the following steps:
    - Remove existing Node.js modules:
        ```
        rm -rf node_modules
        ```
    - Reinstall Node.js dependencies using npm:
        ```
        npm install
        ```

4. Install react-router-dom using npm:
    ```
    npm install react-router-dom
    ```

5. Install react-hook-form using npm:
    ```
    npm install react-hook-form
    ```

(To change from online ip to local):
 
 1. Change `http://35.212.230.76/api/' ---> `http://127.0.0.1:50000/api/' 
     for Query.tsx, Buy.tsx, and Portfolio.tsx under robinhood/web/src/pages
 
 2. Change 'app.run(host='0.0.0.0', port=5000)' ---> 'app.run(debug=True)' for main.py
 
 To open backend server and connect to mongoDB:
     ```
     python3 main.py
     ```
 
 To get frontend web client up and running:
     ```
     npm start
     ```
