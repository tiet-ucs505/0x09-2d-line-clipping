# 0x09 : 2D Line Clipping #

|                  |                                     |
|------------------|-------------------------------------|
| Code             | 0x09                                |
| Submission Opens | Fri 19 Apr 2024 17:00 hrs           |
| Deadline         | Mon 22 Apr 2024 08:00 hrs           |
| Weightage        | 2 marks                             |
| Remark           | 3CS6 to have an extra lab on 19-Apr |

## Assignment ##

### Step 1 : Sutherland Cohen Bitcodes ###

Complete the function
[`ViewWindow.beta`](./clip-algo.js#L15-L42)

Compute the bitcodes of the point `(x,y)`, with respect,
to a view window, with min coordinates as `(x0,y0)`
and size as `(w,h)`

### Step 2 : Sutherland Cohen Algorithm ###

Given line end points as `[px,py]` and `[qx,qy]`,
complete the function
[`SutherlandCohenClip.getClippedLine`](./clip-algo.js#L63-L88)
so that it computes the end points of the clipped line,
and returns it; or else returns a symbol
`ClipBase.NOT_IN_WINDOW` to signal complete rejection.

### Step 3 : Liang-Barsky Algorithm ###

Given line end points as `[px,py]` and `[qx,qy]`,
complete the function
[`LiangBarskyClip.getClippedLine`](./clip-algo.js#L92-L116)
so that it computes the end points of the clipped line,
and returns it; or else returns a symbol
`ClipBase.NOT_IN_WINDOW` to signal complete rejection.

## Refresher ##

### Sutherland Cohen BitCodes ###

4-bits of a number, when set, would indicate that the
point lies in the corresponding rejection region.

+ Bit-0 : point lies on the left of the window
+ Bit-1 : point lies on the right of the window
+ Bit-2 : point lies below the window
+ Bit-3 : point lies above the window

*PS*: Bit-0 is the least significant bit, and the
rightmost.

### Sutherland Cohen Algorithm ###

Given
($\mathbf{p},\mathbf{q},\mathbf{w}_0,\mathbf{w}_s$),
and Sutherland-Cohen Bitcode operator $\beta_W(\cdot)$,
corresponding to window
$W=[\mathbf{w}_0,\mathbf{w}_s]^T$,

Define `Function SUTHERLAND_COHEN_CLIP`
($\mathbf{p},\mathbf{q},\mathbf{w}_0,\mathbf{w}_s$) :
+ `If` ($\beta_W(\mathbf{p}) = \beta_W(\mathbf{q}) =
  0$) :
  + `Comment: ` This is a **trivial accept** case
  + `Return` $[\mathbf{p},\mathbf{q}]$
  + `EndIf`
+ `If` ($\beta_W(\mathbf{p}) \wedge \beta_W(\mathbf{q}) \ne
  0$) :
  + `Comment: ` This is a **trivial reject** case
  + `Return Signal "Not in window"` 
  + `EndIf`
+ `If` ($\beta_W(\mathbf{p}) = 0$) :
  + `Comment: ` Realign so that $\mathbf{p}$ is in a
    rejection zone.
  + `SWAP`($\mathbf{p}$,$\mathbf{q}$)
  + `EndIf`
+ `Comment:` $\mathbf{w}_0 \equiv [x_0,y_0]^T$,
  $\mathbf{w}_s \equiv [w,h]^T$, $\mathbf{p} \equiv
  [x_p,y_p]^T$,  $\mathbf{q} \equiv [x_q,y_q]^T$
+ `Comment:` Define the x and y differentials
+ $\delta_x\gets x_q-x_p$  
+ $\delta_y\gets y_q-y_p$  
+ `If` ($\beta_W(\mathbf{p}) < 4$) :
  + `Comment:` Compute intersection with left or right
    rejection planes
  + $x_r\gets x_0 + I[\beta_W(p)=2]\cdot w$
  + $y_r\gets y_p + (\delta_y/\delta_x)\cdot x_r$
+ `Else` :
  + `Comment:` Compute intersection with top or bottom
    rejection planes
  + $y_r\gets y_0 + I[\beta_W(p)=8]\cdot w$
  + $x_r\gets x_p + (\delta_x/\delta_y)\cdot y_r$
  + `EndIf`
+ `Comment:` $\mathbf{r} \equiv [x_r,y_r]^T$
+ `Return SUTHERLAND_COHEN_CLIP`
  ($\mathbf{r},\mathbf{q},\mathbf{w}_0,\mathbf{w}_s$)
  

### Liang Barsky Algorithm ###

Given
($\mathbf{p},\mathbf{q},\mathbf{w}_0,\mathbf{w}_s$),
and Sutherland-Cohen Bitcode operator $\beta_W(\cdot)$,
corresponding to window
$W=[\mathbf{w}_0,\mathbf{w}_s]^T$,

Define `Function LIANG_BARSKY_CLIP`
($\mathbf{p},\mathbf{q},\mathbf{w}_0,\mathbf{w}_s$) :
+ `Comment:` $\mathbf{w}_0 \equiv [x_0,y_0]^T$,
  $\mathbf{w}_s \equiv [w,h]^T$, $\mathbf{p} \equiv
  [x_p,y_p]^T$,  $\mathbf{q} \equiv [x_q,y_q]^T$
+ `Comment:` Define the x and y differentials
+ $\delta_{qx}\gets x_q-x_p; \quad \delta_{0x}\gets x_0-x_p$  
+ $\delta_{qy}\gets y_q-y_p; \quad \delta_{0y}\gets y_0-y_p$  
+ `Comment:` Define intersection parameters, $t_i :
  \mathbf{r}_i=\mathbf{p}+t_i(\mathbf{q}-\mathbf{p})$,
  corresponding to points of intersection of infinite
  line $\overline{\mathbf{p}\mathbf{q}}$ with the four
  bounding planes of the viewing window.
+ $t_0 \gets \delta_{0x}/\delta_{qx}; \quad t_1 \gets t_0 +
  w/\delta_{qx}$
+ $t_2 \gets \delta_{0y}/\delta_{qy}; \quad t_3 \gets
  t_2 + h/\delta_{qy}$
+ `Comment:` Order $t_i$ 's along the direction of
  traversal.
+ `If` $0<\delta_{qx}$ :
  + `SWAP` ($t_0,t_1$)
  + `EndIf`
+ `Comment: [Invariant]` $t_0$ is outside to inside and
  $t_1$ is inside to outside.
+ `If` $0<\delta_{qy}$ :
  + `SWAP` ($t_2,t_3$)
  + `EndIf`
+ `Comment: [Invariant]` $t_2$ is outside to inside and
  $t_3$ is inside to outside.
+ `Comment:` Determine outside to inside in all
  directions.
+ $u\gets\max(0,t_0,t_2); \quad v\gets\min(1,t_1,t_3)$
+ `If` ($v<u$) :
  + `Comment:` The line is outside the clipping window.
  + `Return Signal "Not in window"` 
  + `EndIf`
+ `Comment:` Compute the points and return.
+ $x_q \gets x_p + v \delta_{qp}; \quad y_q \gets y_p +
  v \delta_{qp}$
+ $x_p \gets x_p + u \delta_{qp}; \quad y_p \gets y_p +
  u \delta_{qp}$
+ `Comment:` $\mathbf{p} \equiv [x_p,y_p]^T$,
  $\mathbf{q} \equiv [x_q,y_q]^T$
+ `Return` $[\mathbf{p},\mathbf{q}]$
