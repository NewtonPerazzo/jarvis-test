import styled from 'styled-components';

interface BoxProps {
  flex?: boolean;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  bg?: string;
  width?: string;
  mT?: number;
  pL?: number;
  p?: number
}

const Box = styled.div<BoxProps>`
  flex-direction: ${props => (props.flex ? props.flexDirection || 'row' : 'initial')};
  display: ${props => (props.flex ? 'flex' : 'block')};
  justify-content: ${props => (props.flex ? props.justifyContent || 'flex-start' : 'initial')};
  align-items: ${props => (props.flex ? props.alignItems || 'stretch' : 'initial')};
  width: ${props => props.width || '100%'};
  background-color: ${props => props.bg || 'transparent'};
  margin-top: ${props => props.mT || 0}px;
  padding-right: ${props => props.pL || 0}px;
  padding-left: ${props => props.pL || 0}px;
  padding: ${props => props.p || 0}px;
`;

export default Box;