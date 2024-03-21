function main() {
  const lineClipConfigs = [
    {
      sel: "#canvas-sutherland-cohen",
      clip: SutherlandCohenClip,
    },
    {
      sel: "#canvas-liang-barsky",
      clip: LiangBarskyClip,
    },
  ]

  for (const {sel, clip} of lineClipConfigs) {
    new LineClipSetup(sel, clip).draw()
  }
}
