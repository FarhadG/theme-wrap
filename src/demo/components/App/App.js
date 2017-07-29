import { render } from 'react-dom';
import { assign, sample } from 'lodash';
import React, { Component } from 'react';
import { Style, StyleRoot } from 'radium';
import normalize from 'radium-normalize';
import { ThemeWrapProvider } from '../../../lib';
import RoundButton from '../RoundButton/RoundButton';
import ThemedButtons from '../ThemedButtons/ThemedButtons';
import defaultTheme from '../../styles/theme';
import mixins from '../../styles/mixins';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { theme: defaultTheme };
  }

  changeTheme = () => {
    const theme = assign({}, defaultTheme, {
      primaryColor: this.getRandomColor(),
      secondaryColor: this.getRandomColor()
    });
    this.setState({ theme });
  };

  getRandomColor() {
    const colors = ['yellow', 'orange', 'black', 'gray', 'purple', 'green', 'red', 'blue'];
    return sample(colors);
  }

  render() {
    const { theme } = this.state;
    return (
      <StyleRoot>
        <Style rules={normalize} />

        <RoundButton label="Click here to change theme :)"
                     styles={{ button: { backgroundColor: 'black' } }}
                     onClick={this.changeTheme} />


        <h3>Default theme</h3>
        <ThemeWrapProvider theme={defaultTheme} mixins={mixins}>
          <ThemedButtons />
        </ThemeWrapProvider>


        <h3>Swappable themes and mixins watching theme*</h3>
        <ThemeWrapProvider theme={theme} mixins={mixins}>
          <ThemedButtons />
        </ThemeWrapProvider>


        <h3>Nested theme provider support</h3>
        <ThemeWrapProvider theme={theme} mixins={mixins}>
          <ThemedButtons />

          <ThemeWrapProvider theme={defaultTheme} mixins={mixins}>
            <p>Inside nested theme provider</p>
            <ThemedButtons />
          </ThemeWrapProvider>
        </ThemeWrapProvider>

      </StyleRoot>
    )
  }
}

export default App;
