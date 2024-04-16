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
      (x < x0),			// first bit code
      (x0+w < x),			// second bit code
      (y < y0),			// third bit code
      (y0+h < y),			// fourth bit code
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

    bp = Number(this.vw.beta(px,py))
    bq = Number(this.vw.beta(qx,qy))
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
    console.log({p:[px,py,bp],
		 q:[qx,qy,bq],
		 w:[x0,y0,x0+w,y0+h]})

    if (bp == 0 && bq == 0) {
      console.log({trivialAccept: true})
      return [[px,py], [qx,qy]];
    }
    if ((bp&bq)) return ClipBase.NOT_IN_WINDOW;
    if (bp == 0) {
      // swap
      console.log({swapping: true});
      [px,py,bp, qx,qy,bq] = [qx,qy,bq, px,py,bp];
      console.log({p:[px,py,bp],
		   q:[qx,qy,bq],
		   w:[x0,y0,x0+w,y0+h]})
    }

    [dx, dy] = [qx-px, qy-py]
    if (bp < 4) {
      rx = x0 + ((bp&2) ? w : 0)
      ry = py + (dy/dx)*(rx-px)
    }

    else {
      ry = y0 + ((bp&8) ? h : 0)
      rx = px + (dx/dy)*(ry-py)
    }

    return this.getClippedLine([rx,ry], [qx,qy]) 

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
    let dqx,d0x,dqy,d0y, t0,t1,t2,t3, u,v

    const bp = this.vw.beta(px,py)
    const bq = this.vw.beta(qx,qy)
    const {x0,y0,w,h} = this.vw;

    // ------------------------------------------------
    // FIXME
    // ------------------------------------------------
    // Given PX,PY, QX,QY as their input and having
    // computed their corresponding bit-codes as BP,
    // BQ, compute and return the clipped line
    // [[PX,PY], [QX,QY]] inside the window, or
    // ClipBase.NOT_IN_WINDOW if completely outside.
    // ------------------------------------------------

    [dqx, d0x] = [qx-px, x0-px];
    [dqy, d0y] = [qy-py, y0-py];

    t0 = d0x/dqx
    t1 = t0+w/dqx
    t2 = d0y/dqy
    t3 = t1+h/dqy

    console.log({t0,t1,t2,t3, dqx,d0x,dqy,d0y})

    if (dqx<0) { [t0,t1]=[t1,t0] }
    if (dqy<0) { [t2,t3]=[t3,t2] }

    console.log({t0,t1,t2,t3, dqx,d0x,dqy,d0y});

    [u,v] = [Math.max(0,t0,t2), Math.min(1,t1,t3)]

    console.log({v,u})

    if (v<u) 
      return ClipBase.NOT_IN_WINDOW

    return [
      [px+u*dqx,py+u*dqy],
      [px+v*dqx,py+v*dqy],
    ]

    // return [
    //   [px,py],			// line start point
    //   [qx,qy],			// line end point
    // ]
  }  
}
