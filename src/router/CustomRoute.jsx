import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getItem } from '../common/StorageUtils';

function CustomRoute({ component: Child, ...rest }) {
  const routeRender = (props) => {
    const { location } = props;
    const isLogin = getItem('admin');
    if (!isLogin) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }

    return <Child {...props} />;
  };
  return <Route {...rest} render={routeRender} />;
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
