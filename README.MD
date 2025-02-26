# 🏢 Apartment Management System  

A full-stack MERN application for managing apartments, rooms, and items in a nested hierarchy. It provides CRUD functionality with a clean, responsive user interface.

Check it out here: [https://apartments-frontend.onrender.com/](https://apartments-frontend.onrender.com/)

---

## 🚀 Features  
- **Nested Data Management:**  
  - **Apartments** → **Rooms** → **Items**  
- **CRUD Operations:**  
  - Create, Read, Update, and Delete Apartments, Rooms, and Items  
- **Responsive Design:**  
  - Clean and minimalistic UI with light/dark themes  
- **Form Validation:**  
  - Using React Hook Form and Yup for robust validation  
- **Nested Routing:**  
  - Seamless navigation between Apartments, Rooms, and Items  
- **State Management:**  
  - Using React hooks and Axios for API calls  

---

## 🛠️ Tech Stack  
### Frontend:  
- **React** (TypeScript, Vite)  
- **TailwindCSS** with **ShadCN** for styling  
- **Axios** for API integration  
- **React Router** for navigation  
- **React Hook Form** & **Yup** for form handling and validation  

### Backend:  
- **Node.js** and **Express** for REST API  
- **MongoDB** with **Mongoose** for database management  
- **CORS** and **dotenv** for configuration and security  

---

## 📂 Folder Structure  
```
root  
│   README.md  
│   .env (create manually)  
│  
├── client (Frontend)  
│   ├── public  
│   └── src 
|       ├── api
|       |   ├──axios.ts
├       |── context
|       |   FormContext.tsx
│       ├── pages  
│       │   ├── ApartmentForm.tsx
│       │   ├── HomePage.tsx  
│       │   ├── InventoryEdit.tsx  
│       │   └── InventoryReview.tsx    
│       ├── App.tsx  
│       └── main.tsx  
│  
└── server (Backend)  
    ├── config  
    │   └── db.js  
    ├── controllers  
    │   ├── apartmentController.js  
    │   ├── roomController.js  
    │   └── itemController.js  
    ├── models  
    │   ├── Apartment.js  
    │   ├── Room.js  
    │   └── Item.js  
    ├── routes  
    │   ├── apartment.js  
    │   ├── room.js  
    │   └── item.js  
    └── index.js  
```

---

## ⚙️ Installation and Setup  
### Prerequisites:  
- **Node.js** and **npm** installed  
- **MongoDB** running locally or a MongoDB Atlas account  

### Clone the Repository:  
```bash
git clone https://github.com/kaushiktak19/ams.git
cd ams
```

### Backend Setup:  
1. Navigate to the backend directory:  
```bash
cd server
```

2. Install dependencies:  
```bash
npm install
```

3. Create a `.env` file:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Start the backend server:  
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`.  

---

### Frontend Setup:  
1. Navigate to the frontend directory:  
```bash
cd ../client
```

2. Install dependencies:  
```bash
npm install
```

3. Create a `.env` file:  
```
BACKEND_URL=http://localhost:5000/
```

4. Start the frontend:  
```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`.  

---

## 📖 **API Documentation**

### **1. Apartment APIs**  
Base URL: `/api/apartments`

- **GET /** - Get all apartments  
  - **Description**: Fetches a list of all apartments.  
  - **Response**: `200 OK` - Array of apartment objects  

- **GET /:id** - Get apartment by ID  
  - **Description**: Fetches details of an apartment by its ID.  
  - **Params**:  
    - `id` (String) - Apartment ID  
  - **Response**: `200 OK` - Apartment object  

- **POST /** - Add new apartment  
  - **Description**: Creates a new apartment with rooms and items.  
  - **Request Body**:  
    ```json
    {
      "address": "123 Main St",
      "stairsOrElevator": "Elevator",
      "floor": 5,
      "size": 1200,
      "rooms": [
        {
          "name": "Living Room",
          "items": [
            { "name": "Sofa", "width": 200, "height": 90, "length": 100 }
          ]
        }
      ]
    }
    ```
  - **Response**: `201 Created` - Created apartment object  

- **PUT /:id** - Edit apartment  
  - **Description**: Updates details of an apartment.  
  - **Params**:  
    - `id` (String) - Apartment ID  
  - **Request Body**: Same as POST  
  - **Response**: `200 OK` - Updated apartment object  

---

### **2. Room APIs**  
Base URL: `/api/apartments/:apartmentId/rooms`

- **GET /** - Get all rooms in an apartment  
  - **Description**: Fetches all rooms for a specific apartment.  
  - **Params**:  
    - `apartmentId` (String) - Apartment ID  
  - **Response**: `200 OK` - Array of room objects  

- **GET /:roomId** - Get room by ID  
  - **Description**: Fetches details of a room by its ID.  
  - **Params**:  
    - `roomId` (String) - Room ID  
  - **Response**: `200 OK` - Room object  

- **POST /** - Add room to an apartment  
  - **Description**: Creates a new room within an apartment.  
  - **Request Body**:  
    ```json
    {
      "name": "Bedroom",
      "items": [
        { "name": "Bed", "width": 180, "height": 60, "length": 200 }
      ]
    }
    ```
  - **Response**: `201 Created` - Updated apartment object  

- **PUT /:roomId** - Edit room  
  - **Description**: Updates a room's details.  
  - **Params**:  
    - `roomId` (String) - Room ID  
  - **Request Body**: Same as POST  
  - **Response**: `200 OK` - Updated apartment object  

---

### **3. Item APIs**  
Base URL: `/api/apartments/:apartmentId/rooms/:roomId/items`

- **GET /** - Get all items in a room  
  - **Description**: Fetches all items within a specific room.  
  - **Params**:  
    - `roomId` (String) - Room ID  
  - **Response**: `200 OK` - Array of item objects  

- **GET /:itemId** - Get item by ID  
  - **Description**: Fetches details of an item by its ID.  
  - **Params**:  
    - `itemId` (String) - Item ID  
  - **Response**: `200 OK` - Item object  

- **POST /** - Add item to a room  
  - **Description**: Adds a new item to a room within an apartment.  
  - **Request Body**:  
    ```json
    {
      "name": "Chair",
      "width": 50,
      "height": 100,
      "length": 50
    }
    ```
  - **Response**: `201 Created` - Updated apartment object  

- **PUT /:itemId** - Edit item  
  - **Description**: Updates an item's details.  
  - **Params**:  
    - `itemId` (String) - Item ID  
  - **Request Body**: Same as POST  
  - **Response**: `200 OK` - Updated apartment object  

---

## 📘 **Schema Documentation**

### **Apartment Schema**  
```js
const apartmentSchema = new mongoose.Schema({
  address: { type: String, required: true },
  stairsOrElevator: { type: String, required: true },
  floor: { type: Number, required: true },
  size: { type: Number, required: true },
  rooms: [roomSchema]
});
```

- `address`: String, required  
- `stairsOrElevator`: String, required (e.g., "Stairs" or "Elevator")  
- `floor`: Number, required  
- `size`: Number, required (e.g., area in square feet)  
- `rooms`: Array of Room objects  

---

### **Room Schema**  
```js
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema]
});
```

- `name`: String, required (e.g., "Living Room")  
- `items`: Array of Item objects  

---

### **Item Schema**  
```js
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  length: { type: Number, required: true }
});
```

- `name`: String, required (e.g., "Sofa")  
- `width`: Number, required (in cm)  
- `height`: Number, required (in cm)  
- `length`: Number, required (in cm)  
