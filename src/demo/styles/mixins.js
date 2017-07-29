import { ThemeWrapMixin } from '../../lib';

const mixins = new ThemeWrapMixin()
  .set('basicButton', () => ({
    backgroundColor: 'red',
    test: 'cool'
  }))
  .set('basicButton2', () => ({
    test: 'cool2'
  }))
  .set('customButton', (theme) => ({
    mixins: ['basicButton', 'basicButton2'],
    backgroundColor: theme.secondaryColor
  }));

module.exports = mixins;
