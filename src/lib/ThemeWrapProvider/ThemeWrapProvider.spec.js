import { spy } from 'sinon';
import { noop } from 'lodash';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ThemeWrapMixin, ThemeWrapProvider } from '../';

describe('<ThemeWrapProvider />', () => {

  let wrapper, spyFunc;
  const theme = { primaryColor: 'red' };
  const mixins = new ThemeWrapMixin();

  const initWrapper = () => {
    wrapper = shallow(
      <ThemeWrapProvider theme={theme}
                         mixins={mixins}>
        <div>App</div>
      </ThemeWrapProvider>
    );
  };

  beforeEach(initWrapper);

  afterEach(() => spyFunc && spyFunc.restore());

  it('is creatable', () => {
    expect(wrapper).to.be.ok;
  });

  it('accepts theme as a prop and sets it as state', () => {
    expect(wrapper.state().themeWrap).to.eql(theme);
  });

  it('accepts mixins as a prop and sets it on the instance', () => {
    expect(wrapper.instance()._mixins instanceof ThemeWrapMixin).to.be.true;
  });

  it('calls _updateMixinsTheme if mixins are provided', () => {
    spyFunc = spy(ThemeWrapProvider.prototype, '_updateMixinsTheme');
    initWrapper();
    expect(spyFunc.calledOnce).to.be.true;
  });

  it('does not trigger an update if the theme has not been changed', () => {
    spyFunc = spy(ThemeWrapProvider.prototype, 'setState');
    initWrapper();

    expect(spyFunc.called).to.be.false;

    wrapper.setProps({ test: 'test' });
    expect(spyFunc.called).to.not.be.true;

    wrapper.setProps({ theme });
    expect(spyFunc.called).to.not.be.true;

    wrapper.setProps({ theme: { primaryColor: 'updated' } });
    expect(spyFunc.called).to.be.true;
  });

  it('updates the mixins if the theme has been updated', () => {
    spyFunc = spy(ThemeWrapProvider.prototype, '_updateMixinsTheme');
    wrapper.setProps({ theme: { primaryColor: 'updated' } });
    expect(spyFunc.calledOnce).to.be.true;
  });

  it('sets theme in context', () => {
    expect(wrapper.instance().getChildContext().themeWrap).to.eql(theme);
  });

  it('sets mixins in context', () => {
    expect(wrapper.instance().getChildContext().themeWrapMixins).to.eql(mixins);
  });

  it('wraps enture app as children', () => {
    expect(wrapper.children().length).to.equal(1);
  });

});
