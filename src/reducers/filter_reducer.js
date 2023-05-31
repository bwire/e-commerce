import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload.products],
      filtered_products: [...action.payload.products],
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload.sort,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    const sortedProducts = [...filtered_products];
    const asc = sort === 'price-lowest' || sort === 'name-a';
    const field =
      sort === 'price-lowest' || sort === 'price-highest' ? 'price' : 'name';

    console.log(asc, sort, field);
    return {
      ...state,
      filtered_products: sortedProducts.sort((a, b) => {
        if (asc) {
          return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        } else {
          return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        }
      }),
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
