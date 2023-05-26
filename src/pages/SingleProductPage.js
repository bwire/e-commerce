import React, { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const {
    singleProductLoading: isLoading,
    singleProductError: isError,
    singleProduct: product,
    fetchProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const { id: sku, name, price, description, stock, company } = product;

  return (
    <Wrapper>
      <PageHero
        title={
          <>
            <Link to='/products'>/ Products</Link>/ {name}
          </>
        }
      />
      <div class='section section-center page'>
        <Link className='btn' to='/products'>
          back to products
        </Link>
        <div class='product-center'>
          <ProductImages />
          <section class='content'>
            <h2>{name}</h2>
            <Stars />
            <h5 class='price'>{formatPrice(price)}</h5>
            <p class='desc'>{description}</p>
            <p class='info'>
              <span>Available : </span>
              {stock > 0 ? 'in stock' : 'out of stock'}
            </p>
            <p class='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p class='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
