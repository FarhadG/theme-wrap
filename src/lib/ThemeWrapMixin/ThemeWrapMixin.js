// dependencies
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import forOwn from 'lodash/forOwn';
import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import merge from 'lodash/merge';

export default class ThemeWrapMixin {

  constructor(theme = {}, sources = {}) {
    this._theme = theme;
    this._sources = sources;
  }

  setTheme(theme) {
    this._theme = theme;
    return this;
  }

  getTheme() {
    return this._theme;
  }

  set(name, source) {
    this._sources[name] = source;
    return this;
  }

  get(name, mod, additionalStyle) {
    let styleSrc = this._sources[name];
    if (!styleSrc) {
      throw Error(`Can't find style source for "${name}"`);
    }

    styleSrc = styleSrc(this.getTheme(), this, mod);
    if (!isPlainObject(styleSrc)) {
      throw Error(`style source "${name}" returned "${styleSrc}" instead of an object!`);
    }

    if (styleSrc.mixins) {
      let mixin = {};
      styleSrc.mixins.slice().forEach(mixinName => {
        merge(mixin, this.get(mixinName, mod));
      });
      delete styleSrc.mixins;
      styleSrc = merge(mixin, styleSrc);
    }

    const ret = this._resolveMod(styleSrc, mod);
    return assign(ret, additionalStyle);
  }

  clone() {
    const theme = cloneDeep(this._theme);
    const sources = cloneDeep(this._sources);
    return new ThemeWrapMixin(theme, sources);
  }

  extend(name, source) {
    const originalSource = this._sources[name];
    if (originalSource) {
      this.set(name, (...args) => {
        const extension = source(...args);
        const original = originalSource(...args);
        return merge(original, extension);
      });
    }
    else {
      this.set(name, source);
    }
    return this;
  }

  _resolveMod(styleSrc, mod) {
    forOwn(mod, (value, key) => {
      if (styleSrc[key]) {
        const modStyleSrc = styleSrc[key];
        if (isBoolean(value)) {
          if (value) {
            let modStyle = this._resolveMod(modStyleSrc, mod);
            assign(styleSrc, modStyle);
          }
        }
        else if (isString(value)) {
          if (modStyleSrc[value]) {
            let modStyle = this._resolveMod(modStyleSrc[value], mod);
            assign(styleSrc, modStyle);
          }
        }
      }
    });
    return styleSrc;
  }
}
