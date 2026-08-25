let selectedTrain = null;
let selectedSeat = null;
let totalFare = 0;
let cameraStream = null;


/* TRAIN DATA */

const trainData = [

    {
        name: "Vande Bharat Express",
        number: "VB101",
        from: "Hyderabad",
        to: "Chennai",
        time: "06:00 AM",
        price: 1850
    },

    {
        name: "Godavari Express",
        number: "GE202",
        from: "Hyderabad",
        to: "Delhi",
        time: "08:30 AM",
        price: 1450
    },

    {
        name: "Charminar Express",
        number: "CE303",
        from: "Hyderabad",
        to: "Mumbai",
        time: "10:00 AM",
        price: 1250
    },

    {
        name: "Deccan Express",
        number: "DE404",
        from: "Mumbai",
        to: "Pune",
        time: "07:30 AM",
        price: 650
    },

    {
        name: "Coromandel Express",
        number: "CO505",
        from: "Chennai",
        to: "Delhi",
        time: "05:00 PM",
        price: 1650
    },

    {
        name: "Karnataka Express",
        number: "KE606",
        from: "Delhi",
        to: "Bangalore",
        time: "09:00 PM",
        price: 1800
    },

    {
        name: "Chennai Express",
        number: "CH707",
        from: "Chennai",
        to: "Bangalore",
        time: "07:00 AM",
        price: 700
    },

    {
        name: "Pune Superfast",
        number: "PS808",
        from: "Pune",
        to: "Mumbai",
        time: "06:45 AM",
        price: 550
    }

];


/* PAGE NAVIGATION */

function go(page) {

    document
        .querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove("active");

        });


    document
        .getElementById(page)
        .classList.add("active");


    window.scrollTo(0, 0);
}


/* SET DATE */

document.addEventListener("DOMContentLoaded", function() {

    const date =
        document.getElementById("journeyDate");

    if (date) {

        date.min =
            new Date()
            .toISOString()
            .split("T")[0];

    }

});


/* SEARCH TRAIN */

function searchTrain() {

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;

    const date =
        document.getElementById("journeyDate").value;


    if (!from || !to || !date) {

        alert(
            "Please fill all search details."
        );

        return;
    }


    if (from === to) {

        alert(
            "From and To stations cannot be same."
        );

        return;
    }


    const results =
        trainData.filter(function(train) {

            return (
                train.from === from &&
                train.to === to
            );

        });


    const list =
        document.getElementById("trainList");


    list.innerHTML = "";


    if (results.length === 0) {

        list.innerHTML = `

            <div class="train-card">

                <div>
                    <h3>No trains found 🚆</h3>

                    <p>
                        Try another route.
                    </p>
                </div>

            </div>

        `;

        go("trains");

        return;
    }


    results.forEach(function(train, index) {

        list.innerHTML += `

            <div class="train-card">

                <div>

                    <div class="train-name">
                        🚆 ${train.name}
                    </div>

                    <div>
                        Train No:
                        ${train.number}
                    </div>

                    <div class="train-time">
                        Departure:
                        ${train.time}
                    </div>

                </div>


                <div>

                    <div>
                        ${train.from}
                        →
                        ${train.to}
                    </div>

                    <div class="price">
                        ₹${train.price}
                    </div>

                    <button
                        onclick="chooseTrain(${index})">

                        Select

                    </button>

                </div>

            </div>

        `;

    });


    go("trains");
}


/* SELECT TRAIN */

function chooseTrain(index) {

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;


    const results =
        trainData.filter(function(train) {

            return (
                train.from === from &&
                train.to === to
            );

        });


    selectedTrain =
        results[index];


    go("passenger");
}


/* PASSENGER */

function passengerDetails() {

    const name =
        document
        .getElementById("fullName")
        .value.trim();

    const email =
        document
        .getElementById("email")
        .value.trim();

    const phone =
        document
        .getElementById("phone")
        .value.trim();

    const age =
        document
        .getElementById("age")
        .value;


    if (!name || !email || !phone || !age) {

        alert(
            "Please fill all passenger details."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email."
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Enter a valid 10-digit phone number."
        );

        return;
    }


    createSeats();

    go("berth");
}


/* CREATE SEATS */

function createSeats() {

    const area =
        document.getElementById("seatArea");


    area.innerHTML = "";


    const booked = [
        3,
        8,
        14,
        19,
        25
    ];


    for (
        let i = 1; i <= 30; i++
    ) {

        const seat =
            document.createElement("div");


        seat.className = "seat";

        seat.innerText =
            "B-" + i;


        if (booked.includes(i)) {

            seat.classList.add("booked");

        } else {

            seat.onclick =
                function() {

                    selectSeat(
                        i,
                        seat
                    );

                };

        }


        area.appendChild(seat);

    }

}


/* SELECT SEAT */

function selectSeat(
    number,
    element
) {

    document
        .querySelectorAll(".seat")
        .forEach(function(seat) {

            seat.classList.remove(
                "selected"
            );

        });


    element.classList.add("selected");


    selectedSeat = number;


    document
        .getElementById("selectedSeat")
        .innerText =
        "B-" + number;


    calculateFare();
}


/* FARE */

function calculateFare() {

    if (!selectedTrain) {
        return;
    }


    const passengers =
        Number(
            document
            .getElementById("passengers")
            .value
        );


    totalFare =
        selectedTrain.price *
        passengers;


    document
        .getElementById("fare")
        .innerText =
        totalFare;
}


/* BERTH NEXT */

function berthNext() {

    if (!selectedSeat) {

        alert(
            "Please select a berth."
        );

        return;
    }


    calculateFare();

    go("face");
}


/* CAMERA */

async function startCamera() {

    try {

        cameraStream =
            await navigator
            .mediaDevices
            .getUserMedia({
                video: true,
                audio: false
            });


        const video =
            document.getElementById("video");


        video.srcObject =
            cameraStream;


        document
            .getElementById("cameraMessage")
            .innerText =
            "✓ Camera started. Position your face.";


    } catch (error) {

        document
            .getElementById("cameraMessage")
            .innerText =
            "Camera permission denied or unavailable.";

    }

}


/* CAPTURE */

function capturePhoto() {

    if (!cameraStream) {

        alert(
            "Start the camera first."
        );

        return;
    }


    const video =
        document.getElementById("video");

    const canvas =
        document.getElementById("canvas");

    const image =
        document.getElementById("captured");


    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;


    const ctx =
        canvas.getContext("2d");


    ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    image.src =
        canvas.toDataURL("image/png");


    image.style.display =
        "block";


    document
        .getElementById("cameraMessage")
        .innerText =
        "✓ Photo captured. Click Verify.";

}


/* VERIFY */

function verifyPhoto() {

    const image =
        document.getElementById("captured");


    if (image.style.display === "none") {

        alert(
            "Capture a photo first."
        );

        return;
    }


    document
        .getElementById("cameraMessage")
        .innerText =
        "✓ Face verification completed.";


    document
        .getElementById("faceContinue")
        .classList
        .remove("hidden");

}


/* NEXT */

function faceNext() {

    stopCamera();

    updatePayment();

    go("payment");
}


/* STOP CAMERA */

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function(track) {

                track.stop();

            });

        cameraStream = null;
    }

}


/* PAYMENT SUMMARY */

function updatePayment() {

    document
        .getElementById("payTrain")
        .innerText =
        selectedTrain.name;


    document
        .getElementById("payRoute")
        .innerText =
        selectedTrain.from +
        " → " +
        selectedTrain.to;


    document
        .getElementById("payPassenger")
        .innerText =
        document
        .getElementById("fullName")
        .value;


    document
        .getElementById("paySeat")
        .innerText =
        "B-" + selectedSeat;


    document
        .getElementById("payFare")
        .innerText =
        totalFare;
}


/* PAYMENT */

function payNow() {

    const method =
        document
        .getElementById("paymentMethod")
        .value;


    if (!method) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    generateTicket();

    go("ticket");
}


/* TICKET */

function generateTicket() {

    const pnr =
        "RB" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    document
        .getElementById("pnr")
        .innerText =
        pnr;


    document
        .getElementById("ticketFrom")
        .innerText =
        selectedTrain.from;


    document
        .getElementById("ticketTo")
        .innerText =
        selectedTrain.to;


    document
        .getElementById("ticketPassenger")
        .innerText =
        document
        .getElementById("fullName")
        .value;


    document
        .getElementById("ticketDate")
        .innerText =
        document
        .getElementById("journeyDate")
        .value;


    document
        .getElementById("ticketTrain")
        .innerText =
        selectedTrain.name;


    document
        .getElementById("ticketSeat")
        .innerText =
        "B-" + selectedSeat;


    document
        .getElementById("ticketFare")
        .innerText =
        totalFare;
}