import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({ loading: false, name: userName.name });
    });
  };

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <Link to="/profile/edit">Profile Edit</Link>
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}
