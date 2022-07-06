//Random Quotes Api URL
let rd= (Math.floor(Math.random() * 10) + 1).toString();


const page=["https://api.quotable.io/quotes?page=1",
          "https://api.quotable.io/quotes?page=2",
          "https://api.quotable.io/quotes?page=3",
          "https://api.quotable.io/quotes?page=4",
          "https://api.quotable.io/quotes?page=5",
          "https://api.quotable.io/quotes?page=6",
          "https://api.quotable.io/quotes?page=7",
          "https://api.quotable.io/quotes?page=8",
          "https://api.quotable.io/quotes?page=9",
          "https://api.quotable.io/quotes?page=10"]
const quoteApiUrl = page[rd];
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
//Display random quotes
const renderNewQuote = async () => {
    //Fetch contents from url
    const response = await fetch(quoteApiUrl);
    //Store response
    let data = await response.json();
    //Access quote
    for (i = 0; i < 20; i++) {
        quote = quote + data.results[i].content;
    }
    //Array of characters in the quote
    let arr = quote.split("").map((value) => {
        //wrap the characters in a span tag
        return "<span class='quote-chars'>" + value + "</span>";
    });
    console.log(quote);

    //join array for displaying
    quoteSection.innerHTML += arr.join("");
};
//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars"); 
    //Create an arrat from received span tags
    quoteChars = Array.from(quoteChars);
    //array of user input characters
    let userInputChars = userInput.value.split("");
    //loop through each character in quote
    quoteChars.forEach((char, index) => {
        //Check if char(quote character) = userInputChars[index](input character)
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            //Remove class if any
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //If user enter wrong character
        else {
            //Checks if we alreasy have added fail class
            if (!char.classList.contains("fail")) {
                //increment and display mistakes
                mistakes += 1;
                char.classList.add("fail");
            }

        }
        //Returns true if all the characters are entered correctly
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        //End test if all characters are correct
        if (check) {
            displayResult();
        }
    });
});

function updateTimer() {
    if (time == 0) {

        displayResult();
    } else {
        console.log(time);
        if (time < 11) {
            document.getElementById("timer").style.color = "#ba4269";
        }

        document.getElementById("timer").innerText = --time + "s";
        
    }
}

const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
   
};

const displayResult = () => {

    document.querySelector(".result").style.opacity=1;
    clearInterval(timer);

    userInput.disabled = true;
    let timeTaken = 1;


    document.getElementById("wpm").innerText =
        (userInput.value.length / 5 / timeTaken).toFixed(2);
    console.log((userInput.value.length / 5 / timeTaken).toFixed(2));
    document.getElementById("accuracy").innerText =
        Math.round(
            ((userInput.value.length - mistakes) / userInput.value.length) * 100
        ) + " %";
};
//Start Test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("sg2").style.display = "flex";
   

};
window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("sg2").style.display = "none";
    document.querySelector(".result").style.opacity = "0";
   
    userInput.disabled = true;
    renderNewQuote();
    console.log('1');
};