// store all feild into var.
const fName = document.querySelectorAll('[name="fName"]')[0];
const email = document.querySelectorAll('[name="email"]')[0];
const mobile = document.querySelectorAll('[name="mobile"]')[0];
const otpInput = document.getElementById("otpInput");
const submitButton = document.getElementsByClassName("button-submit")[0];
const validateButton = document.getElementById("validate");
let otp;
let state = {
  981: "Arunachal Pradesh",
  982: "Assam",
  983: "Bihar",
  984: "Chattisgarh",
  985: "Dadra & Nagar Haveli and Maharastra",
  986: "Gujarat",
  987: "Haryana",
  988: "Jammu & Kashmir	",
  989: "Jharkhand",
  990: "Karnataka",
  991: "Maharashtra",
  992: "Manipur",
  993: "Meghalaya",
  994: "Mizoram",
  995: "North East States	",
  996: "Nagaland",
  997: "Odisha",
  998: "Punjab",
  999: "Rajasthan",
  990: "Tamil Nadu",
  971: "Telangana",
  972: "Tripura",
  973: "Uttar Pradesh	",
  974: "Uttarakhand",
  975: "West Bengal	",
  976: "Andhra Pradesh",
  977: "Goa",
  978: "Kerala",
  979: "Sikkim",
  980: "Andaman and Nicobar Islands	",
  961: "Dadra & Nagar Haveli and Daman & Diu	",
  962: "Lakshadweep",
  963: "Puducherry",
  964: "Ladakh",
  965: "Delhi",
  966: "Chandigarh",
};

// name validaions
fName.onkeypress = function (e) {
  debugger;
  const target = e.target;
  const feedback =
    e.target.parentElement.getElementsByClassName("form-feedback")[0];
  const value = e.target.value;
  let part;
  if (value.length > 4) {
    part = value.split(" ");

    if (!part && part.length <= 2) {
      feedback.innerHTML = "Name is too short";
    } else {
      if (part[0].length < 4 || part[1].length < 4) {
        feedback.innerHTML =
          "Name is too short, Name shoud be minimum 2 words and each word 4 character";
      } else {
        feedback.innerHTML = "";
      }
    }
  }
};

// Email validations
email.onkeypress = function (e) {
  const target = e.target;
  const feedback =
    e.target.parentElement.getElementsByClassName("form-feedback")[0];
  const value = e.target.value;
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value != "") {
    if (!regEmail.test(value)) {
      feedback.innerHTML =
        "Enter Valid email address \n e.g. example@domain.com";
    } else {
      feedback.innerHTML = "";
    }
  } else {
    feedback.innerHTML = "";
  }
};

// Mobile number validations
let provideFlag = false;
let stateFlag = false;
mobile.onkeypress = function (e) {
  const feedback =
    e.target.parentElement.getElementsByClassName("form-feedback")[0];

  debugger;

  if (e.target.value.length === 3) {
    console.log(e.target.value);
    let valueArr = e.target.value.split("");
    valueArr.unshift("(");
    valueArr.push(") - ");
    e.target.value = valueArr.join("");

    if (
      e.target.value.substring(1, 4) >= 621 &&
      e.target.value.substring(1, 4) <= 799
    ) {
      e.target.style.backgroundImage = "url('images/jio.png')";
      feedback.innerHTML = "<span class='provider'>Jio, </span>";
      provideFlag = true;
    } else if (
      e.target.value.substring(1, 4) >= 801 &&
      e.target.value.substring(1, 4) <= 920
    ) {
      e.target.style.backgroundImage = "url('images/idea.png')";
      feedback.innerHTML = "<span class='provider'>Idea, </span>";
      provideFlag = true;
    } else if (
      e.target.value.substring(1, 4) >= 921 &&
      e.target.value.substring(1, 4) <= 999
    ) {
      e.target.style.backgroundImage = "url('images/vodafone.png')";
      feedback.innerHTML = "<span class='provider'>Vodafone, </span>";
      provideFlag = true;
    } else {
      feedback.innerHTML = "Number is Not valid";
      provideFlag = false;
    }
  } else if (e.target.value.length === 11) {
    const stateCode = e.target.value.slice(8, 11);
    let valueArr = e.target.value.split(" - ");
    e.target.value = valueArr[0] + " - " + valueArr[1] + " - ";

    for (key in state) {
      if (key == stateCode) {
        feedback.innerHTML =
          (provideFlag ? feedback.innerHTML : "") +
          "<span class='state'>" +
          state[key] +
          "</span>";
        stateFlag = true;
        return false;
      } else {
        if (!stateFlag) {
          console.log(provideFlag);
          e.target.style.backgroundImage = "";
          feedback.innerHTML = "Invalid mobile no!!!";
          stateFlag = false;
        }
      }
    }
  } else if (e.target.value.length >= 18) {
    return false;
  }
};

//  Form validations for mandatory
function validateForm() {
  if (fName.value == "") {
    fName.parentElement.getElementsByClassName("form-feedback")[0].innerHTML =
      "Please enter full name";
  }
  if (email.value == "") {
    email.parentElement.getElementsByClassName("form-feedback")[0].innerHTML =
      "Please enter Valid email Address";
  }
  if (!provideFlag || !stateFlag) {
    mobile.parentElement.getElementsByClassName("form-feedback")[0].innerHTML =
      "Number is Not valid";
  }
  if (mobile.value == "") {
    mobile.parentElement.getElementsByClassName("form-feedback")[0].innerHTML =
      "Please enter Your Mobile number";
  }
}

submitButton.onclick = function (e) {
  debugger;
  validateForm();
  if (
    fName.value != "" &&
    email.value != "" &&
    mobile.value != "" &&
    provideFlag &&
    stateFlag
  ) {
    document.getElementById("message").innerHTML = `Dear ${
      fName.value.split(" ")[0]
    },<br/>
    Thank you for your inquiry. A 4 digit verification number has sent to ${
      mobile.value
    },
    Please enter the following box and submit for confirmation.`;
    document.getElementsByClassName("page_form")[0].style.display = "none";
    document.getElementsByClassName("message_box")[0].style.display = "block";
    otp = Math.floor(1000 + Math.random() * 9000);
    otpInput.value = "";
    fName.value = "";
    email.value = "";
    mobile.value = "";
    alert("Your One Time Password is " + otp);
  }
};

let attemp = 0;

validateButton.onclick = function (e) {
  if (otp == otpInput.value) {
    // alert("Validation Successfull!!");
    window.location.href = "http://pixel6.co/";
  } else {
    document.getElementsByClassName("otp-feedback")[0].innerHTML =
      "Please enter valid otp." + (2 - attemp) + " attempts remaining.";
    document.getElementsByClassName("otp-feedback")[0].style.color = "red";
    otpInput.style = "border-color: red";
    otpInput.value = "";
    attemp += 1;
    if (attemp === 3) {
      alert("You enters wrong OTP.");
      window.location.href = "http://pixel6.co/404/";
    }
  }
};
