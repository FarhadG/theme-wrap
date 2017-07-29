import { assign } from 'lodash';
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Style, StyleRoot } from 'radium';
import { applyThemeWrap } from '../../../lib';
import RoundButton from '../RoundButton/RoundButton';
import styles from './ThemedButtons.styles';

@applyThemeWrap(styles)
class ThemedButtons extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { twStyles, twMixins } = this.props;
    return (
      <div>
        <RoundButton label="themed button" />
        <RoundButton label="themed button" />
        <RoundButton label="Mixin themed button listening to secondary color instead of primary"
                     styles={{ button: twMixins.get('customButton') }} />
        <RoundButton label="themed button" />
        <RoundButton label="themed button" />
      </div>
    );
  }
}

export default ThemedButtons;
