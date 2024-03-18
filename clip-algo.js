class BitCode {
  n
  constructor(B) {
    B.forEach((b,i) => {
      this.n |= b<<i
    })
  }
  valueOf() {
    // Allow type-coercion with operations like
    // new BitCode(B1) | new BitCode(B2)
    return this.n
  }
}

class ViewWindow {
  x0				// x_min
  y0				// y_min
  w				// width
  h				// height
  constructor(x0,y0,w,h) {
    this.x0 = x0
    this.y0 = y0
    this.w = w
    this.h = h
  }
  beta (x,y) {
    const {x0,y0,w,h} = this

    // ------------------------------------------------
    // FIXME
    // ------------------------------------------------
    // Compute the bitcodes of the point (X,Y), with
    // respect, to a view window, with min coordinates
    // as (X0,Y0) and size as (W,H)
    // ------------------------------------------------

    return new BitCode([
      0,			// first bit code
      0,			// second bit code
      0,			// third bit code
      0,			// fourth bit code
    ])
  }
}

class ClipBase {
  static NOT_IN_WINDOW = Symbol('NotInWindow')
  vw				// view window
  constructor ( x0,y0,		// window min
		w,h,		// window size
	      ) {
    this.vw = new ViewWindow(x0,y0,w,h)
  }
  getClippedLine(
    [px,py],			// line start point
    [qx,qy],			// line end point
  ) {
    // Not Implmented here
    throw Error({implemented: false})
  }  
}

class SutherlandCohenClip extends ClipBase {
  getClippedLine(
    [px,py],			// line start point
    [qx,qy],			// line end point
  ) {
    const bp = this.vw.beta(px,py)
    const bq = this.vw.beta(qx,qy)
    const {x0,y0,w,h} = this.vw

    // ------------------------------------------------
    // FIXME
    // ------------------------------------------------
    // Given PX,PY, QX,QY as their input and having
    // computed their corresponding bit-codes as BP,
    // BQ, compute and return the clipped line
    // [[PX,PY], [QX,QY]] inside the window, or
    // ClipBase.NOT_IN_WINDOW if completely outside.
    // ------------------------------------------------

    return ClipBase.NOT_IN_WINDOW

    // return [
    //   [px,py],			// line start point
    //   [qx,qy],			// line end point
    // ]
  }  
}

class LiangBarskyClip extends ClipBase {
  getClippedLine(
    [px,py],			// line start point
    [qx,qy],			// line end point
  ) {
    const bp = this.vw.beta(px,py)
    const bq = this.vw.beta(qx,qy)
    const {x0,y0,w,h} = this.vw

    // ------------------------------------------------
    // FIXME
    // ------------------------------------------------
    // Given PX,PY, QX,QY as their input and having
    // computed their corresponding bit-codes as BP,
    // BQ, compute and return the clipped line
    // [[PX,PY], [QX,QY]] inside the window, or
    // ClipBase.NOT_IN_WINDOW if completely outside.
    // ------------------------------------------------

    return ClipBase.NOT_IN_WINDOW

    // return [
    //   [px,py],			// line start point
    //   [qx,qy],			// line end point
    // ]
  }  
}
