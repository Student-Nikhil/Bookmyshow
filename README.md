# 🎬 BookMyShow — Movie Ticket Booking Platform

A modern, responsive, full-stack movie ticket booking application built as a capstone project. The application allows users to select movies, choose available show slots, select seats, and complete a booking through an interactive and responsive interface.

The project focuses on applying real-world full-stack development concepts including **React, Node.js, Express, MongoDB, REST APIs, responsive UI design, state persistence, dark/light themes, animations, and deployment**.

---

## ✨ Features

### 🎥 Movie Selection

* Browse available movies through an interactive movie selection interface.
* Visual selection state for the currently selected movie.
* Responsive movie cards across desktop, tablet, and mobile devices.

### 🕐 Show Slot Selection

* Select from available movie show timings.
* Clear visual indication of the selected time slot.
* Easy-to-use responsive layout.

### 💺 Seat Selection

* Interactive seat selection system.
* Supports seat types:

  * A1
  * A2
  * B1
  * B2
  * C1
  * C2
  * D1
  * D2
* Seat quantities can be entered individually.
* Booking validation ensures that at least one seat is selected.

### 🎟️ Booking System

* Complete movie booking workflow.
* Client-side validation before booking.
* Booking data is sent to the backend through a REST API.
* Successful bookings are displayed in the **Last Booking Details** section.
* Previous booking information can be retrieved from the backend.

### 🌗 Light & Dark Mode

* Fully supported light and dark themes.
* Theme preference is preserved using browser storage.
* UI components automatically adapt to the selected theme.

### 💾 Persistent Selection

User selections are preserved using `localStorage`, allowing the following data to survive page refreshes:

* Selected movie
* Selected show slot
* Selected seats

### ✨ Animations & UI Effects

The application includes modern visual interactions such as:

* Animated background
* Staggered movie-card animations
* Seat selection animations
* Ticket-drop animation
* Toast notifications
* Smooth transitions
* Interactive hover effects

The application also respects the user's **reduced-motion preference**.

### 📱 Fully Responsive

Designed to work across:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet
* Large and small screen sizes

The desktop interface uses a multi-column layout, while smaller screens automatically switch to a single-column responsive layout.

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* JavaScript
* HTML5
* CSS3
* LocalStorage
* REST API integration

## Backend

* **Node.js**
* **Express.js**
* REST API

## Database

* **MongoDB**
* **Mongoose**

## Development Tools

* npm
* Git
* GitHub
* Vite / React development tooling
* MongoDB / MongoDB Atlas

## Deployment

* **Vercel** — Frontend
* **Render** — Backend
* **MongoDB Atlas** — Database

---

# 🏗️ Project Architecture

```text
Bookmyshow/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── data.js
│   │   └── ...
│   │
│   ├── package.json
│   └── vercel.json
│
├── server/
│   ├── connection.js
│   ├── Schema.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Workflow

```text
              ┌─────────────────┐
              │   Open Website  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Select a Movie  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Select Show Time│
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Select Seats   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Validate Booking│
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ POST /api/booking│
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ MongoDB Storage │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Booking Details │
              └─────────────────┘
```

---

# 🔌 API Documentation

## Create Booking

### `POST /api/booking`

Creates a new movie booking.

### Request

```json
{
  "movie": "Movie Name",
  "slot": "7:00 PM",
  "seats": {
    "A1": 2,
    "A2": 0,
    "B1": 0,
    "B2": 1,
    "C1": 0,
    "C2": 0,
    "D1": 0,
    "D2": 0
  }
}
```

### Response

```json
{
  "message": "Booking successful"
}
```

---

## Get Previous Booking

### `GET /api/booking`

Returns the most recent booking.

### Example Response

```json
{
  "movie": "Movie Name",
  "slot": "7:00 PM",
  "seats": {
    "A1": 2,
    "A2": 0,
    "B1": 0,
    "B2": 1,
    "C1": 0,
    "C2": 0,
    "D1": 0,
    "D2": 0
  }
}
```

If no booking exists:

```json
{
  "message": "no previous booking found"
}
```

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Navigate into the project:

```bash
cd Bookmyshow
```

---

## 2. Start MongoDB

Make sure MongoDB is running locally or configure your MongoDB Atlas connection.

For a local MongoDB installation, the default connection is generally:

```text
mongodb://localhost:27017
```

---

# 🖥️ Run the Backend

Open a terminal inside the project directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:8080
```

API endpoint:

```text
http://localhost:8080/api/booking
```

---

# 🌐 Run the Frontend

Open a **new terminal**.

Navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open the application in your browser:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

For production deployment, configure the required environment variables on your hosting provider.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> Never commit `.env` files or database credentials to GitHub.

---

# ☁️ Deployment

The project can be deployed using a modern full-stack deployment architecture.

### Frontend

```text
React Application
       ↓
    Vercel
```

### Backend

```text
Node.js + Express
       ↓
    Render
```

### Database

```text
MongoDB
       ↓
 MongoDB Atlas
```

### Production Architecture

```text
             ┌──────────────┐
             │    User      │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │   Vercel     │
             │   Frontend   │
             └──────┬───────┘
                    │
                    │ REST API
                    ▼
             ┌──────────────┐
             │    Render    │
             │   Backend    │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ MongoDB Atlas│
             │   Database   │
             └──────────────┘
```

---

# 🧪 Validation & Error Handling

The application performs validation before creating a booking.

A booking requires:

* A movie to be selected
* A show slot to be selected
* At least one seat to be selected

Invalid submissions display an appropriate error message instead of sending an incomplete request to the server.

The backend also validates incoming booking data before storing it in MongoDB.

---

# 📱 Responsive Design

The UI has been designed with a responsive-first approach.

### Desktop

```text
┌───────────────┬───────────────┐
│    Movies     │     Slots     │
│               │               │
├───────────────┴───────────────┤
│           Seats               │
└───────────────────────────────┘
```

### Mobile

```text
┌───────────────────┐
│      Movies       │
├───────────────────┤
│       Slots       │
├───────────────────┤
│       Seats       │
├───────────────────┤
│      Booking      │
└───────────────────┘
```

The layout automatically adapts based on screen size.

---

# 🎨 UI & UX Highlights

The application was designed with an emphasis on modern user experience.

### Visual Design

* Clean modern interface
* Responsive layout
* Light and dark themes
* Interactive cards
* Clear selection states
* Toast notifications
* Smooth transitions
* Animated interactions
* Accessible visual feedback

### User Experience

* Minimal steps to complete a booking
* Clear validation messages
* Persistent selections
* Mobile-friendly controls
* Keyboard-friendly form controls
* Reduced-motion support

---

# 🔒 Security Considerations

The project follows basic full-stack security practices:

* Environment variables for sensitive configuration
* Database credentials are not stored in source code
* Server-side request validation
* `.gitignore` protection for sensitive files
* API validation before database operations

For a production system, additional protections such as authentication, authorization, rate limiting, input sanitization, HTTPS, and secure HTTP headers should also be implemented.

---

# 📚 Learning Outcomes

This capstone project demonstrates practical understanding of:

* React application development
* Component-based UI architecture
* Responsive web design
* REST API development
* Express.js backend development
* MongoDB database integration
* CRUD-style API operations
* Client-server communication
* Browser local storage
* Form validation
* Error handling
* Theme management
* CSS animations
* Git and GitHub workflow
* Full-stack application deployment

---

# 🚧 Future Improvements

The application can be extended with additional production-level features:

* 🔐 User authentication
* 👤 User profiles
* 🎫 Digital movie tickets
* 💳 Online payment integration
* 🪑 Real-time seat availability
* 🔔 Email booking confirmation
* 📧 Booking confirmation emails
* 🔎 Movie search
* 🎞️ Movie details and trailers
* ⭐ Movie ratings and reviews
* 📍 Theatre/location selection
* 🏢 Multiple theatres
* 📊 Admin dashboard
* 📈 Booking analytics
* 🧾 Downloadable ticket PDFs
* 🔄 Real-time booking updates

---

# 👨‍💻 Author

**Nikhil Patil**

Full-Stack Developer | MERN Stack Enthusiast

### Connect With Me

* GitHub: `https://github.com/Student-Nikhil`
* LinkedIn: `https://www.linkedin.com/in/nikhil-patil-b49076407/`

---

# ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project was created for educational and portfolio purposes.
