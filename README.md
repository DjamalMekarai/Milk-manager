# Milk Production Management Application - Overview

## Purpose

The Milk Production Management Application is designed to streamline and automate the daily operations of a milk production company. It provides a user-friendly interface for managing cow registration, medical examinations, birth records, and daily milk production. The application aims to enhance efficiency in data management, ensuring accurate and organized records for the milk factory.

## Features

1.  **Cow Registration:**
    
    - Collect essential information such as cow number, entry date, and breed (Holstein, Montbliard).
    - Facilitate easy tracking of individual cow details.

2.  **Medical Examination Records:**
    
    - Log medical examination details, including the examination date and any illnesses detected.
    - Enable quick access to the health history of each cow.

3.  **Birth Records:**
    
    - Record information about each birth, specifying the mother cow number and birth date.
    - Keep a comprehensive record of the breeding history of the cows.

4.  **Daily Milk Production:**
    
    - Record the total daily milk production, capturing the date and the quantity of milk produced in liters.
    - Facilitate monitoring of milk production trends over time.

## Technologies Used

### Client-Side:

- **React JS:** Provides a responsive and dynamic user interface.
- **Redux:** Manages and centralizes application state, ensuring consistency across components.
- **React-router-dom:** Handles client-side routing for a seamless user experience.
- **Chakra UI:** Utilized for styling, ensuring a visually appealing and user-friendly design.
- **Vite:** Used as the build tool for fast and efficient development.

### Server-Side:

- **Express (Node JS):** Powers the server to handle backend logic and API requests.
- **JSON Files:** Used for data storage, offering a lightweight and easily accessible solution.

## Future Enhancements

Future updates may include additional features such as analytics for milk production trends, user authentication for enhanced security, and integration with external systems for seamless data exchange.

By adopting modern technologies and a user-centric design, the Milk Production Management Application aims to optimize workflow processes, promote data accuracy, and contribute to the overall efficiency of the milk factory management system.


## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your code editor
- Open two different terminals (to run the server on one terminal and the client on the other terminal)

<span style="color:red;">
Make sure you run the server side before the client side
</span>
<br/>
<br/>

**In the first terminal**

- run these commands :

```bash
$ cd server
$ npm install     # to install server-side dependencies
$ npm run dev     # to start the server
```

The server side will run on : **http://localhost:4000/**

**In the second terminal**

- run these commands :

```bash
$ cd client
$ npm install     # to install client-side dependencies
$ npm run dev       # to start the client
```

The client side will run on : **http://localhost:3000/**
"# Milk-manager" 
