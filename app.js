// Jeg har brugt documentation fra MDN til at læse op på Date objektet: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

const express = require("express")
const app = express()
const path = require("path")
const port = 8080

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const week = day * 7
const year = week * 52 

const lifeExpectancyCountries = {
    // statistik er taget fra https://www.dst.dk/da/Statistik/emner/borgere/befolkning/middellevetid
    // Man kunne evt. tilføje flere lande, eller finde et eksternt API over landsgennemsnitter
    Denmark: {
        male: 80,
        female: 84
    }
}

app.use(express.static(path.join(__dirname, "frontend")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "frontPage.html"));
});

app.get("/api/time-left/:dateOfBirth/:gender/:country", (req, res) => {
    const dateOfBirth = new Date(req.params.dateOfBirth)
    const gender = req.params.gender
    const country = req.params.country

    
    const ExpectedAge = lifeExpectancyCountries[country][gender]
    const currentDate = new Date()

    const dateOfExpectedLifeEnd = new Date(
        dateOfBirth.getFullYear() + ExpectedAge,
        dateOfBirth.getMonth(),
        dateOfBirth.getDate()
    )

    const timeLeft = dateOfExpectedLifeEnd - currentDate

    const secondsLeft = Math.floor(timeLeft / second)
    const minutesLeft = Math.floor(timeLeft / minute)
    const hoursLeft = Math.floor(timeLeft / hour)
    const daysLeft = Math.floor(timeLeft / day)
    const weeksLeft = Math.floor(timeLeft / week)
    const yearsLeft = Math.floor(timeLeft / year)

    res.json({
        averageLifeExpectancy: ExpectedAge,
        dateOfExpectedLifeEnd: dateOfExpectedLifeEnd,
        yearsLeft: yearsLeft,
        weeksLeft: weeksLeft,
        daysLeft: daysLeft,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft,
        secondsLeft: secondsLeft
    })
})


app.get("/api/time-lived/:dateOfBirth", (req, res) => {
    const dateOfBirth = new Date(req.params.dateOfBirth)
    const currentDate = new Date()

    const timeLived = currentDate - dateOfBirth

    const secondsLived = Math.floor(timeLived / second)
    const minutesLived = Math.floor(timeLived / minute)
    const hoursLived = Math.floor(timeLived / hour)
    const daysLived = Math.floor(timeLived / day)
    const weeksLived = Math.floor(timeLived / week)
    const yearsLived = Math.floor(timeLived / year)

    res.json({
        yearsLived: yearsLived,
        weeksLived: weeksLived,
        daysLived: daysLived,
        hoursLived: hoursLived,
        minutesLived: minutesLived,
        secondsLived: secondsLived
    })
})

app.listen(port, () => {
    console.log("App listening on port", port)
})