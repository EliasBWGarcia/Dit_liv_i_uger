const btn = document.querySelector("#calculateBtn")


btn.addEventListener("click", () => {
    const dateOfBirth = document.querySelector("#dateOfBirth").value
    const gender = document.querySelector("#gender").value
    const country = document.querySelector("#country").value
    weeksLived = undefined
    weeksLeft = undefined

    fetch(`/api/time-lived/${dateOfBirth}`)
        .then(response => response.json())
        .then(data => {
            let secondsLived = data.secondsLived

            weeksLived = data.weeksLived
            createWeekBoxes()

            setInterval(() => {
                secondsLived++
                document.querySelector("#secondsLived").textContent =`Du har levet i ${secondsLived} sekunder`
            }, 1000)

            document.querySelector("#livedHeader").textContent = "Tid der er gået siden du blev født"
            document.querySelector("#yearsLived").textContent = `Du har levet i ${data.yearsLived} år`
            document.querySelector("#weeksLived").textContent = `Du har levet i ${data.weeksLived} uger`
            document.querySelector("#daysLived").textContent = `Du har levet i ${data.daysLived} dage`
            document.querySelector("#hoursLived").textContent = `Du har levet i ${data.hoursLived} timer`
            document.querySelector("#minutesLived").textContent = `Du har levet i ${data.minutesLived} minutter`
        })

    fetch(`/api/time-left/${dateOfBirth}/${gender}/${country}`)
        .then(response => response.json())
        .then(data => {
            weeksLeft = data.weeksLeft
            createWeekBoxes()

             let secondsLeft = data.secondsLeft

            setInterval(() => {
                secondsLeft--
                document.querySelector("#secondsLeft").textContent =`Du har ${secondsLeft} sekunder tilbage af dit liv`
            }, 1000)

            document.querySelector("#remainingHeader").textContent = "Estimeret tid tilbage"
            document.querySelector("#yearsLeft").textContent = `Du har ${data.yearsLeft} år tilbage af dit liv`
            document.querySelector("#weeksLeft").textContent = `Du har ${data.weeksLeft} uger tilbage af dit liv`
            document.querySelector("#daysLeft").textContent = `Du har ${data.daysLeft} dage tilbage af dit liv`
            document.querySelector("#hoursLeft").textContent = `Du har ${data.hoursLeft} timer tilbage af dit liv`
            document.querySelector("#minutesLeft").textContent = `Du har ${data.minutesLeft} minutter tilbage af dit liv`   
        })
})

function createWeekBoxes() {
    const weeksGrid = document.querySelector("#weeksGrid")
    document.querySelector("#weeksHeader").textContent = "Hver fyldt kasse repræsenterer en uge, du har levet, mens de hvide kasser viser de uger, du estimeres at have tilbage"

    if (weeksLived == undefined || weeksLeft == undefined) {
        return
    }

    weeksGrid.innerHTML = ""
    for (let i = 0; i < weeksLived; i++) {
        const week = document.createElement("div")
        week.classList.add("weekBox")
        week.classList.add("weekLived")
        weeksGrid.appendChild(week)
    }

    for (let i = 0; i < weeksLeft; i++) {
        const week = document.createElement("div")
        week.classList.add("weekBox")
        week.classList.add("weekLeft")
        weeksGrid.appendChild(week)
    }
}