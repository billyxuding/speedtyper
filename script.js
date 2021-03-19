let TIME_LIMIT = 20;
let SECONDS_REMAINING = TIME_LIMIT;
let SCORE = 0;

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

const countdown = () => {
    if (SECONDS_REMAINING > 0) {
        SECONDS_REMAINING--;
    } else {
        $("#message").text("Game Over!");
    }
    $("#time-left").text(SECONDS_REMAINING);
}

getQuote();
setInterval(countdown, 1000);

$("#input").on("input", () => {
    let typedCorrect = true;
    $("#quote span").each(function(index) {
        const inputCharacters = $("#input").val().split("");
        if (inputCharacters[index] == undefined) {
            $(this).removeClass("text-danger");
            $(this).removeClass("text-success");
            typedCorrect = false;
        } else if (inputCharacters[index] === $(this).text()) {
            $(this).removeClass("text-danger");
            $(this).addClass("text-success");
        } else {
            $(this).removeClass("text-success");
            $(this).addClass("text-danger");
            typedCorrect = false;
        }
    });
    if (typedCorrect && SECONDS_REMAINING > 0) {
        SCORE++;
        getQuote();
    }
});

const changeTimeLimit = numSeconds => {
    TIME_LIMIT = numSeconds;
    getQuote();
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

$("#new-game").click(() => {
    SCORE = 0;
    getQuote();
});