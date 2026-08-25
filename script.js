let cart = [];

let total = 0;


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


/* ADD FOOD */

function addFood(name, price) {

    let existing =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();
}


/* REMOVE FOOD */

function removeFood(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


/* UPDATE CART */

function updateCart() {

    const cartBox =
        document.getElementById("cart");


    const totalBox =
        document.getElementById("total");


    total = 0;


    if (cart.length === 0) {

        cartBox.innerHTML =
            "No items added yet.";

        totalBox.innerText =
            "0";

        return;
    }


    cartBox.innerHTML = "";


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        cartBox.innerHTML += `

            <div class="cart-item">

                <span>

                    ${item.name}
                    × ${item.quantity}

                </span>

                <span>

                    ₹${itemTotal}

                    <button
                        onclick="removeFood(${index})">

                        −

                    </button>

                </span>

            </div>

        `;

    });


    totalBox.innerText =
        total;
}


/* CART NEXT */

function cartNext() {

    if (cart.length === 0) {

        alert(
            "Please add at least one food item."
        );

        return;
    }


    go("customer");
}


/* CUSTOMER */

function customerNext() {

    const name =
        document
        .getElementById("name")
        .value.trim();


    const phone =
        document
        .getElementById("phone")
        .value.trim();


    const email =
        document
        .getElementById("email")
        .value.trim();


    if (!name || !phone || !email) {

        alert(
            "Please fill all customer details."
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email."
        );

        return;
    }


    go("delivery");
}


/* DELIVERY */

function deliveryNext() {

    const house =
        document
        .getElementById("house")
        .value.trim();


    const area =
        document
        .getElementById("area")
        .value.trim();


    const city =
        document
        .getElementById("city")
        .value.trim();


    const pincode =
        document
        .getElementById("pincode")
        .value.trim();


    if (
        !house ||
        !area ||
        !city ||
        !pincode
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return;
    }


    createPaymentSummary();

    go("payment");
}


/* PAYMENT SUMMARY */

function createPaymentSummary() {

    const box =
        document
        .getElementById("paymentItems");


    box.innerHTML = "";


    cart.forEach(function(item) {

        let amount =
            item.price *
            item.quantity;


        box.innerHTML += `

            <div class="summary-item">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <b>
                    ₹${amount}
                </b>

            </div>

        `;

    });


    document
        .getElementById("paymentTotal")
        .innerText =
        total;
}


/* PLACE ORDER */

function placeOrder() {

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


    generateOrder();

    go("confirmation");
}


/* GENERATE ORDER */

function generateOrder() {

    const orderId =
        "FE" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    document
        .getElementById("orderId")
        .innerText =
        orderId;


    document
        .getElementById("orderName")
        .innerText =
        document
        .getElementById("name")
        .value;


    document
        .getElementById("orderPhone")
        .innerText =
        document
        .getElementById("phone")
        .value;


    let itemText = "";


    cart.forEach(function(item, index) {

        if (index > 0) {

            itemText += ", ";

        }


        itemText +=
            item.name +
            " × " +
            item.quantity;

    });


    document
        .getElementById("orderItems")
        .innerText =
        itemText;


    const address =

        document
        .getElementById("house")
        .value +

        ", " +

        document
        .getElementById("area")
        .value +

        ", " +

        document
        .getElementById("city")
        .value +

        " - " +

        document
        .getElementById("pincode")
        .value;


    document
        .getElementById("orderAddress")
        .innerText =
        address;


    document
        .getElementById("orderPayment")
        .innerText =
        document
        .getElementById("paymentMethod")
        .value;


    document
        .getElementById("orderTotal")
        .innerText =
        total;
}