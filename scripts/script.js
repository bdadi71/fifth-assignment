function seats() {
    const buttons = document.getElementsByClassName("seats");
    const seatAvailable = parseFloat(buttons.innerText)
    const seatLeft = seatAvailable - 1;
    document.getElementsByClassName("seats").innerText = seatLeft;
}
console.log(seats())
