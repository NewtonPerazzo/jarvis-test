import styled from "styled-components";
import { colors } from "../styles/colors";

export const ModalContainer = styled.div`
  background: ${colors.bgGreenLight};
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #000;
`;