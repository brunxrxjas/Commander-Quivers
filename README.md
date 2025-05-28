# Commander's Quiver

Commander's Quiver is a web application designed to help Magic: The Gathering players manage their Commander decks, track their card collections, and maintain wishlists. It features integration with the Scryfall API for searching and retrieving card information, and user accounts are persistently stored using MongoDB.

This project initially started with a Vanilla JavaScript frontend and has been migrated to use React for improved UI management and component structure, with a Node.js/Express backend.

## Features

* **Deck Management:**
    * Create and delete multiple Commander decks.
    * Assign a specific Commander card to each deck.
    * Add cards to specific categories within a deck (Creatures, Spells, Lands, Artifacts, Planeswalkers).
    * View detailed card lists for each deck.
    * Delete individual cards from decks.
* **Collection Tracking:**
    * Add cards to your personal collection (with image lookup via Scryfall for manual adds).
    * View your collection list with card images.
    * Remove cards from your collection.
* **Wishlist:**
    * Maintain a list of desired cards (with image lookup via Scryfall for manual adds).
    * View your wishlist with card images.
    * Move cards directly from the wishlist to your collection.
    * Remove cards from your wishlist.
* **Card Search:**
    * Search for official Magic: The Gathering cards using the Scryfall API (exact name match).
    * View search results with card images, mana costs, and types.
    * Add cards directly from search results to your decks (including Commander slot), collection, or wishlist.
    * Basic pagination for search results and a "Close Search" option.
* **User Accounts (Persistent):**
    * User registration with email and password (passwords are hashed using `bcryptjs`).
    * User login functionality.
    * User account data is stored persistently in a MongoDB database.
* **Event/Location Management (Basic Manual Entry):**
    * Manually add store locations.
    * Manually add events associated with these locations.
    * Placeholder view for events (full calendar is a future goal).
* **Tutorial:** Includes an introductory video guide on the dashboard.

## Tech Stack

* **Frontend:**
    * React (functional components and Hooks like `useState`, `useEffect`)
    * React Router DOM (for navigation)
    * JavaScript (ES6+)
    * Axios (for API calls)
    * CSS3 (styling adapted from original project)
    * HTML5
* **Backend:**
    * Node.js
    * Express.js
    * Mongoose (ODM for MongoDB)
    * `bcryptjs` (for password hashing)
    * `cors` (middleware for Cross-Origin Resource Sharing)
    * `dotenv` (for environment variable management)
* **Database:**
    * MongoDB (for persistent storage of user account data)
* **External API:**
    * Scryfall API (for MTG card data and images)

## Project Structure

The project is organized into two main parts:

1.  `Commander-Quiver/frontend/` (or your chosen frontend folder name): Contains the React frontend application code (`src/`, `public/`, etc.).
2.  `Commander-Quiver/backend/`: Contains the Node.js/Express backend server code (`server.js`, `app.js`, `routes/`, `controllers/`, `models/`, `config/`).

## Setup and Installation

To run this project locally, you will need Node.js, npm (or yarn), and MongoDB installed and running.

1.  **Clone the Repository:**
    ```bash
    # git clone <your-repo-url>
    # cd <your-repo-directory>
    ```

2.  **MongoDB Setup:**
    * **Option A: Local MongoDB Installation:**
        * Install MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
        * Ensure your MongoDB server (`mongod` service) is running.
    * **Option B: MongoDB Atlas (Cloud):**
        * Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
        * Whitelist your IP address (or `0.0.0.0/0` for development).
        * Create a database user and get your connection string.

3.  **Backend Setup:**
    * Navigate to the backend directory:
        ```bash
        cd Mini-Project3/Backend
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `Commander-Quiver/backend/` directory with your MongoDB connection string and port:
        ```env
        # Commander-Quiver/backend/.env

        # For Local MongoDB (default port)
        MONGO_URI=mongodb://localhost:27017/commanders_quiver

        # OR For MongoDB Atlas (replace with your actual connection string)
        # MONGO_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/commanders_quiver?retryWrites=true&w=majority

        PORT=3001
        # NODE_ENV=development # Optional: set to 'production' when deploying
        ```
        *(Replace `commanders_quiver` with your desired database name if different. For Atlas, replace `<username>`, `<password>`, and `<your-cluster-url>`.)*
    * Start the backend server:
        ```bash
        npm start
        # or node server.js
        ```
        You should see "MongoDB Connected: <your_host>" and "Server is running on port 3001" in the console. Keep this terminal window open.

4.  **Frontend Setup:**
    * Open a **new terminal window**.
    * Navigate to the frontend directory:
        ```bash
        cd ../frontend
        # Or adjust path if your frontend folder is elsewhere relative to the root
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```
    * Start the React development server (it typically runs on `http://localhost:3000` or similar):
        ```bash
        npm start
        # or if using Vite: npm run dev
        ```

5.  **Access the Application:** Open your web browser and navigate to the frontend development server's address (e.g., `http://localhost:3000`).

## Key Concepts & Notes

* **CORS:** The backend uses the `cors` middleware to allow requests from the frontend development server running on a different port.
* **State Management:** The React frontend primarily uses component state (`useState`) and prop drilling. Shared state (decks, collection, wishlist, events, locations) is managed in the `DashboardPage` component.
* **Data Persistence:**
    * **User Accounts:** User registration and login data (emails, hashed passwords) are now **persistently stored** in a MongoDB database using Mongoose.
    * **Application Data (Decks, Collection, etc.):** Data for decks, collections, wishlists, events, and locations is currently managed in **frontend React state** and is **lost** when the browser session ends or the page is refreshed. Implementing backend APIs and database schemas for this data is a key area for future improvement.
* **Password Hashing:** User passwords are hashed using `bcryptjs` on the backend before being stored in MongoDB, enhancing security.

## Future Improvements

* **Full Data Persistence:** Implement backend APIs and MongoDB schemas to persistently store user-specific decks, collections, wishlists, events, and locations.
* **Secure Session Management:** Implement JWT (JSON Web Tokens) or robust session management for user authentication.
* **Functional Friends/Sharing System:** Develop the backend logic for friend relationships and data sharing.
* **Advanced Deck/Collection Features:**
    * Detailed card variant tracking (set, foil, condition).
    * Advanced filtering and sorting options.
    * Deck statistics (mana curve, color distribution).
* **Import/Export Decklists:** Allow users to import/export in common formats.
* **Enhanced Event Calendar:** Integrate a full-featured calendar library and explore possibilities for automated event aggregation (if feasible APIs are found).
* **Card Pricing Integration.**
* **Testing:** Add unit and integration tests.
* **Deployment:** Prepare for deployment to cloud hosting services.

