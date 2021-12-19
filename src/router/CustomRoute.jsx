import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';
import { getItem } from '../common/StorageUtils';

function CustomRoute( {child} ) {
    let location = useLocation();
    const isLogin = false
    // const isLogin = getItem('admin');
    if (!isLogin) {
      return (
        <Navigate to="/login" state={{ from: location }} />
      );
    }
    return child();
}

CustomRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
  }),
};

CustomRoute.defaultProps = {
  component: null,
  location: null,
};

export default CustomRoute;
