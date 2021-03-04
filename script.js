$(function() {
    const phrase = document.getElementById("phrase")
    const input = document.getElementById("input")
    let score = 0
    let timeLimit = 20
    let secondsRemaining = timeLimit
    // document.getElementById("score").innerText = score
    $("#score").text(score)
    // document.getElementById("time-limit").innerText = timeLimit
    $("#time-limit").text(timeLimit)
    // document.getElementById("time-left").innerText = timeLimit
    $("#time-left").text(timeLimit)

    input.addEventListener("input", () => {
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
            if (secondsRemaining > 0) {
                score++
                document.getElementById("score").innerText = score
                secondsRemaining = timeLimit + 1
                getNextQuote()
            }
        }
    })

    document.getElementById("new-game").onclick = function() {location.reload()}

    function getRandomQuote() {
        return fetch("http://api.quotable.io/random")
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
    
    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--
        } else {
            document.getElementById("game-over").innerText = "Game Over!"
        }
        document.getElementById("time-left").innerText = secondsRemaining
    }
    
    getNextQuote()
    setInterval(countdown, 1000)
})