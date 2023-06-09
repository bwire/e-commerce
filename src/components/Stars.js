import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({ stars, reviews }) => {
  const starsArray = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>
      {stars >= i ? (
        <BsStarFill />
      ) : stars >= i + 0.5 ? (
        <BsStar />
      ) : (
        <BsStarHalf />
      )}
    </span>
  ));
  return (
    <Wrapper>
      <div className='stars'>{starsArray}</div>
      <p className='reviews'>{`(${reviews} customer reviews)`}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
