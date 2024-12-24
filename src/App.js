import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const REACT_DRAG_AVAILABLE_STORAGE_KEY = "react-drag-available";
const REACT_DRAG_SELECTED_STORAGE_KEY = "react-drag-selected";
const initialOptions = [
  { id: "1", name: "Sales Cloud" },
  { id: "2", name: "Service Cloud" },
  { id: "3", name: "Community Cloud" },
  { id: "4", name: "Financial Cloud" },
  { id: "5", name: "Einstein AI" },
  { id: "6", name: "Wave Analytics" },
  { id: "7", name: "Health Cloud" },
];

const App = () => {
  const [availableOptions, setAvailableOptions] = useState(() => {
    const savedAvailableOptions = localStorage.getItem(REACT_DRAG_AVAILABLE_STORAGE_KEY);
    return savedAvailableOptions ? JSON.parse(savedAvailableOptions) : initialOptions;
  });

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedSelectedOptions = localStorage.getItem(REACT_DRAG_SELECTED_STORAGE_KEY);
    return savedSelectedOptions ? JSON.parse(savedSelectedOptions) : [];
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    let sourceList = [];
    let destinationList = [];

    if (source.droppableId === "available") {
      sourceList = [...availableOptions];
    } else {
      sourceList = [...selectedOptions];
    }

    if (destination.droppableId === "available") {
      destinationList = [...availableOptions];
    } else {
      destinationList = [...selectedOptions];
    }

    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);

    if (source.droppableId === "available") {
      setAvailableOptions(sourceList);
    } else {
      setSelectedOptions(sourceList);
    }

    if (destination.droppableId === "available") {
      setAvailableOptions(destinationList);
    } else {
      setSelectedOptions(destinationList);
    }

    localStorage.setItem(REACT_DRAG_AVAILABLE_STORAGE_KEY, JSON.stringify(availableOptions));
    localStorage.setItem(REACT_DRAG_SELECTED_STORAGE_KEY, JSON.stringify(selectedOptions));
  };

  useEffect(() => {
    localStorage.setItem(REACT_DRAG_AVAILABLE_STORAGE_KEY, JSON.stringify(availableOptions));
    localStorage.setItem(REACT_DRAG_SELECTED_STORAGE_KEY, JSON.stringify(selectedOptions));
  }, [availableOptions, selectedOptions]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">React Drag and Drop</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-8">
          <Droppable droppableId="available">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-blue-100 w-64 p-4 rounded shadow-md"
                data-testid="available"
              >
                <h2 className="text-lg font-semibold mb-3">Available Options</h2>
                {availableOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-blue-50"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="selected">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-orange-100 w-64 p-4 rounded shadow-md"
                data-testid="selected"
              >
                <h2 className="text-lg font-semibold mb-3">Selected Options</h2>
                {selectedOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-orange-50"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
