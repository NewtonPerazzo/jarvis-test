import styled from "styled-components";
import { colors } from "../styles/colors";

export const Button = styled.button`
  padding: 10px;
  background-color: ${colors.bgGreen};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.bgGreenHover};
  }
`;