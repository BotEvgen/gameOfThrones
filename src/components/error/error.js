import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
color: #fff;
font-size:40px;
display:flex;
margin: 0 auto;
justify-content:center`

const ErrorMessage = () => {
   return <Span>Something goes wrong</Span>
}

export default ErrorMessage