import React, { useState } from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';

const ProductsPage = () => {
  const [gridView, setGridView] = useState(true);
  return (
    <main>
      <PageHero title='/ products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList gridView={gridView} />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
