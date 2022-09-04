import styled from 'styled-components';

export const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

export const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

export const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

export const GreenButton = styled.button`
  background-color: #4caf50;
  color: white;
  margin: 2px;
  border: 2px solid #4caf50;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export const RedButton = styled.button`
  background-color: #f44336;
  color: white;
  margin: 2px;
  border: 2px solid #f44336;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export const BlueButton = styled.button`
  background-color: #008cba;
  margin: 2px;
  color: white;
  border: 2px solid #008cba;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
