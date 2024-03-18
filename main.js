function main() {
  const experiments = [
    {
      sel: "#canvas-sutherland-cohen",
      clip: SutherlandCohenClip,
    },
    {
      sel: "#canvas-liang-barsky",
      clip: LiangBarskyClip,
    },
  ]

  for (const {sel, clip} of experiments) {
    new Experiment(sel, clip).draw()
  }
}
