# react-tint

![size-label](https://img.shields.io/badge/size-4.3%20KB-brightgreen.svg)

> A React component that applies image processing filters to an image using Processing

<img src="./art/Demo.gif">

## Install

```
yarn add react-tint
```

This package also depends on React, so make sure you've already installed it.

## Usage

`react-tint` exposes only a single component, `<ImageTint />`, that takes [different props]() as filters and an image, and applies them and returns a new canvas.

```js
import React, { Component } from 'react'
import ImageTint from 'react-tint'

class App extends Component {
  render() {
    return (
      <ImageTint
        canvas={{ height: 500, width: 500, renderer: 'P2D' }}
        tint="blue"
        src="Sunflower.jpg"
        style={{ margin: 'auto', width: '50%', padding: '20px' }}
      />
    )
  }
}
```

## API

### ImageTint

A component that applies image processing filters using Processing.

#### Props

* **`canvas`**

`canvas` prop takes an object with three properties - `height`, `width` and a `renderer` type.

Example -

```js
<ImageTint canvas={{ width: 200, height: 200, renderer: 'WEBGL'}} />
```

Two types of renderers are supported, **WEBGL** and **P2D**.

The P2D renderer uses OpenGL for faster rendering of two-dimensional graphics but at the expense of speed.

* **`tint`**

`tint` takes different types of data for an image. It can take a simple **string of color name**, **array of values** that includes Red, Green, Blue and alpha value for image transparency and **an object that describes color and alpha channel**.

Example -

**Color name**

```js
<ImageTint tint="red" />
```

**Array of values**

```js
<ImageTint tint={[100, 120, 100, 65]} />
```

This array corresponds to => `[RED, GREEN, BLUE, ALPHA]`

**Object describing color and alpha value**

```js
<ImageTint tint={{ color: 255, alpha: 30 }}
```

The above code retains the original color of an image and applies transparency with value `30`.

So its up to you how declare the values using the `tint` prop.

* **`src`**

`src` prop takes an image path

Example -

```js
<ImageTint src="path/to/image"
```

## License

MIT
