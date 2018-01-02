const React = require('react')
const p5 = require('p5')
const PropTypes = require('prop-types')

/**
  A React component that uses Processing to apply image processing filter.
  Provides a better abstraction for dealing with RGB values and alpha channel in images
  Applies the RGB and alpha transparency and returns a new canvas
*/
class ImageTint extends React.Component {
  static propTypes = {
    canvas: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      renderer: PropTypes.string,
    }),
    tint: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.string,
      PropTypes.objectOf(PropTypes.number)
    ]),
    src: PropTypes.string,
  }

  // Render the sketch and return a new canvas displaying the edited image
  renderSketch = pObj => {
    const { tint, src, canvas } = this.props

    const dispatch = fns => {
      fns.forEach(fn => {
        if (typeof fn !== undefined && typeof fn === 'function') {
          pObj[fn.name] = fn
        } else {
          console.warn(
            `Expected a function, got ${typeof fn} instead. Refere to P5.js documentation for more information`
          )
        }
      })
    }

    // Start Processing
    this.renderImage(pObj, dispatch, tint, src, canvas)
  }

  // Apply the various types of values feeded to 'tint' prop
  applyTintValues = (processing, tint) => {
    if (Array.isArray(tint)) {
      const [a,b,c,d] = tint
      return processing.tint(a,b,c,d)
    } else if (typeof tint === 'object' && ('color' in tint || 'alpha' in tint)) {
      return processing.tint(tint.color, tint.alpha)
    } else if (typeof tint === 'string') {
      return processing.tint(tint)
    } else return processing.tint('white')
  }

  // Processing core
  renderImage = (processing, dispatch, tint, src, { height, width, renderer }) => {
    let img

    // Choose renderer type
    getRendererType = (name) => name === 'WEBGL' ? processing.WEBGL : processing.P2D

    // Load the image from the src (Called once)
    preload = () => {
      img = processing.loadImage(src)
    }

    // Called once
    setup = () => {
      processing.createCanvas(width, height, getRendererType(renderer))
      processing.image(img, 0, 0)
      this.applyTintValues(processing, tint)
      processing.image(img, 0, 0)
    }

    // Start Processing
    dispatch([preload, setup])
  }

  // Returns the new canvas
  getCanvas = () => new p5(this.renderSketch, this.wrapper)

  wrapper = props => {
    const { canvas, src, tint, ...rest } = props

    return (
      <div id="react-p5" ref={wrapper => (this.wrapper = wrapper)} {...rest} />
    )
  }

  componentDidMount = () => this.getCanvas()

  render() {
    return this.wrapper(this.props)
  }
}

module.exports = ImageTint
