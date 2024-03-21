function main() {
  const experiment = new Experiment()

  // Update Candidate Details
  updateCandidateDetails(Experiment)

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

function updateCandidateDetails({rollNo,name}) {
  let isValidRollNo, isValidName
  isValidRollNo = (isValidName = false)

  // Validate RollNo
  rollNo = Number(rollNo)
  isValidRollNo = !isNaN(rollNo) && 9999999 < rollNo
  if (!isValidRollNo) {
    console.warn({invalidRollNo: rollNo})
  }

  // Validate Name
  const titleCasePat = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/
  name = String(name).trim()
  isValidName = titleCasePat.test(name)
  if (!isValidName) {
    console.warn({invalidName: name})
  }
  
  if (isValidRollNo && isValidName) {
    document.querySelector('#by')
      .textContent = `By: ${name} (${rollNo})`
  }
}
