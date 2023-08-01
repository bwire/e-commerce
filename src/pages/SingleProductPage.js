import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
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
  const navigate = useNavigate();
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
        navigate('/');
      }, 3000);
    }
  });

  if (isLoading || !product) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const {
    id: sku,
    name,
    price,
    description,
    stock,
    company,
    images,
    stars,
    reviews,
  } = product;

  return (
    <Wrapper>
      <PageHero
        title={
          <>
            <Link to='/products'>/ Products</Link>/ {name}
          </>
        }
      />
      <div className='section section-center page'>
        <Link className='btn' to='/products'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock > 0 ? 'in stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
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
