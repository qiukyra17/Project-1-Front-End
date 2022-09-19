//ELEMENTS
const displayWarranty = document.getElementById('displayWarranty');
const lookUpWarranty = document.getElementById('result');

//SUBMIT BUTTONS
const searchSubmit = document.getElementById('searchButton');
const updateSubmit = document.getElementById('updateButton');

//EVENT LISTENERS - ALL - LOOK UP - UPDATE
document.addEventListener('DOMContentLoaded', loadAllWarranty);
searchSubmit.addEventListener('click', apiLookUpWarranty);
updateSubmit.addEventListener('click', apiPatchStatus);

//CUSTOMERID to NAME
async function apiGetCustomerNameFromId(id) {
    let response = await fetch(`http://localhost:7000/customers/search/id/${id}`);
    response = await response.json();
    return { name: response.name };
}
//BRAND ID to NAME
async function apiGetBrandFromId(id) {
    let response = await fetch(`http://localhost:7000/brand/${id}`);
    response = await response.json();
    return { brand_id: response.brand_id };
}
//GENDER ID TO GENDER
async function apiGetGenderFromID(id) {
    let response = await fetch(`http://localhost:7000/gender/${id}`)
    response = await response.json();
    return { gender: response.gender };
}
//PRODUCT TYPE ID TO PRODUCT TYPE
async function apiGetProductTypeFromID(id) {
    let response = await fetch(`http://localhost:7000/product_type/${id}`)
    response = await response.json();
    return { productType: response.productType };
}

//ALL WARRNATIES
async function loadAllWarranty() {
    let response = await fetch('http://localhost:7000/warranties');
    response = await response.json();
    loadWarranty(response);
}

async function loadWarranty(response) {
    displayWarranty.innerHTML = " ";

    let warrantyList = document.createElement('div');

    for (let i = 0; i < response.length; i++) {
    
        let customer = await apiGetCustomerNameFromId(response[i].customerID);
        let brand = await apiGetBrandFromId(response[i].brandID);
        let gender = await apiGetGenderFromID(response[i].genderID);
        let productType = await apiGetProductTypeFromID(response[i].productTypeID);

        let warrantyBlock = document.createElement('div');
        let customerID = document.createElement('p');
        let warrantyID = document.createElement('p');
        let brandID = document.createElement('p');
        let genderID = document.createElement('p');
        let productTypeID = document.createElement('p');
        let productName = document.createElement('p');
        let productIssue = document.createElement('p');
        let status = document.createElement('p');

        customerID.innerText = "Customer: " + customer.name;
        warrantyID.innerText = "Warranty ID: " + response[i].warrantyID;
        brandID.innerText = "Brand: " + brand.brand_id;
        genderID.innerText = "Product Gender: " + gender.gender;
        productTypeID.innerText = "Product Type: " + productType.productType;
        productName.innerText = "Product Name: " + response[i].productName;
        productIssue.innerText = "Product Issue: " + response[i].productIssue;
        status.innerText = "Status: " + response[i].status;

        warrantyBlock.appendChild(customerID);
        warrantyBlock.appendChild(warrantyID);
        warrantyBlock.appendChild(brandID);
        warrantyBlock.appendChild(genderID);
        warrantyBlock.appendChild(productTypeID)
        warrantyBlock.appendChild(productName);
        warrantyBlock.appendChild(productIssue);
        warrantyBlock.appendChild(status);

        warrantyList.appendChild(warrantyBlock);
    }

    displayWarranty.appendChild(warrantyList);
}


function error() {
    lookUpWarranty.innerHTML = " ";
    let error = document.createElement('p');
    error.innerText = "Please Enter A Valid Warrant Number"
    lookUpWarranty.appendChild(error);
}

//LOOK UP WARRANTIES - BY ID
async function apiLookUpWarranty() {
    const searchInput = document.getElementById("searchInput").value;

    let response = await fetch(`http://localhost:7000/warranties/search/${searchInput}`);
    response = await response.json();

    if (response.length == 0) {
        console.log('error');
        error()
    }
    else if (response.length > 0) {
        loadLookUp(response);
    }
};

async function loadLookUp(response) {
    lookUpWarranty.innerHTML = " ";
    let lookUp = document.createElement('div');

    for (let i = 0; i < response.length; i++) {
        let customer = await apiGetCustomerNameFromId(response[i].customerID);
        let brand = await apiGetBrandFromId(response[i].brandID);
        let gender = await apiGetGenderFromID(response[i].genderID);
        let productType = await apiGetProductTypeFromID(response[i].productTypeID);

        let customerID = document.createElement('p');
        let warrantyID = document.createElement('p');
        let brandID = document.createElement('p');
        let genderID = document.createElement('p');
        let productTypeID = document.createElement('p');
        let productName = document.createElement('p');
        let productIssue = document.createElement('p');
        let status = document.createElement('p');


        customerID.innerText = "Customer: " + customer.name;
        warrantyID.innerText = "Warranty ID: " + response[i].warrantyID;
        brandID.innerText = "Brand: " + brand.brand_id;
        genderID.innerText = "Product Gender: " + gender.gender;
        productTypeID.innerText = "Product Type: " + productType.productType;
        productName.innerText = "Product Name: " + response[i].productName;
        productIssue.innerText = "Product Issue: " + response[i].productIssue;
        status.innerText = "Status: " + response[i].status;

        lookUp.appendChild(customerID);
        lookUp.appendChild(warrantyID);
        lookUp.appendChild(brandID);
        lookUp.appendChild(genderID);
        lookUp.appendChild(productTypeID)
        lookUp.appendChild(productName);
        lookUp.appendChild(productIssue);
        lookUp.appendChild(status);

    }
    lookUpWarranty.appendChild(lookUp);

}

//UPDATE WARRANTIES
async function apiPatchStatus() {
    const warrantyNo = document.getElementById('updateWarrantyNoInput').value;
    const statusUpdate = document.getElementById('statusUpdateInput').value;
    const message = document.getElementById('message');
    const mPTag = document.createElement('p');

    if (warrantyNo < 100) {
        mPTag.innerText = "Please Double Check Warranty Number Entered"
        message.appendChild(mPTag);
    } else {
        mPTag.innerText = "Update Success"
        message.appendChild(mPTag);
    }

    let newStatus = {
        warrantyID: warrantyNo,
        status: statusUpdate
    };

    let response = await fetch(`http://localhost:7000/warranties/update/${warrantyNo}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newStatus)
    })
    console.log(response)
}


