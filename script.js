$(function() {
    let secondsRemaining = 20
    $(".time-limit").text(secondsRemaining)
    $("#time-left").text(secondsRemaining)
    let score = 0

    function getRandomQuote() {
        return fetch("http://api.quotable.io/random")
            .then(response => response.json())
            .then(data => data.content)
    }

    async function getNextQuote() {
        const quote = await getRandomQuote()
        $("#phrase").html(null)
        quote.split("").forEach(character => { // refactor to jquery
            const characterSpan = document.createElement("span") // refactor to jquery
            $(characterSpan).text(character)
            $("#phrase").append(characterSpan)
        })
        $("#input").val(null)
        $("#score").text(score)
    }

    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--
        } else {
            $("#message").text("Game Over!")
        }
        $("#time-left").text(secondsRemaining)
    }

    getNextQuote()
    setInterval(countdown, 1000)

    $("#input").on("input", function() {
        const inputCharArray = $("#input").val().split("")
        let typedCorrect = true
        $("#phrase span").each(function(index) {
            const character = inputCharArray[index]
            if (character == null) {
                $(this).removeClass("text-danger")
                $(this).removeClass("text-success")
                typedCorrect = false
            } else if (character === $(this).text()) {
                $(this).addClass("text-success")
                $(this).removeClass("text-danger")
            } else {
                $(this).addClass("text-danger")
                $(this).removeClass("text-success")
                typedCorrect = false
            }
        })
        if (typedCorrect && secondsRemaining > 0) {
            secondsRemaining = 21
            score++
            getNextQuote()
        }
    })

    $("#new-game").click(function() {
        secondsRemaining = 21
        score = 0
        getNextQuote()
        $("#input").focus()
        $("#message").text(null)
    })
})