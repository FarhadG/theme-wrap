import { spy, stu } from 'sinon';
import { noop } from 'lodash';
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ThemeWrapMixin, ThemeWrapProvider, applyThemeWrap } from '../';

describe('applyThemeWrap()', () => {

  let wrapper;
  const theme = { primaryColor: 'red' };
  const mixins = new ThemeWrapMixin();

  const styles = (theme, mixins) => {
    return {
      backgroundColor: theme.primaryColor,
      border: '1px solid red'
    }
  };

  @applyThemeWrap(styles)
  class App extends Component {
    render() {
      return <div>App</div>
    }
  }

  const initWrapper = () => {
    wrapper = mount(
      <ThemeWrapProvider theme={theme}
                         mixins={mixins}>
        <App />
      </ThemeWrapProvider>
    );
  };

  beforeEach(initWrapper);

  it('returns the wrapped component', () => {
    expect(wrapper.find(App).length).to.equal(1);
  });

});
