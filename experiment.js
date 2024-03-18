class Canvas {
  sel
  constructor (sel) {
    this.sel = sel
    canvasSetup(sel)
  }
  get canvas() {
    const canvas = document.querySelector(this.sel)
    return canvas
  }
  get ctx() {
    return this.canvas.getContext('2d')
  }
  get W() {
    return this.canvas.width
  }
  get H() {
    return this.canvas.height
  }
}

class Experiment extends Canvas {
  clip
  lines

  constructor(sel, ClipClass, N=10) {
    super(sel)

    this.clip = new ClipClass(...this.randomViewWindow)

    this.lines = ([...new Array(N).keys()])
      .map(() => (this.randomLine))
  }

  draw() {
    this.drawViewWindow()
    for (let [[px,py],[qx,qy]] of this.lines) {
      this.drawGrayLine([px,py], [qx,qy]);

      const result
	= this.clip.getClippedLine ([px,py],[qx,qy])

      if (result !== ClipBase.NOT_IN_WINDOW) {
	console.log({drawingRedLine:[[px,py],[qx,qy]]})
	[[px,py],[qx,qy]] = result
	this.drawRedLine([px,py], [qx,qy]);
      }

    }
  }

  drawViewWindow() {
    const ctx = this.ctx
    const {x0,y0,w,h} = this.clip.vw

    ctx.save()

    ctx.fillStyle='#f3fede'
    ctx.fillRect(x0,y0,w,h)

    ctx.lineWidth = 4
    ctx.strokeStyle='#eecc00'
    ctx.strokeRect(x0,y0,w,h)

    ctx.restore()
  }

  drawGrayLine([px,py], [qx,qy]) {
    const ctx = this.ctx
    ctx.save()

    ctx.lineWidth = 2
    ctx.strokeStyle='#cccccc'
    ctx.beginPath()
    ctx.moveTo(px,py)
    ctx.lineTo(qx,qy)
    ctx.stroke()

    ctx.fillStyle='#888822'
    ctx.beginPath()
    ctx.arc(px,py,2.5,0,6.28318530718)
    ctx.arc(qx,qy,2.5,0,6.28318530718)
    ctx.fill()

    ctx.restore()
  }

  drawRedLine([px,py], [qx,qy]) {
    const ctx = this.ctx
    ctx.save()

    ctx.lineWidth = 2
    ctx.strokeStyle='#de4500'
    ctx.beginPath()
    ctx.moveTo(px,py)
    ctx.lineTo(qx,qy)
    ctx.stroke()

    ctx.fillStyle='#884422'
    ctx.beginPath()
    ctx.arc(px,py,2,0,6.28318530718)
    ctx.arc(qx,qy,2,0,6.28318530718)
    ctx.fill()

    ctx.restore()
  }

  get randomViewWindow() {
    const _f = 0.25
    const {H,W} = this
    const x0 = Math.floor(Math.random() * W*0.5)
    , y0 = Math.floor(Math.random() * H*0.5)
    , w = Math.floor((W-x0)*_f + Math.random() * (W-x0)*(1-_f))
    , h = Math.floor((H-y0)*_f + Math.random() * (H-y0)*(1-_f))
    return [x0, y0, w, h]
  }

  get randomLine() {
    const {H,W} = this
    return [
      [Math.floor(Math.random() * W),
       Math.floor(Math.random() * H)],
      [Math.floor(Math.random() * W),
       Math.floor(Math.random() * H)],
    ]
    // return [
    //   [Math.floor(Math.random() * W*0.5),
    //    Math.floor(Math.random() * H*0.5)],
    //   [Math.floor(0.5*W + Math.random() * W*0.5),
    //    Math.floor(0.5*H + Math.random() * H*0.5)],
    // ]
  }
}
