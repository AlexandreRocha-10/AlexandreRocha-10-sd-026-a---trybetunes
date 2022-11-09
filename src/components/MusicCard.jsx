import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  isFavorite = async ({ target }) => {
    const { checked } = target;
    this.setState({
      checked,
    });
    this.setState({ loading: true });
    await addSong(this.props);
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId, favoriteList } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          {' '}
          <code>audio</code>
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor="favoriteSong">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id="favoriteSong"
              checked={ checked || favoriteList }
              name="favoriteSong"
              onChange={ this.isFavorite }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  favoriteList: PropTypes.bool.isRequired,
};
