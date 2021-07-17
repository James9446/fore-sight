 // View Control
 const updateView = (targetId, newId, label, element, method='', addElement) => {
  let newElement = document.createElement(element);
  newElement.id = newId;
  
  let content = document.createTextNode(label + method);
  newElement.appendChild(content);
  
  let currentElement = document.getElementById(targetId);
  let parentElement = currentElement.parentNode;
  if (addElement) {
    parentElement.appendChild(newElement, currentElement);
  } else {
    parentElement.replaceChild(newElement, currentElement);
  }
};

const updateEmailView = (email) => {
  updateView("emailHeader", "emailHeader", "", "h2", "Thank you for submitting your email");
  updateView("emailDiv", "emailDiv", "", "p", "");
  updateView("displayEmail", "displayEmail", "", "h3", `Email: ${email}`);
};

// Button Functions
const getEmail = () => {
  const email = document.getElementById("emailInput").value;
  if (validateEmail(email)) {
    updateEmailView(email);
    analytics.identify(generateUserId(20), {
      email: email
    });
  } else {
    updateView("emailHeader", "emailHeader", "", "h2", "Please enter a valid email");
    analytics.track("Invalid Email Submitted", {
      email: email
    });
  }
  console.log('email:', email)
  // console.log('generateUserId', generateUserId(20));
};

// Utility Functions
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const generateUserId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < length; i++ ) {
    result += characters. charAt(Math. floor(Math. random() * characters.length));
 }
 return result;
}

// Button Event Listeners
document.getElementById("getEmail").addEventListener("click", getEmail);