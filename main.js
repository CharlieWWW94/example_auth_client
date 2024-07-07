const loginButton = document.querySelector("#login-btn");
const fetchAuthorisedEndpointButton = document.querySelector("#request-btn");
const responseContainer = document.querySelector("#response-container");

// Assumes account already exists
const loginDetails = {
  email: "test@test.com",
  password: "test123!"
};

// Credentials that are updated with each request
const auth = {
  'client': null,
  'token-type': 'Bearer',
  'expiry': null,
  'uid': null,
  'access-token': null
};

loginButton.addEventListener("click", () => login() );

fetchAuthorisedEndpointButton.addEventListener("click", async () => {
  // Updates page content with response, authorised or unauthorised
  const body = await fetchAuthorisedEndpoint();
  responseContainer.replaceChildren(JSON.stringify(body));
});

async function login() {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/sign_in?" + new URLSearchParams(loginDetails),
      { method: "POST" }
    );

    // Sets the credentials based on response headers
    if (response.ok) { setAuthHeaders(response.headers); }

  } catch (err) { console.error(err); }
}


async function fetchAuthorisedEndpoint() {
  try {
    const response = await fetch("http://localhost:3000/test", { headers: auth });
  
    if (response.ok) { setAuthHeaders(response.headers); }

    const json = await response.json();

    return json;

  } catch (err) { console.error(err); }
}

function setAuthHeaders(headers) {
  auth['client'] = headers.get('client') || auth['client'];
  auth['expiry'] = headers.get('expiry') || auth['expiry'];
  auth['uid'] = headers.get('uid') || auth['uid'];
  auth['access-token'] = headers.get('access-token') || auth['access-token'];
}
