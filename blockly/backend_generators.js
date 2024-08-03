const STORAGE_KEY = 'crudItems';

// Helper function to get all items
function getAllItems() {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
}

// Helper function to save all items
function saveAllItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Create a new item
function createItem(item) {
    const items = getAllItems();
    item.id = Date.now(); // Simple unique ID based on timestamp
    items.push(item);
    saveAllItems(items);
    return item;
}

// Read all items
function readAllItems() {
    return getAllItems();
}

// Read a specific item by ID
function readItemById(id) {
    const items = getAllItems();
    return items.find(item => item.id === id);
}

// Update an item by ID
function updateItem(id, updatedItem) {
    const items = getAllItems();
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return null;
    }
    items[itemIndex] = { ...items[itemIndex], ...updatedItem };
    saveAllItems(items);
    return items[itemIndex];
}

// Delete an item by ID
function deleteItem(id) {
    const items = getAllItems();
    const updatedItems = items.filter(item => item.id !== id);
    saveAllItems(updatedItems);
    return updatedItems;
}

// // Example usage:

// // Create a new item
// const newItem = createItem({ name: 'Item 1', description: 'This is item 1' });
// console.log('Created:', newItem);

// // Read all items
// console.log('All Items:', readAllItems());

// // Read a specific item
// const item = readItemById(newItem.id);
// console.log('Read Item:', item);

// // Update an item
// const updatedItem = updateItem(newItem.id, { name: 'Updated Item 1' });
// console.log('Updated:', updatedItem);

// // Delete an item
// const remainingItems = deleteItem(newItem.id);
// console.log('Remaining Items:', remainingItems);
