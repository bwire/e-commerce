import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = ({ gridView }) => {
  const { filtered_products: products } = useFilterContext();
  {
    return gridView ? <GridView products={products} /> : <ListView />;
  }
};

export default ProductList;
