"use strict";
function testQuantity(quantity,name){
    var err = "";
    if(isNaN(quantity)){
        err += name + "quantity is not a number.\n";
    }
    else if(quantity<0){
        err += name + "quantity cannot be negative number.\n";
    }
    else if(parseInt(quantity,10)!==Number(quantity)){
        err += name + "quantity is not an interger";
    }
    return err;
}
function getState(){
    var stateArray = document.getElementById("State").getElementsByTagName("option");
    var stateCt = document.getElementById("State").selectedIndex;
    return stateArray[stateCt].value;
}
function checkPostcode(Postcode){
    var errMsg = "";
    var State = getState().toString();
    var firstDigit = Number(Postcode.toString()[0]);
    console.log('Postcode');
    console.log('State');
    console.log('firstDigit');
    switch(State){
        case "VIC":
            if(firstDigit != 3 && firstDigit != 8){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "NSW":
            if(firstDigit != 1 && firstDigit != 2){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "QLD":
            if(firstDigit != 4 && firstDigit != 9){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "NT":
            if(firstDigit != 0){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "WA":
            if(firstDigit != 6){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "SA":
            if(firstDigit != 5){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "TAS":
            if(firstDigit != 7){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        case "ACT":
            if(firstDigit != 0){
                errMsg += "Your postcode doesn't match the state.\n";
            }
            break;
        default:
            errMsg += "Please select your state.\n";
    }
    return errMsg;
}
function getRoomType(){
    var roomArray = document.getElementById("Room").getElementsByTagName("option");
    var roomCt = document.getElementById("Room").selectedIndex;
    return roomArray[roomCt].value;
}
function validateEnquire(){
    var errMsg = "";
    var result = true;
    var i = "";
    var Temp = "";

    var firstname = document.getElementById("fname").value.trim();
    var lastname = document.getElementById("lName").value.trim();
    var email = document.getElementById("mail").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var address = document.getElementById("address").value.trim();
    var Suburb = document.getElementById("Suburb").value.trim();
    var State = document.getElementById("State").value.trim();
    var Postcode = document.getElementById("Postcode").value.trim();
    var roomType = getRoomType();
    var checkin = document.getElementById("checkin").value.trim();
    var checkout = document.getElementById("checkout").value.trim();
    var adults = document.getElementById("adults").value.trim();
    var Children = document.getElementById("children").value.trim();
    var rooms = document.getElementById("rooms").value.trim();
    Temp = checkPostcode(Postcode);
    if(Temp != ""){
        errMsg += Temp; 
    }
    if(checkin==""){
        errMsg += "Please select your days which you want to stay.\n";
    }
    if(checkout==""){
        errMsg += "Please select your days which you want to return room\n";
    }
    if(adults=="" && Children=="" && rooms==""){
        errMsg += "Please enter Adult, Children and Room quantity.\n";
    }
    else{
        if(adults!=""){
            i = testQuantity(adults,"Adults");
            if(i!=""){
                errMsg += i;
            }
        }
        if(Children!=""){
            i = testQuantity(Children,"Children");
            if(i!=""){
                errMsg += i;
            }
        }
        if(rooms!=""){
            i = testQuantity(rooms,"Rooms");
            if(i!=""){
                errMsg += i;
            }
        }
        if(adults+Children+rooms==0){
            errMsg += "Please enter quantity which is greater than 0";
        }
    }
    if(errMsg!=""){
        alert(errMsg);
        result = false;
    }
    else{
        saveInfo(firstname,lastname,email,phone,address,Suburb,State,Postcode,roomType,checkin,checkout,adults,Children,rooms);
    }
    return result;
}
function getLength(number){
    return number.toString().length;
}
function getCardType(){
    var cardTypeArray = document.getElementById("card").getElementsByTagName("option");
    var cardCt = document.getElementById("card").selectedIndex;
    return cardTypeArray[cardCt].value;
}
function checkCardNumber(cardNumber){
    var errMsg = "";
    var cardType = getCardType();
    var number = getLength(cardNumber);
    var firstDigit = Number(cardNumber.toString()[0]);
    var secondDigit = Number(cardNumber.toString()[1]);
    let firstTwoDigit = firstDigit*10 + secondDigit;
    switch(cardType){
        case "visa":
            if(number != 16 || firstDigit != 4){
                errMsg += "Please enter with the right format.\n";
            }
            break;
        case "master":
            if(number != 16 || (firstTwoDigit>51 && firstTwoDigit<55)){
                errMsg += "Please enter with the right format.\n";
            }
            break;
        case "amex":
            if(number != 15 || (firstTwoDigit>34 && firstTwoDigit<37)){
                errMsg += "Please enter with the right format.\n";
            }
            break;
    }
    return errMsg;
}
function validatePayment(){
    var errMsg = "";
    var result = true;
    var Temp = "";

    var cardName = document.getElementById("owner").value.trim();
    var cardNumber = document.getElementById("cardNumber").value.trim();
    if(cardName==""){
        errMsg += "Please enter your account name.\n";
    }
    else if(!cardName.match(/^[a-zA-Z]{1,40}$/)){
        errMsg += "Your account name must contain only alpha characters.\n";
    }
    if(cardNumber==""){
        errMsg += "Please enter your account number.\n";
    }
    else if(getLength(cardNumber)!=15 && getLength(cardNumber)!=16){
        errMsg += "Please type your card number between 15 and 16 numbers.\n";
    }
    else{
        Temp = checkCardNumber(cardNumber);
        if(Temp != ""){
            errMsg += Temp;
        }
    }
    if(errMsg!=""){
        alert(errMsg);
        result = false;
    }
    return result;
}

function saveInfo(firstname,lastname,email,phone,address,Suburb,State,Postcode,roomType,checkin,checkout,adults,Children,rooms){
    if(typeof(Storage)!="undefined"){
        localStorage.setItem("firstname",firstname);
        localStorage.setItem("email",email);
        localStorage.setItem("lastname",lastname);
        localStorage.setItem("phone",phone);
        localStorage.setItem("address",address);
        localStorage.setItem("Suburb",Suburb);
        localStorage.setItem("State",State);
        localStorage.setItem("roomType",roomType);
        localStorage.setItem("Postcode",Postcode);
        localStorage.setItem("roomType",roomType);
        localStorage.setItem("checkin",checkin);
        localStorage.setItem("checkout",checkout);
        localStorage.setItem("adults",adults);
        localStorage.setItem("Children",Children);
        localStorage.setItem("rooms",rooms);
       
    }
}
function getInfo(){
    if(typeof(Storage)!="undefined"){
        if(localStorage.firstname!==null){
            
            document.getElementById("fullname").textContent = localStorage.firstname + " " + localStorage.lastname;
            
            document.getElementById("firstname").value = localStorage.firstname;
            document.getElementById("lastname").value = localStorage.lastname;

            document.getElementById("email-1").textContent = localStorage.email;
            document.getElementById("email").value = localStorage.email;

            document.getElementById("Phone").textContent = localStorage.phone;
            document.getElementById("phone").value = localStorage.phone;

            document.getElementById("Address").textContent = localStorage.address + ", " + localStorage.Suburb + ", " + localStorage.State + ", " + localStorage.Postcode;
            document.getElementById("address").value = localStorage.address;
            document.getElementById("Suburb").value = localStorage.Suburb;
            document.getElementById("State").value = localStorage.State;
            document.getElementById("Postcode").value = localStorage.Postcode;

            document.getElementById("Rooms1").textContent = localStorage.roomType;
            document.getElementById("roomType").value = localStorage.roomType;

            document.getElementById("Checkin").textContent = localStorage.checkin;
            document.getElementById("checkin").value = localStorage.checkin;
            
            document.getElementById("Checkout").textContent = localStorage.checkout;
            document.getElementById("checkout").value = localStorage.checkout;

            document.getElementById("Adults").textContent = localStorage.adults;
            document.getElementById("adults").value = localStorage.adults;

            document.getElementById("Children-1").textContent = localStorage.Children;
            document.getElementById("Children").value = localStorage.Children;
           
            document.getElementById("Rooms").textContent = localStorage.rooms;
            document.getElementById("rooms").value = localStorage.rooms;
            
            var cost = 0;
            var quantity = Number(localStorage.rooms);
            switch(localStorage.roomType){
                case "room1":
                    cost += 499*quantity;
                    break;
                case "room2":
                    cost += 303*quantity;
                    break;
                case "room3":
                    cost += 333*quantity;
                    break;
                case "room4":
                    cost += 539*quantity;
                    break;
            }
            document.getElementById("Cost-1").textContent = cost;
            document.getElementById("Cost").value = cost;
        }
    }
}
function clearStorage(){  
	localStorage.clear();
	location.href="index.html";
}
function init(){
    if(document.getElementById("enquireForm")!=null){
        document.getElementById("enquireForm").onsubmit = validateEnquire;
    }
    else if(document.getElementById("paymentForm")!=null){
        getInfo();
        document.getElementById("paymentForm").onsubmit = validatePayment;
        document.getElementById("cancelBooking").onclick = clearStorage;
    }
}
window.onload = init;