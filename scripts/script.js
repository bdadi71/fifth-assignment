const seats = document.querySelectorAll('.seats');
const seatCounter = document.getElementById("selected-seats");
const seatLeft = document.getElementById("seat-available");
const seatsLeft = parseFloat(seatLeft.innerText);
const seatViewer = document.getElementById('seatViewer');
const defaultSeatColor = seats[0].style.backgroundColor;

let seatsBooked = seatsLeft;
function seatsReduced(number) {
    seatsBooked += number;
    seatLeft.innerText = seatsBooked;
}

let selectedSeatsCount = 0;
function seatNumberIncrease(value) {
    selectedSeatsCount += value;
    if (selectedSeatsCount < 0) {
        selectedSeatsCount = 0;
    }
    seatCounter.innerText = selectedSeatsCount;
}

function updateTotalPrice() {
    let seatPriceElements = document.querySelectorAll('.seat-price');
    let totalPrice = Array.from(seatPriceElements).reduce((acc, curr) => acc + parseFloat(curr.innerText.replace('$', '')), 0);
    document.getElementById("total-price").innerText = 'BDT' + " " + totalPrice;
}

seats.forEach(function (seat) {
    seat.addEventListener("click", function () {
        if (seat.style.backgroundColor === 'green') {
            seat.style.backgroundColor = defaultSeatColor;
            seatNumberIncrease(-1);
            seatsReduced(1);
            const seatInfoDiv = document.getElementById(`seat-info-${seat.id}`);
            if (seatInfoDiv) {
                seatInfoDiv.remove();
            }
            updateTotalPrice();
        } else {
            if (selectedSeatsCount < 4) {
                seat.style.backgroundColor = 'green';
                seatNumberIncrease(1);
                seatsReduced(-1);
                const seatInfoContainer = document.createElement('div');
                seatInfoContainer.id = `seat-info-${seat.id}`;
                const seatNumberElement = document.createElement('p');
                seatNumberElement.textContent = seat.innerText;
                const seatClassElement = document.createElement('p');
                seatClassElement.textContent = "Economic";
                const seatPriceElement = document.createElement('p');
                seatPriceElement.textContent = "550";
                seatPriceElement.classList.add('seat-price');
                seatInfoContainer.appendChild(seatNumberElement);
                seatInfoContainer.appendChild(seatClassElement);
                seatInfoContainer.appendChild(seatPriceElement);
                seatInfoContainer.classList.add('flex', 'justify-evenly');
                seatViewer.appendChild(seatInfoContainer);
                updateTotalPrice();
            } else {
                alert("You can only select 4 seats.");
            }
        }
    })
});

const coupon1 = "NEW15";
const coupon2 = "Couple 20";
const applyBTN = document.getElementById('applyBTN');
applyBTN.addEventListener('click', function () {
    const couponField = document.getElementById('couponField').value;
    const totalPriceText = document.getElementById("total-price").innerText;
    const totalPrice = parseFloat(totalPriceText.split(' ')[1]); 
    const grandPrice = document.getElementById("grandPrice");

    if (!isNaN(totalPrice)) {
        if (couponField === coupon1) {
            const discountedPrice = totalPrice * 0.15;
            const grandTotal = totalPrice - discountedPrice;
            grandPrice.innerText = 'BDT ' + grandTotal;
        } else if (couponField === coupon2) {
            const discountedPrice = totalPrice * 0.2;
            const grandTotal = totalPrice - discountedPrice;
            grandPrice.innerText = 'BDT ' + grandTotal; 
        } else {
            alert("Coupon Is Invalid");
            grandPrice.innerText = totalPriceText; 
        }
    } else {
        alert("Invalid Total Price");
        grandPrice.innerText = totalPriceText;
    }
});
