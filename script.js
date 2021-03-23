let TIME_LIMIT = 20;
let SECONDS_REMAINING = TIME_LIMIT;
let SCORE = 0;

// Retrieves a random quote from Quotable API and displays each character in its own span
const getQuote = () => {
    $.get("https://api.quotable.io/random", response => {
        const quoteCharacters = response.content.split("");
        $("#quote").html(null);
        $("#message").text(null);
        for (character of quoteCharacters) {
            $("#quote").append("<span>" + character + "</span>");
        }
        $("#input").val(null);
        $("#input").focus();
        $("#score").text(SCORE);
        SECONDS_REMAINING = TIME_LIMIT + 1;
        $("#time-limit").text(TIME_LIMIT);
    }, "json");
}

// Decrements the seconds remaining and displays a game over message when time's up
const countdown = () => {
    if (SECONDS_REMAINING > 0) {
        SECONDS_REMAINING--;
    } else {
        $("#message").text("Game Over!");
    }
    $("#time-left").text(SECONDS_REMAINING);
}

// Retrieves a quote and starts the timer on page load/reload
getQuote();
setInterval(countdown, 1000);

/*
Any time there is input in the text box, the character typed is compared to the character
at the same position in the quote and its color will change accordingly.

A new quote will be retrieved only if all the characters were typed correctly before time expired.
*/
$("#input").on("input", () => {
    let typedCorrect = true;
    $("#quote span").each((index, span) => {
        const inputCharacters = $("#input").val().split("");
        if (inputCharacters[index] == undefined) {
            $(span).removeClass("border-bottom border-danger border-3");
            $(span).removeClass("text-danger");
            $(span).removeClass("text-success");
            typedCorrect = false;
        } else if (inputCharacters[index] === $(span).text()) {
            $(span).removeClass("text-danger");
            $(span).removeClass("border-bottom border-danger border-3");
            $(span).addClass("text-success");
        } else { // characters don't match
            if ($(span).text() === " ") {
                $(span).addClass("border-bottom border-danger border-3");
            } else {
                $(span).removeClass("text-success");
                $(span).addClass("text-danger");
            }
            typedCorrect = false;
        }
    });
    if (typedCorrect && SECONDS_REMAINING > 0) {
        SCORE++;
        getQuote();
    }
});

// Changes number of seconds provided to type a quote
const changeTimeLimit = numSeconds => {
    TIME_LIMIT = numSeconds;
    $("#10").removeClass("border-primary border-5");
    $("#15").removeClass("border-primary border-5");
    $("#20").removeClass("border-primary border-5");
    $(`#${numSeconds}`).addClass("border-primary border-5");
}

$("#10").click(() => {
    changeTimeLimit(10);
});

$("#15").click(() => {
    changeTimeLimit(15);
});

$("#20").click(() => {
    changeTimeLimit(20);
});

// Starts a new game by resetting the score and getting a new quote
$("#new-game").click(() => {
    SCORE = 0;
    getQuote();
});