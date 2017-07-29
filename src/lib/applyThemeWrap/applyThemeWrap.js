// dependencies
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import update from 'react-addons-update';
import React, { Component, PropTypes } from 'react';

export default wrappedComponentStyles => WrappedComponent => class extends Component {

  static contextTypes = {
    themeWrap: PropTypes.object,
    themeWrapMixins: PropTypes.object
  };

  // transferring of definitions from base component
  static displayName = WrappedComponent.displayName || WrappedComponent.name;
  static defaultProps = omit(WrappedComponent.defaultProps, ['twStyles', 'twMixins']);
  static propTypes = WrappedComponent.propTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {
      themeWrapStyles: this._getthemeWrapStyles(context.themeWrap, context.themeWrapMixins)
    };
  }

  componentWillReceiveProps(nextProps, { themeWrap, themeWrapMixins }) {
    if (!isEqual(this.context.themeWrap, themeWrap)) {
      this.setState(update(this.state, {
        themeWrapStyles: { $set: this._getthemeWrapStyles(themeWrap, themeWrapMixins) }
      }));
    }
  }

  _getthemeWrapStyles(theme = {}, mixins = noop) {
    return wrappedComponentStyles(theme, mixins);
  }

  render() {
    return <WrappedComponent
      twStyles={this.state.themeWrapStyles}
      twMixins={this.context.themeWrapMixins}
      {...this.props} />;
  }
};
