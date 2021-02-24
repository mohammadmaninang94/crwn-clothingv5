export const addItemToCart = (prevItems, item) => {
    const existingItem = prevItems.find(prevItem => prevItem.id === item.id);

    if (existingItem) {
        return prevItems.map(prevItem => prevItem.id === item.id ?
            { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem);
    }

    return [...prevItems, { ...item, quantity: 1 }];
};