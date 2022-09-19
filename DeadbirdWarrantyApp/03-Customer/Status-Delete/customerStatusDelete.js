const searchSubmit = document.getElementById('searchButton');
const deleteSubmit = document.getElementById('deleteButton');

searchSubmit.addEventListener('click', apiLookUpWarranty);
deleteSubmit.addEventListener('click', apiDeleteWarranty);

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
const lookUpWarranty = document.getElementById('result');

function error() {
    lookUpWarranty.innerHTML = " ";
    let error = document.createElement('p');
    error.innerText = "Please Enter A Valid Warrant Number"
    lookUpWarranty.appendChild(error);
}

async function apiLookUpWarranty() {
    const searchInput = document.getElementById("searchInput").value;

    let response = await fetch(`http://localhost:7000/warranties/search/${searchInput}`);
    response = await response.json();
    console.log(response);

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

//Delete

async function apiDeleteWarranty() {
    const warrantyNo = document.getElementById('deleteInput').value;
    // console.log(warrantyNo);
    let deleteWarranty = {
        warrantyID: warrantyNo
    }
    let response = await fetch(`http://localhost:7000/warranties/remove/${warrantyNo}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(deleteWarranty)
        }
    );

    if (!response.ok) {
        console.log('error');
        error()
    }
    else {
        const s = document.getElementById('success');
        s.innerHTML = " ";
        let good = document.createElement('p');
        good.innerText = "Successfully Updated"
        s.appendChild(good);
    }
};
