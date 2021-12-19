import PropTypes from 'prop-types';

export const children = PropTypes.node;

export const history = PropTypes.shape({
  action: PropTypes.string,
  block: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
  }),
  push: PropTypes.func,
  replace: PropTypes.func,
});

export const headers = PropTypes.shape({
  Accept: PropTypes.string,
  'Content-Type': PropTypes.string,
  dv_serial: PropTypes.string,
  dv_uuid: PropTypes.string,
  id: PropTypes.string,
  token: PropTypes.string,
});
