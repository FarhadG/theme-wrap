# Getting Started

In the quick overview below, you will be guided with a simple walk-through of how to configure a sample `theme` and have your components be able to access this data. In short:

- You wrap your components inside of the `<ThemeWrapProvider theme={theme}>` and pass the theme via a prop.
- You wrap your components with `applyThemeWrap(componentStyles)` and pass your styles as the argument.
- Access your styles via your component's styles.

It's a simple process that provides an elegant way of theme your entire React app.

Furthermore, in the `advanced` section, we will cover more advanced topics, such as being able to access your component's`props` in your component's `styles`, hot-swap different themes on the fly (in cases where an action could trigger an entire theme update), `mixins` support, and more...

Lets get started...

### <ThemeWrapProvider>

Similar to other React providers, `ThemeWrapProvider` provides data to the entire app. For example, you may have the following sample theme:

```javascript
// theme.js

module.exports = {
  primaryColor: 'red',
  secondaryColor: 'green',
  fontSizes: {
    sm: '0.8em',
    md: '1.1em',
    lg: '1.8em'
  }
};
```

After creating and configuring your theme, you provide the `theme` as a `prop` to the `ThemeWrapProvider`, as seen below:

```jsx
// App.jsx

import React, { Component } from 'react';

import theme from './theme';

class App extends Component {
  
  render() {
    return (
      <ThemeWrapProvider theme={theme}>
        <Navigation />
        ...
      </ThemeWrapProvider>
    );
  }
}

export default App;
```

As you can see above, we've decided to wrap our entire app signified by the `…` inside of our `ThemeWrapProvider`.  However, you will later see that you don't necessarily have to wrap your entire app if not necessary and you can also nest `ThemeWrapProvider`s for the ability to have sub sections of your app respond to different themes.

Now, all components within `ThemeWrapProvider` have access to `theme`. But how do our components get access to the theme? You can try to manage the context data yourself or use our `applyThemeWrap` higher order utility.

### applyThemeWrap()

This higher order function wraps your component and provides the `theme` along with other data as `props` to your wrapped component. Following our example above, we have a `<Navigation />`:

```jsx
// Navigation.jsx

import React, { Component } from 'react';
import { applyThemeWrap } from 'theme-wrap';

import styles from './Navigation.styles';

class Navigation extends Component {
  
  render() {
    return (
      <div>
        <h1>
          Sample Component Header
        </h1>
      </div>
    );
  }
}

export default applyThemeWrap(styles)(Navigation);
```

Please note the component's `styles` which is passed into `applyThemeWrap` that wraps your entire component. You can also use ES7 decorators, if you'd like:

```jsx
@applyThemeWrap(styles)
class Navigation extends Component {
  ...
}

export default Navigation;
```

So lets now see how our component's styles could look like. We can either include our inline styles within the same file, but we'll separate it to help keep our code modular. So, lets define the styles for our `<Navigation />`:

```jsx
// Navigation.styles.js

export default function(theme) {
  return {
    container: {
      // green
      backgroundColor: theme.secondaryColor,
      padding: '20px'
    },
    header: { 
      // red
      color: theme.primaryColor
    }
  };
}
```

Our component's `styles` now has the `theme` within its scope which you can see we've used to define our colors. Now that our component's `styles` are defined, lets use them within our component. As mentioned earlier, your styles are passed down as `props` to the component. Lets revisit our `<Navigation />`:

```jsx
// Navigation.jsx

import React, { Component } from 'react';
import { applyThemeWrap } from 'theme-wrap';

import styles from './Navigation.styles';

@applyThemeWrap(styles)
class Navigation extends Component {
  
  render() {
    const { tmStyles } = this.props;
    return (
      <div style={tmStyles.container}>
        <h1 style={tmStyles.header}>
          Sample Component Header
        </h1>
      </div>
    );
  }
}

export default Navigation;
```

In the `render` function, you will see that we are deconstructing our `props` and accessing `tmStyles`, which signified our theme wrapped styles from our `applyThemeWrap(styles)` wrapper. We then use the `keys` from our styles as we please to style the different sections of our app. It's as easy as that!
