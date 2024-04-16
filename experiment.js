class Experiment {
  // Candidate Details
  static rollNo = '10983743'
  static name = 'The Tutor'
}

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
      x < x0,			// first bit code
      (x0+w) < x,		// second bit code
      y < y0,			// third bit code
      (y0+h) < y,		// fourth bit code
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
    let dx,dy, rx,ry, bq,bp

    bp = this.vw.beta(px,py)
    bq = this.vw.beta(qx,qy)

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

    console.log({bp, bq})

    if (bp == 0 && bq==0) {
      // trivial accept
      console.log({trivialAccept: true,
		   p: [px,py],
		   q: [qx,qy],})
      return [
	[px,py],			// line start point
	[qx,qy],			// line end point
      ]
    }

    if ((bp&bq) != 0) {
      // trivial reject
      console.log({trivialReject: true})
      return ClipBase.NOT_IN_WINDOW
    }

    if (bp == 0) {
      // swap p,q & bp,bq
      console.log({
	p:[px,py],
	q:[qx,qy],});
      [px,py,qx,qy,bp,bq] = [qx,qy,px,py,bq,bp]
      console.log({swapping: true,
		   p:[px,py],
		   q:[qx,qy],})
    }

    dx = qx-px
    dy = qy-py

    if (bp < 4) {
      rx = x0 + ((bp&2) ? w : 0)
      ry = py + (dy/dx)*(rx-px)
    }

    else {
      ry = y0 + ((bp&8) ? h : 0)
      rx = px + (dx/dy)*(ry-py)
    }

    console.log({rx,ry,px,py,qx,qy,x0,y0,w,h,bp,bq})

    return this.getClippedLine(
      [rx,ry],			// line start point
      [qx,qy],			// line end point
    )
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
