import React, { Component } from 'react';
import {
  Switch, Route, withRouter, Link,
} from 'react-router-dom';
import { RoutePath } from '../../../router/RoutePath';

import ContentBox from '../../../components/ContentBox';
import Login from '../../Login/containers/Login'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    const { history} = this.props;
    history.push('/user')
  }
  render() {

    return (
      <>

      </>
    );
  }
}


export default withRouter(Home);
