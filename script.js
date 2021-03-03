// TODO:
// add countdown timer from 10 or any number
// display a Game Over message when the countdown hits 0
// refactor to jQuery

// ids to manipulate:
// time-limit
// message
// time-left
// score
// high-score

$(document).ready(function() {
    const randomQuotesURL = "http://api.quotable.io/random"
    const phrase = document.getElementById("phrase")
    const input = document.getElementById("input")
    document.getElementById("score").innerText = 0
    let score = 0
    
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
    }
    
    getNextQuote()
})