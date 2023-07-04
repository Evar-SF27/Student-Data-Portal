function updateSubjectMenu() {
    let subjectElement = document.getElementById("subject-select")
    subjectElement.addEventListener("change", () => {
        let subject = document.querySelector("#subject-select").value
        action('setSelectedSubject', subject)
    })
    
    console.log(state.selectedSubject)
} 

function updateYearMenu() {
    let yearElement = document.getElementById("year-select")
    yearElement.addEventListener("change", () => {
        let year = document.querySelector("#year-select").value
        action('setSelectedYear', year)
    })
    
    console.log(state.selectedYear)
} 