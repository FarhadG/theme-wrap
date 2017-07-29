import Radium from 'radium';
import React, { Component, PropTypes } from 'react';

import { applyThemeWrap } from '../../../lib';
import styles from './RoundButton.styles';

@applyThemeWrap(styles)
@Radium
class RoundButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { twStyles, twMixins, styles, onClick, label, isSubmit } = this.props;
    const labelStyle = [
      twStyles.label,
      Radium.getState(this.state, 'button', ':hover') && twStyles.label[':hover'],
      Radium.getState(this.state, 'button', ':active') && twStyles.label[':active'],
      styles.label
    ];
    return (
      <div>
        <button
          key="button"
          type={isSubmit ? 'submit' : 'button'}
          style={[twStyles.button, styles.button]}
          onClick={onClick}>
        <span key="button_label"
              style={labelStyle}>
          {label}
        </span>
        </button>
      </div>
    );
  }
}

RoundButton.defaultProps = {
  label: 'Click Here',
  styles: {}
};

RoundButton.propTypes = {
  styles: PropTypes.object,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool
};

export default RoundButton;
