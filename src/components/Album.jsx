import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    artistN: '',
    cover: '',
    musics: [],
    album: '',
  };

  componentDidMount() {
    this.musicFetch();
  }

  musicFetch = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicList = await getMusics(id);
    const musicArray = [...musicList];
    this.setState({
      musics: musicArray,
      artistN: musicArray.shift().artistName,
      cover: musicList[0].artworkUrl100,
      album: musicList[0].collectionName,
    });
  };

  render() {
    const { artistN, musics, cover, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{ artistN }</span>
        <hr />
        <span data-testid="album-name">{ album }</span>
        <img src={ cover } alt={ artistN } />

        { musics.map((music) => (
          <MusicCard
            key={ music.artistId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;
