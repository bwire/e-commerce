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
    const products = action.payload.products;
    const maxPrice = products.reduce((a, v) => (a < v.price ? v.price : a), 0);
    return {
      ...state,
      all_products: [...action.payload.products],
      filtered_products: [...action.payload.products],
      filters: { ...state.filters, maxPrice, price: maxPrice },
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

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: { ...state.filters, ...action.payload },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { filters, all_products: products } = state;
    const { text, category, company, color, price, shipping } = filters;
    const filtered = [...products]
      .filter((p) =>
        text ? p.name.toLowerCase().includes(text.toLowerCase()) : true
      )
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) => (company === 'all' ? true : p.company === company))
      .filter((p) => (color === 'all' ? true : p.colors.includes(color)))
      .filter((p) => p.price <= price)
      .filter((p) => (shipping ? p.shipping === shipping : !p.shipping));

    return {
      ...state,
      filtered_products: filtered,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    const products = action.payload.products;
    const maxPrice = products.reduce((a, v) => (a < v.price ? v.price : a), 0);
    return {
      ...state,
      all_products: [...action.payload.products],
      filtered_products: [...action.payload.products],
      filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        maxPrice,
        price: maxPrice,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
