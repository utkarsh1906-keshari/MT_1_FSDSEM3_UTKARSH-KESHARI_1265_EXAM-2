# SET A – LIBRARY BOOK MANAGEMENT REST API

**Student Name:** Utkarsh Keshari  
**Roll Number / University ID:** 2500320101265  
**Course:** B.Tech Second Year | Full Stack Development (FSD)  
**Examination:** Mid Term 1 (MT-1) Practical Examination  
**Assignment Set:** SET A – Library Book Management API  

---

## 1. Project Overview

A clean, beginner-friendly RESTful API for managing a library's book inventory, developed using **Node.js** and **Express.js**. In strict accordance with the professor's examination requirements, all records are maintained in an **in-memory JavaScript array** in server memory.

> **Tech Stack Compliance:**
> - **Runtime:** Node.js
> - **Framework:** Express.js
> - **Data Storage:** In-Memory JavaScript Array (`let books = [...]`)
> - **Database:** None (No MongoDB, No MySQL, or any external database)
> - **Frontend:** None (API tested using Postman / Thunder Client)

---

## 2. Project Directory Structure

```text
MT_1_FSDSEM3_UTKARSH-KESHARI_1265_EXAM-2/
│
├── server.js          # Express app, in-memory array, validation, and all 6 endpoints
├── package.json       # Project dependencies (express) and npm start script
├── package-lock.json  # Dependency lockfile
├── .gitignore         # Excludes node_modules from git submission
└── README.md          # Complete project documentation and testing instructions
```

---

## 3. Data Structure

Each book record contains the following fields:

| Field | Data Type | Description | Required |
|---|---|---|---|
| `id` | `Number` | Unique identifier generated automatically by the application | Auto-generated |
| `title` | `String` | Title of the book (set-specific field) | Yes |
| `author` | `String` | Name of the author | Yes |
| `genre` | `String` | Book category or genre | Yes |
| `publishedYear` | `Number` | Year of publication (numeric integer) | Yes |
| `available` | `Boolean` | Availability status (`true` or `false`) | Yes |

### Initial In-Memory Records:
```json
[
  {
    "id": 101,
    "title": "Wings of Fire",
    "author": "A.P.J. Abdul Kalam",
    "genre": "Autobiography",
    "publishedYear": 1999,
    "available": true
  },
  {
    "id": 102,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Fiction",
    "publishedYear": 1988,
    "available": true
  },
  {
    "id": 103,
    "title": "Harry Potter",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "publishedYear": 1997,
    "available": false
  }
]
```

---

## 4. Setup and Run Instructions

### Step 1: Clone the repository and navigate into it
```bash
git clone https://github.com/utkarsh1906-keshari/MT_1_FSDSEM3_UTKARSH-KESHARI_1265_EXAM-2.git
cd MT_1_FSDSEM3_UTKARSH-KESHARI_1265_EXAM-2
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Express Server
```bash
npm start
```
*Or directly using node:*
```bash
node server.js
```

### Terminal Output:
```text
Server running on http://localhost:3000
```

---

## 5. API Endpoints Summary

| # | Task / Operation | Method | Route | Success Code | Error Code |
|---|---|---|---|---|---|
| 1 | GET all records | `GET` | `/api/books` | `200 OK` | - |
| 2 | POST a new record | `POST` | `/api/books` | `201 Created` | `400 Bad Request` |
| 3 | Filter records | `GET` | `/api/books/filter?author=value` | `200 OK` | `400 Bad Request` |
| 4 | GET record by ID | `GET` | `/api/books/:id` | `200 OK` | `404 Not Found`, `400 Bad Request` |
| 5 | PUT / update a record | `PUT` | `/api/books/:id` | `200 OK` | `404 Not Found`, `400 Bad Request` |
| 6 | DELETE a record | `DELETE` | `/api/books/:id` | `200 OK` | `404 Not Found`, `400 Bad Request` |

> **Important Implementation Note:** As explicitly mandated in the assignment guidelines, the filter route `/api/books/filter` is declared **before** `/api/books/:id` so that the word `'filter'` is never treated as a dynamic `:id`.

---

## 6. Sample Request Bodies (From Professor's Assignment PDF)

### Sample POST Request Body:
```json
{
  "title": "The Discovery of India",
  "author": "Jawaharlal Nehru",
  "genre": "History",
  "publishedYear": 1946,
  "available": true
}
```

### Sample PUT Request Body (Example Update):
```json
{
  "title": "The Alchemist – Revised Edition",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988,
  "available": true
}
```

---

## 7. Testing Instructions (Postman / Thunder Client)

### 1. GET All Books
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books`
- **Expected Status:** `200 OK`

### 2. POST a New Book (Valid Input)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/books`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "The Discovery of India",
  "author": "Jawaharlal Nehru",
  "genre": "History",
  "publishedYear": 1946,
  "available": true
}
```
- **Expected Status:** `201 Created` (Auto-assigns unique numeric `id: 104`)

### 3. POST an Invalid Book (Validation Error)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/books`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "Invalid Book",
  "publishedYear": "not-a-number"
}
```
- **Expected Status:** `400 Bad Request`

### 4. GET Book by ID (Existing)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/102`
- **Expected Status:** `200 OK`

### 5. GET Book by ID (Non-Existing)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/999`
- **Expected Status:** `404 Not Found`

### 6. PUT Update a Book (Existing)
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/books/102`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "The Alchemist – Revised Edition",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988,
  "available": true
}
```
- **Expected Status:** `200 OK`

### 7. PUT with Invalid Body
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/books/102`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "",
  "author": "Paulo Coelho"
}
```
- **Expected Status:** `400 Bad Request`

### 8. DELETE a Book (Existing)
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/books/101`
- **Expected Status:** `200 OK`

### 9. DELETE a Book (Non-Existing)
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/books/999`
- **Expected Status:** `404 Not Found`

### 10. Filter by Existing Author (Case-Insensitive)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/filter?author=paulo`
- **Expected Status:** `200 OK`

### 11. Filter by Non-Existing Author
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/filter?author=Shakespeare`
- **Expected Status:** `200 OK` (Returns empty array `[]`)
