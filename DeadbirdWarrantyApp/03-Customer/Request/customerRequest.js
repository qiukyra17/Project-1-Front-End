//customer information
const customerNameInput = document.getElementById("customerName");
const customerEmailInput = document.getElementById("customerEmail");
const customerNumberInput = document.getElementById("customerNumber");
//warranty information
const brandIDInput = document.getElementById("brandID");
const genderIDInput = document.getElementById("genderID");
const productTypeIDInput = document.getElementById("productTypeID");
const productNameInput = document.getElementById("productName");
const productIssueInput = document.getElementById("productIssue");
const statusInput = "New";



//submit
let submitButton = document.getElementById("submitButton");

//display warranty number
let warrantyNo = document.getElementById("displayWarrantyNo");

//event listeners
// submitButton.addEventListener("click", apiCustomerInformation);
submitButton.addEventListener("click", apiRequestWarranty);
//POST a warranty - 

//Customer
async function apiCustomerInformation() {
    let inputCustomer = {
        name: customerNameInput.value,
        email: customerEmailInput.value,
        phone: customerNumberInput.value
    }
    await fetch('http://localhost:7000/customers', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(inputCustomer)

    });
    // console.log(inputCustomer)
}

async function apiGetCustomerIdFromEmail(email) {
    let response = await fetch(`http://localhost:7000/customers/search/email/${email}`);
    response = await response.json();
    return { id: response.id };
}

async function apiRequestWarranty() {
    let message = document.getElementById('displayWarrantyNo');
    let warrantyResponse = "";
    apiCustomerInformation();
    let cID = await apiGetCustomerIdFromEmail(customerEmailInput.value)
    console.log(cID);
    let inputRequest = {
        customerID: cID.id,
        brandID: brandIDInput.value,
        genderID: genderIDInput.value,
        productTypeID: productTypeIDInput.value,
        productName: productNameInput.value,
        productIssue: productIssueInput.value,
        status: statusInput
    }
    let response = await fetch('http://localhost:7000/warranty/new/',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(inputRequest)
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(dataJson => {
            warrantyResponse = dataJson
        })
    message.innerText = "Your Warranty Number is: " + warrantyResponse.warrantyID;
}

