import styled from 'styled-components';

const Link = styled.a`
  color: #fff; 
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: gray; 
  }
`;

export default Link;
