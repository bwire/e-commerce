import React, { useEffect, useContext, useReducer, useCallback } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: false,
  sort: 'price-lowest',
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  const toggleView = () => {
    dispatch({ type: state.grid_view ? SET_LISTVIEW : SET_GRIDVIEW });
  };

  const changeSort = (e) => {
    dispatch({ type: UPDATE_SORT, payload: { sort: e.target.value } });
  };

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { products } });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

  return (
    <FilterContext.Provider value={{ ...state, toggleView, changeSort }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
