import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHAR = 2;

export default class Search extends Component {
  state = {
    artistN: '',
    isBtnSearchDisabled: true,
    artistSearch: '',
    loading: false,
    searched: false,
    albumArray: [],
  };

  searchClickBtn = () => {
    const { artistN } = this.state;
    this.setState({
      artistSearch: artistN,
    });
    this.searchFetch(artistN);
    this.setState({
      loading: true,
      searched: true,
    });
  };

  searchFetch = async (name) => {
    const albuns = await searchAlbumsAPI(name);
    this.setState({
      albumArray: albuns,
      loading: false,
      artistN: '',
    });
  };

  handleInputSearch = ({ target }) => {
    this.setState({
      artistN: target.value,
    });
  };

  render() {
    const { artistN, isBtnSearchDisabled, artistSearch,
      loading, searched, albumArray } = this.state;

    if (loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            name="artistName"
            type="text"
            onChange={ this.handleInputSearch }
            value={ artistN }
            placeholder="Nome do Artista"
          />

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artistN.length >= MIN_CHAR ? false : isBtnSearchDisabled }
            onClick={ this.searchClickBtn }
          >
            Pesquisar
          </button>
        </form>

        { searched && <p>{ `Resultado de álbuns de: ${artistSearch}` }</p> }
        <ul>
          {albumArray
            .map(({ artistName, artworkUrl100, collectionName, collectionId }) => (
              <li key={ collectionName }>
                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{ collectionName }</p>
                <p>{ artistName }</p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  Escute aqui
                </Link>
              </li>))}
        </ul>
        { searched && albumArray.length === 0 ? <p>Nenhum álbum foi encontrado</p> : '' }
      </div>
    );
  }
}
