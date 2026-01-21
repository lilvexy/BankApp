// Lägg till en array med bankkonton (minst två användare med belopp)
const accounts = [
    { name: "Salar Askar", username: "user1", password: "password1", balance: 1000 },
    { name: "Vexy Bank", username: "user2", password: "password2", balance: 500 },
];

// hålla reda på den inloggade användaren
let loggedInUser = null;

// hålla reda på beloppet som matas in via knapptryckning
let inputAmount = '';

// Hämta knapparna och lägg till eventlyssnare för att aktivera funktioner
document.getElementById("log_btn").addEventListener("click", logIn); // Lyssnar på inloggningsknappen
document.getElementById("out_btn").addEventListener("click", logOut); // Lyssnar på logga ut-knappen
document.getElementById("insätt_btn").addEventListener("click", deposit); // Lyssnar på insättningsknappen
document.getElementById("uttag_btn").addEventListener("click", withdraw); // Lyssnar på uttagsknappen

// Dölj "Loggedin"-sektionen när sidan laddas
document.getElementById("Loggedin").style.display = "none"; 

// Funktion som hanterar inloggningen
function logIn() {
    // Hämta användarnamn och lösenord från inputfält
    const userN = document.getElementById("user_in").value;
    const pass = document.getElementById("pass_in").value;

    // Kontrollera att både användarnamn och lösenord är ifyllda
    if (!userN || !pass) {
        alert("Username or Password cannot be empty!"); // Felmeddelande om något fält är tomt
        return;
    }

    // Sök efter användaren i accounts-arrayen som matchar både användarnamn och lösenord
    const user = accounts.find(
        (account) => account.username === userN && account.password === pass
    );

    // Om användaren hittas
    if (user) {
        loggedInUser = user;
        alert("Login successful!"); // notifiera en lyckad inloggning

        // Dölj login rutan och visa den inloggade sidan
        document.getElementsByClassName("log_box")[0].style.display = "none";
        document.getElementById("Loggedin").style.display = "block";

        // Uppdatera skärmen med användarnamn och saldo
        document.getElementById("user_name").textContent = loggedInUser.name;
        document.getElementById("user_balance").textContent = loggedInUser.balance;
    } else {
        // Om användaren inte finns
        alert("Invalid Username or Password"); // Felmeddelande om felaktigt användarnamn eller lösenord
    }
}

// Funktion för att logga ut användaren
function logOut() {
    loggedInUser = null; // Sätt loggedInUser till null när användaren loggar ut
    alert("You have logged out!"); // Visa en alert för att meddela användaren om utloggningen

    // Dölj den inloggade sidan och visa login rutan
    document.getElementById("Loggedin").style.display = "none";
    document.getElementsByClassName("log_box")[0].style.display = "block";
}

// Funktion för att uppdatera saldo
function updateBalance() {
    if (loggedInUser) {
        // Uppdatera saldo på skärmen när den är inloggad
        document.getElementById("user_balance").textContent = loggedInUser.balance;
    }
}

// Funktion för att sätta in pengar
function deposit() {
    // Kontrollera om användaren är inloggad och beloppet är större än 0
    if (loggedInUser && inputAmount > 0) {
        // Använd Math.floor för att avrunda beloppet nedåt till närmaste heltal
        const amount = Math.floor(parseFloat(inputAmount));

        // Lägg till det avrundade beloppet till användarens saldo
        loggedInUser.balance += amount;
        alert(amount + " kr has been deposited."); // Notification med det insatta beloppet

        // Uppdatera saldo på skärmen direkt
        updateBalance();

        // Rensa inputfält efter insättning
        document.getElementById("Insättning").value = ''; // Här rensar vi insättningsfältet
        inputAmount = ''; // Rensa inputAmount variabeln
    } else {
        // Om beloppet inte är giltigt, visa ett felmeddelande
        alert("Invalid amount. Please enter a valid number.");
    }
}

// Funktion för att ta ut pengar
function withdraw() {
    // Kontrollera om användaren är inloggad och beloppet är större än 0
    if (loggedInUser && inputAmount > 0) {
        // Använd Math.floor för att avrunda beloppet nedåt till närmaste heltal
        const amount = Math.floor(parseFloat(inputAmount));

        // Kontrollera om användaren har tillräckligt med pengar på sitt konto
        if (loggedInUser.balance >= amount) {
            // Om det finns tillräckligt, ta ut det avrundade beloppet från användarens konto
            loggedInUser.balance -= amount;

            // Uppdatera saldo på skärmen direkt
            updateBalance();

            alert(amount + " kr has been withdrawn."); // Visa en alert för uttaget

            // Rensa inputfält efter uttag
            document.getElementById("Uttag").value = ''; // Här rensar vi uttagsfältet
            inputAmount = ''; // Rensa inputAmount variabeln
        } else {
            // Om det inte finns nog med saldo, visa ett felmeddelande
            alert("Insufficient balance!");
        }
    } else {
        // Om beloppet inte är giltigt, visas ett felmeddelande
        alert("Invalid amount. Please enter a valid number.");
    }
}

// För att lägga till nummer till insättnings- och uttagsfält
function appendNumber(num) {
    inputAmount += num; // Lägg till numret som trycks på
    // Uppdatera input-fälten med det aktuella beloppet
    document.getElementById("Insättning").value = inputAmount;
    document.getElementById("Uttag").value = inputAmount;
}
