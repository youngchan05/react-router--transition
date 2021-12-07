import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WhiteBoxWrap = ({ children, bgColor, boxHeight }) => (
  <Wrapper
    bgColor={bgColor}
    boxHeight={boxHeight}
  >
    {children}
  </Wrapper>
);
const Wrapper = styled.div`
  width: 100%;
  height: ${props => props.boxHeight};
  padding-top : 20px;
  padding-left : 16px;
  padding-right : 16px;
  border-radius: 12px;
  background-color: ${props => props.bgColor};
`;

WhiteBoxWrap.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  boxHeight: PropTypes.string,
};

WhiteBoxWrap.defaultProps = {
  children: React.createElement('div'),
  boxHeight: 100,
  bgColor: '#ffffff',
};

export default WhiteBoxWrap;
