// script gets called after document has loaded
$(function() {
    let TIME_LIMIT = 15 // seconds per phrase
    let SECONDS_REMAINING = TIME_LIMIT
    let SCORE = 0

    // gets a quote from an API that produces random quotes
    function getRandomQuote() {
        return fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(data => data.content)
    }

    // grabs the quote and displays it
    // makes each character its own span
    async function getNextQuote() {
        const quote = await getRandomQuote()
        $("#phrase").html(null)
        // refactor below to jquery
        quote.split("").forEach(character => {
            const characterSpan = document.createElement("span")
            $(characterSpan).text(character)
            $("#phrase").append(characterSpan)
        })
        $("#input").val(null)
        $("#score").text(SCORE)
        SECONDS_REMAINING = TIME_LIMIT + 1
    }

    function countdown() {
        if (SECONDS_REMAINING > 0) {
            SECONDS_REMAINING--
        } else {
            $("#message").text("Game Over!")
        }
        $("#time-left").text(SECONDS_REMAINING)
    }

    $(".time-limit").text(TIME_LIMIT)
    getNextQuote()
    setInterval(countdown, 1000)

    $("#input").on("input", function() {
        let typedCorrect = true
        $("#phrase span").each(function(index) {
            const character = $("#input").val().split("")[index]
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
        if (typedCorrect && SECONDS_REMAINING > 0) {
            SCORE++
            getNextQuote()
        }
    })

    $("#new-game").click(function() {
        SCORE = 0
        getNextQuote()
        $("#input").focus()
        $("#message").text(null)
    })
})