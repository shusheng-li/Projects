Project Setup Instructions

To set up this project, please follow the steps below:

1. Install Python dependencies using pip:
    ```
    pip3 install -r requirements.txt
    ```

2. Upgrade yfinance and ensure no caching:
    ```
    pip3 install yfinance --upgrade --no-cache-dir
    ```

3. Install Node.js using Homebrew:
    ```
    brew install node
    ```

4. If the Node.js installation encounters issues, you may need to perform the following steps:
    - Remove existing Node.js modules:
        ```
        rm -rf node_modules
        ```
    - Reinstall Node.js dependencies using npm:
        ```
        npm install
        ```

5. Install react-router-dom using npm:
    ```
    npm install react-router-dom
    ```

6. Install react-hook-form using npm:
    ```
    npm install react-hook-form
    ```

Once you've completed these steps, you should be all set up and ready to work on the project.

To open backend server and connect to mongoDB:
    ```
    python3 main.py
    ```

To get frontend web client up and running:
    ```
    npm start
    ```
