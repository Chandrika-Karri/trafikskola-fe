# Trafikskola Frontend

This is the frontend part of my Trafikskola project.  
It was built with React to practice building a real web user interface for a driving school app.

The frontend connects to a backend API (Spring Boot) to show and manage data.

---

## 🧠 What this project does

This project provides a user interface to interact with the Trafikskola backend.

With this frontend you can:

- Load and view data from the backend
- Interact with the API
- Practice frontend logic using React
- See how a real web app talks to a backend

This project was tested locally and is meant as a learning project.

---

## 📦 Tech Stack

- React (created with Create React App)  
- JavaScript (React components, state, routing)  
- CSS (basic styles)  
- Fetch API (to communicate with the backend)

If you look at `package.json`, you’ll see all the libraries and scripts used. :contentReference[oaicite:2]{index=2}

---

## 🖼 Project Structure (simplified)

public/ # Static files like index.html
src/
├── components/ # React UI components
├── pages/ # Pages / views
├── App.js # Main app entry
├── index.js # App bootstrapping
package.json # Project config


---

## 🚀 How to run locally

To use this frontend on your machine:

### 1. Clone the repo
```bash
git clone https://github.com/Chandrika-Karri/trafikskola-fe.git

2. Install dependencies
Change into the project folder:
cd trafikskola-fe
npm install

3. Start the app
npm start

This will:
Start the React app in development mode
Open it in your browser
Reload on code changes
Go to:
http://localhost:3000

Your browser should show the web interface and you can interact with it.

**🛠 What I learned**
While working on this frontend, I practiced:
Building React components
Using the React Router for navigation (if used)
Connecting the UI to a backend API
Handling data fetching and rendering
Structuring a React project for clarity

