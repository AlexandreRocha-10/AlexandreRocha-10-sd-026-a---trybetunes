import React, { Component } from 'react';
import Header from './Header';

const MIN_CHAR = 2;

export default class Search extends Component {
  state = {
    artistName: '',
    isBtnSearchDisabled: true,
  };

  handleInputSearch = ({ target }) => {
    this.setState({
      artistName: target.value,
    });
  };

  render() {
    const { artistName, isBtnSearchDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            name="artistName"
            type="text"
            onChange={ this.handleInputSearch }
            value={ artistName }
            placeholder="Nome do Artista"
          />

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artistName.length >= MIN_CHAR ? false : isBtnSearchDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
