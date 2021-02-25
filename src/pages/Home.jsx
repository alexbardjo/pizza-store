import React from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryAction, setSortByAction} from '../redux/actions/filters';
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";


const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цена', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'}
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzasReducer}) => pizzasReducer.items);
    const cartItems = useSelector(({cartReducer}) => cartReducer.items);
    const isLoaded = useSelector(({pizzasReducer}) => pizzasReducer.isLoaded);
    const {category, sortBy} = useSelector(({filtersReducer}) => filtersReducer);

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [sortBy, category]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategoryAction(index))
    }, []);
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortByAction(type))
    }, []);

    const handleAddPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj))
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup
                    onClickSortType={onSelectSortType}
                    activeSortType={sortBy.type}
                    items={sortItems}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded
                        ? items.map((obj) => (<PizzaBlock
                            onClickAddPizza={handleAddPizzaToCart}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />))
                        : Array(10)
                            .fill(0)
                            .map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
        </div>
    );
}

export default Home;