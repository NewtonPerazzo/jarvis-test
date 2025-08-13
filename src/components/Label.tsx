import styled, { css } from "styled-components";

interface LabelProps {
  required?: boolean;
  color?: string;
  weight?: string | number;
  size?: string;
  center?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-weight: ${({ weight }) => weight || 600};
  color: ${({ color }) => color || "inherit"};
  font-size: ${({ size }) => size || "inherit"};
  text-align: ${({ center }) => (center ? "center" : "left")};

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: " *";
        color: red;
        margin-left: 2px;
      }
    `}
`;
