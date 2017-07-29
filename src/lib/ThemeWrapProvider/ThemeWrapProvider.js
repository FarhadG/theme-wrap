// dependencies
import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/isEqual';
import update from 'react-addons-update';

export default class ThemeWrapProvider extends Component {

  static childContextTypes = {
    themeWrap: PropTypes.object,
    themeWrapMixins: PropTypes.object
  };

  static defaultProps = {
    theme: {}
  };

  static propTypes = {
    theme: PropTypes.object,
    mixins: PropTypes.object
  };

  getChildContext() {
    return {
      themeWrap: this.state.themeWrap,
      themeWrapMixins: this._mixins
    };
  }

  constructor(props, context) {
    super(props, context);
    const { theme, mixins } = props;
    this._mixins = mixins;
    this._updateMixinsTheme(theme);
    this.state = { themeWrap: theme };
  }

  componentWillReceiveProps({ theme }) {
    const updatedTheme = !isEqual(this.state.themeWrap, theme);
    if (updatedTheme) {
      this.setState(update(this.state, {
        themeWrap: { $set: theme }
      }));
      this._updateMixinsTheme(theme);
    }
  }

  _updateMixinsTheme(theme) {
    this._mixins
    && this._mixins.setTheme
    && this._mixins.setTheme(theme);
    return this;
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
