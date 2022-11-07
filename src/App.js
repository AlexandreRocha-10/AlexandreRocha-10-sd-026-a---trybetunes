import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';
import { createUser } from './services/userAPI';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isBtnDisabled: true,
      loading: false,
      logged: false,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({
      userName: target.value,
    });
  };

  loginBtnClick = () => {
    this.setState({
      loading: true,
    });
    this.useCreateUser();
  };

  async useCreateUser() {
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({
      loading: false,
      logged: true,
    });
  }

  render() {
    const { userName, isBtnDisabled, loading, logged } = this.state;
    return (
      <Switch>
        <Route exact path="/">
          { logged ? <Redirect to="/search" /> : <Login
            handleInputChange={ this.handleInputChange }
            loginBtnClick={ this.loginBtnClick }
            userName={ userName }
            isBtnDisabled={ isBtnDisabled }
            loading={ loading }
          /> }
        </Route>
        <Route exact path="/search" render={ () => <Search loading={ loading } /> } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
