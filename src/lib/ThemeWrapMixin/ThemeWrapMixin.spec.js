import { expect } from 'chai';
import { ThemeWrapMixin } from '../';

describe('ThemeWrapMixin', () => {

  let mixins;

  const theme = {
    primaryColor: 'red',
    secondaryColor: 'blue'
  };

  beforeEach(() => {
    mixins = new ThemeWrapMixin();
  });

  it('is creatable', () => {
    expect(mixins).to.be.not.null;
  });

  it('takes initial theme', () => {
    const mixins = new ThemeWrapMixin(theme);
    expect(theme).to.eql(mixins._theme);
  });

  it('takes initial sources', () => {
    const sources = {};
    const mixins = new ThemeWrapMixin(null, sources);
    expect(sources).to.eql(mixins._sources);
  });

  it('can set theme', () => {
    expect({}).to.eql(mixins._theme);
    mixins.setTheme(theme);
    expect(theme).to.eql(mixins._theme);
  });

  it('can get theme', () => {
    const mixins = new ThemeWrapMixin(theme);
    expect(theme).to.eql(mixins.getTheme());
  });

  it('can set mixin', () => {
    mixins.set('customButton', () => ({ color: 'red' }));
    expect({ color: 'red' }).to.eql(mixins.get('customButton'));
  });

  it('can get mixin', () => {
    mixins.set('a', () => ({ foo: 1 }));
    const style = mixins.get('a');
    expect(style.foo).to.equal(1);
  });

  it('throws on get of undefined mixin', () => {
    expect(() => mixin.get('random')).to.throw;
  });

  it('is cloneable', () => {
    mixins.set('a', () => ({ foo: 1 }));
    const mixinsClone = mixins.clone();
    expect(mixinsClone).to.not.equal(mixins);
    expect(mixins.get('a')).to.eql(mixinsClone.get('a'));
  });

  it('manages mixins by correct applying them and then removing them', () => {
    mixins.set('a', () => ({ foo: 1, bar: 1, baz: 1 }));
    mixins.set('b', () => ({ foo: 2, bar: 2 }));
    mixins.set('c', () => ({
      mixins: ['a', 'b'],
      foo: 3
    }));
    const style = mixins.get('c');
    expect(style).to.eql({ foo: 3, bar: 2, baz: 1 });
    expect(style.mixins).to.be.undefined;
  });

  it('sets and extends the original mixin', () => {
    mixins.set('a', () => ({ foo: 1, bar: 1 }));
    mixins.extend('a', () => ({ foo: 2 }));
    const style = mixins.get('a');
    expect(style).to.eql({ foo: 2, bar: 1 });
  });

  it('use set instead of extend if the selected name is free', () => {
    const extender = () => {
    };
    mixins.set = (name, source) => {
      expect(extender).to.eql(source);
    };
    mixins.extend('a', extender)
  });

  it('passes theme to the source function', () => {
    mixins.setTheme(theme);
    mixins.set('a', (_theme) => {
      expect(_theme).to.eql(theme);
      return {};
    });
    mixins.get('a');
  });

  it('passes itself to the source function', () => {
    mixins.set('a', (theme, _mixins) => {
      expect(_mixins).to.eql(mixins);
      return {};
    });
    mixins.get('a');
  });

  it('passes mod to the source function', () => {
    const mod = {};
    mixins.set('a', (theme, mixins, _mod) => {
      expect(_mod).to.eql(mod);
      return {};
    });
  });

  it('merges with additional styles', () => {
    mixins.set('a', () => ({ foo: 1, bar: 1 }));
    const style = mixins.get('a', null, { foo: 2, baz: 0 });
    expect(style).to.eql({ foo: 2, bar: 1, baz: 0 });
  });

  describe('resolve modifiers', () => {
    it('resolves booleans', () => {
      mixins.set('a', () => ({
        qux: 1,
        quz: 2,
        foo: { qux: 3 },
        bar: { qux: 4 },
        baz: { qux: 5 }
      }));
      const style = mixins.get('a', { foo: true, bar: false });
      expect(style.qux).to.eql(3);
      expect(style.quz).to.eql(2);
    });

    it('resolves keys', () => {
      mixins.set('a', () => ({
        qux: 1,
        quz: 2,
        taz: {
          foo: { qux: 3 },
          bar: { qux: 4 },
          baz: { qux: 5 }
        }
      }));
      const style = mixins.get('a', { taz: 'bar' });
      expect(style.qux).to.eql(4);
      expect(style.quz).to.eql(2);
    });

    it('resolves nested', () => {
      mixins.set('a', () => ({
        qux: 1,
        taz: {
          qux: 3,
          foo: {
            qux: 4,
            bar: {
              qux: 5,
              taz: {
                foo: { qux: 6 }
              }
            }
          }
        }
      }));
      const style = mixins.get('a', { taz: 'foo', bar: true });
      expect(style.qux).to.eql(6);
    });
  });
});
