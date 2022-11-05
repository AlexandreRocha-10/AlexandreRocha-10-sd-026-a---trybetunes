import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

const MIN_CHAR = 3;

export default class Login extends Component {
  render() {
    const { userName, isBtnDisabled, handleInputChange,
      loginBtnClick, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            value={ userName }
            placeholder="Nome"
            onChange={ handleInputChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ userName.length >= MIN_CHAR ? false : isBtnDisabled }
            onClick={ loginBtnClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  loginBtnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
