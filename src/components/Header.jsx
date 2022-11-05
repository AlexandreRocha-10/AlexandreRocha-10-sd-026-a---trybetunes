import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <Link to="/search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/edit">Profile Edit</Link>
      </header>
    );
  }
}
