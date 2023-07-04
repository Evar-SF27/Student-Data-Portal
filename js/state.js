let state = {
    selectedYear: '2011-12',
    selectedSubject: 'Bio'
}

function action(type, params) {
    switch (type) {
        case 'setSelectedYear':
            state.selectedYear = params
            break

        case 'setSelectedSubject':
            state.selectedSubject = params
            break
    }

    update()
}