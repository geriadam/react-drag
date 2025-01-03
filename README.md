# React Drag and Drop Example

## Project Overview

This project demonstrates how to implement a drag-and-drop interface using React and the `@hello-pangea/dnd` library. The application allows users to drag items between two lists — "Available Options" and "Selected Options". The lists are persisted in `localStorage`, ensuring that changes are retained even after refreshing the page.

### Features:
- Drag-and-drop functionality
- Local storage persistence for state
- Simple and clean UI

## Demo

![React Drag and Drop](./public/React%20App.gif)  
*Gif showcasing the drag-and-drop feature*

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **@hello-pangea/dnd**: A drag-and-drop library for React.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/geriadam/react-drag-and-drop.git
cd react-drag-and-drop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

Start the local development server by running:

```bash
npm start
```

### 4. Open the app in your browser

Once the server is running, open your browser and go to http://localhost:3000 to view the application.

## How It Works

1. The app displays two lists: "Available Options" and "Selected Options".
2. Items can be dragged from one list to the other.
3. The state of both lists is stored in the browser’s localStorage, ensuring that the lists persist even after the page is reloaded.
