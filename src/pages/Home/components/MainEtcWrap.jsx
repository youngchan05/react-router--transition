import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainEtcWrap = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 272px;
  padding-top : 20px;
  padding-left : 20px;
  padding-right : 20px;
  margin-bottom : 55px;
  box-shadow: 0 0 4px 0 rgba(193, 193, 193, 0.5);
  background-color: #333333;
`;

MainEtcWrap.propTypes = {
  children: PropTypes.node,
};

MainEtcWrap.defaultProps = {
  children: React.createElement('div'),
};

export default MainEtcWrap;
