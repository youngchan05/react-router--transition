import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';

const configure = () => createStore(
  rootReducer,
  composeWithDevTools(),
);

export default configure;
