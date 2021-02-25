const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key]
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value
    }, 0)
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {

                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            };
            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice: totalPrice
            };
        }
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.payload
            };
        case 'REMOVE_CART_ITEM': {
            const newItems = {
                ...state.items
            };
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }
        case 'PLUS_CART_ITEM': {
            const newObjectItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems)
                },
            };
            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');
            return {
                ...state,
                items:newItems,
                    totalCount,
                    totalPrice
                }
            }

        case 'MINUS_CART_ITEM': {
            const olItems = state.items[action.payload].items;
            const newObjectItems = olItems.length > 1 ? state.items[action.payload].items.slice(1) : olItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems)
                },
            };
            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }

        case 'CLEAR_CART':
            return {totalPrice: 0, totalCount: 0, items: {}};

        default:
            return state;
    }
};


export default cartReducer;