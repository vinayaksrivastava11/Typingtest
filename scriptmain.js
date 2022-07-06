
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

const renderNewQuote = async () => {

    const response = await fetch(quoteApiUrl);
   
    let data = await response.json();
  
    for (i = 0; i < 20; i++) {
        quote = quote + data.results[i].content;
    }
   
    let arr = quote.split("").map((value) => {
     
        return "<span class='quote-chars'>" + value + "</span>";
    });


  
    quoteSection.innerHTML += arr.join("");
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars"); 
    
    quoteChars = Array.from(quoteChars);
    
    let userInputChars = userInput.value.split("");
    
    quoteChars.forEach((char, index) => {
       
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
     
        else if (userInputChars[index] == null) {
           
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }

        else {
        
            if (!char.classList.contains("fail")) {
               
                mistakes += 1;
                char.classList.add("fail");
            }

        }
   
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
     
        if (check) {
            displayResult();
        }
    });
});

function updateTimer() {
    if (time == 0) {

        displayResult();
    } else {
        
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
    
    document.getElementById("accuracy").innerText =
        Math.round(
            ((userInput.value.length - mistakes) / userInput.value.length) * 100
        ) + " %";
};

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
    
};
