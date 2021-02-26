export const addItemToCart = (prevItems, item) => {
    const existingItem = prevItems.find(prevItem => prevItem.id === item.id);

    if (existingItem) {
        return prevItems.map(prevItem => prevItem.id === item.id ?
            { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem);
    }

    return [...prevItems, { ...item, quantity: 1 }];
};

export const removeItemFromCart = (prevItems, item) => {
    const existingItem = prevItems.find(prevItem => prevItem.id === item.id);

    if (existingItem.quantity === 1) {
        return clearItemFormCart(prevItems, item);
    }

    return prevItems.map(prevItem => prevItem.id === item.id ?
        { ...prevItem, quantity: prevItem.quantity - 1 } : prevItem);
};

export const clearItemFormCart = (prevItems, item) => prevItems.filter(prevItem => prevItem.id !== item.id);