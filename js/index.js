let data
function dataIsReady(csv) {
    data = csv
    update()
}

function transformData(data) {
    return {
        year: data.year,
        subject: data.subject,
        number: parseInt(data.number)
    }
}

data = d3.csv('data/data.csv', transformData).then(dataIsReady)
