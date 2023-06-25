function layoutYear(data) {
    let layoutData = data

    return layoutData
}

function layoutSubject(data) {
  let layoutData = data.filter(d => d.year == "2011-12")

  return layoutData
}

function layoutMean(data) {
  let subjects = ["Bio", "Csc", "Econs", "Human Bio", "IR", "MSE", "ME", "PS", "Psy", "STS"]
  let d = []
  subjects.forEach(subj => {
    let temp = []
    let subject = {}

    data.map(d => d.subject == subj && temp.push(d.number))
    let sum = temp.reduce((acc, currentValue) => acc + currentValue, 0)
    
    subject["subject"] = subj
    subject["number"] = parseInt(sum/temp.length)
  
    d.push(subject)
  })

  return d
}

function layoutPercentage(data) {

}