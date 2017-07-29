#ThemeWrapMixin

###Basic usage
A theme has a list of style sources. Every source is a function which returns an object:
```javascript
import { ThemeWrapMixins } from 'theme-wrap'

var mixins = new ThemeWrapMixins()

mixins.set('label', () => ({
  color: 'red'
}))

mixins.get('label') // {color: red}
```

###Mixins
The returned style object can have a [old React style mixins](https://facebook.github.io/react/docs/reusable-components.html#mixins) with the name of other sources.
```javascript
mixins.set('label', () => ({
  mixins: ['font'],
  color: 'red'
}))
mixins.set('font', () => ({
  color: 'white',
  fontFamily: 'Roboto'
}))

mixins.get('label') // {color: red, fontFamily: 'Roboto'}
```

###Doing logic in style source
The first argument of the style source is the theme so you can ```.get()``` other styles in it.
```javascript
mixins.set('palette', () => ({
  textColor: 'navajowhite'
}))
mixins.set('label', (theme) => {
  var { textColor } = mixins.get('palette')
  return {
    color: textColor,
    backgroudColor: complement(textColor)
  }
})

mixins.get('label') // {color: 'navajowhite', backgroudColor: ?}
```

You can manage (and later customize)  your other configs and variables (like colors, spacing, transitions, etc.) it the same way as the other styles!

###Using modifiers
If you used that, it's similar to the [old Radium modifiers](https://github.com/FormidableLabs/radium/blob/v0.10.3/docs/guides/overview.md#modifiers):  
```javascript
mixins.set('label', () => ({
  color: 'white',
  //merge in if the modifier.error === true
  error: {
    color: 'red'
  },
  kind: {
    //merge in if the modifier.kind === 'dotted'
    dotted: {borderStyle: 'dotted'},
    dashed: {borderStyle: 'dashed'}
  }
}))

var modifier = {error: true, kind: 'dotted'}
mixins.get('label', modifier) // {color: 'red', borderStyle: 'dotted'}
```
You can add some optional part to your style as objects and activate them with the values of the modifier object.
Nested parts will be also resolved:
```javascript
mixins.set('label', () => ({
  color: 'white',
  primary: {
    color: 'blue'
  },
  hover: {
    color: 'navy',
    primary: {
      color: 'teal'
    }
  }
}))

var modifier = {primary: true, hover: true}
mixins.get('label', modifier) // {color: 'teal'}
```
#####[JS Bin][jsbin-nested-modifiers]

Modifiers is passed as the second argument to the style source so you you can use it to get other styles with the same modifier:
```javascript
mixins.set('label', (theme, modifier) => {
  var { lineHeight } = mixins.get('config', modifier)
  return {
    //mixins are automatically resolved with the given modifier
    mixins: ['font', 'roundedBorders'],
    lineHeight
  }
})
var style = mixins.get('label', {size: 'xl'})
```
#####[JS Bin][jsbin-modifiers-logic]
###Extending source
```mixins.set(name, source)``` simply replaces  the old source if the theme has one with the same name. If you want to keep the original source and extend with an other one you can use ```mixins.extend(name, source)```:
```javascript
mixins.set('label', () => ({
  color: 'lime',
  bordered: {
    borderStyle: 'double',
    resize: 'both'
  }
}))
mixins.extend('label', () => ({
  bordered: {
    borderStyle: 'groove'
  }
}))

var modifier = {bordered: true}
mixins.get('label', modifier)
// {color: 'lime', borderStyle: 'groove', resize: 'both'}
```