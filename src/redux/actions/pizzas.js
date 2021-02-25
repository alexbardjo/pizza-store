import axios from "axios";

export const setLoaded = val => ({
  type: 'SET_LOADED',
  payload: val
});

export const setPizzasAction = (items) => (
    {
        type: 'SET_PIZZAS',
        payload: items
    }
);


export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false));
    axios.get(`/pizzas?${category !==null ? `category=${category}`: ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(({data}) => {
            dispatch(setPizzasAction(data));
    })
};









