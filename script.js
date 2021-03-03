// TODO:
// refactor to jQuery

$(document).ready(function() {
    const randomQuotesURL = "http://api.quotable.io/random"
    const phrase = document.getElementById("phrase")
    const input = document.getElementById("input")
    let score = 0
    let secondsRemaining = 60
    document.getElementById("score").innerText = score
    document.getElementById("time-limit").innerText = secondsRemaining
    document.getElementById("time-left").innerText = secondsRemaining
    
    input.addEventListener("input", () => {
        console.log("changed")
        const phraseCharArray = phrase.querySelectorAll("span")
        const inputCharArray = input.value.split("")
        let typedCorrect = true
        phraseCharArray.forEach((characterSpan, index) => {
            const character = inputCharArray[index]
            if (character == null) {
                characterSpan.classList.remove("text-danger")
                characterSpan.classList.remove("text-success")
                typedCorrect = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add("text-success")
                characterSpan.classList.remove("text-danger")
            } else {
                characterSpan.classList.add("text-danger")
                characterSpan.classList.remove("text-success")
                typedCorrect = false
            }
        })
        if (typedCorrect) {
            score++
            document.getElementById("score").innerText = score
            getNextQuote()
        }
    })


    
    function getRandomQuote() {
        return fetch(randomQuotesURL)
            .then(response => response.json())
            .then(data => data.content)
    }
    
    async function getNextQuote() {
        const quote = await getRandomQuote()
        phrase.innerHTML = ""
        quote.split("").forEach(character => {
            const characterSpan = document.createElement("span")
            characterSpan.innerText = character
            phrase.appendChild(characterSpan)
        })
        input.value = null
        setInterval(countdown, 1000)
    }

    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--
        } else {
            document.getElementById("message").innerText = "Time's Up!"
        }
        document.getElementById("time-left").innerText = secondsRemaining
    }

    getNextQuote()

    document.getElementById("new-game").onclick = function() {location.reload()}
})