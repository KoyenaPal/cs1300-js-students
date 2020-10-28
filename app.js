var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=REDACTED_TOKEN";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      console.log("After promise");
      //console.log(request.response);
      handleResponse(request.response)
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const displayDiv = () => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id","wrapper");
  const header = document.createElement("h1");
  header.innerText = "Hi";
  wrapper.appendChild(header);
  document.getElementById("plants").appendChild(wrapper);
};

const displayResponse = (plant) => {
  const wrapper = document.createElement("div");
  const something = document.createElement("p");
  something.innerText = plant;
  wrapper.appendChild(something);
  document.getElementById("plantsinfo").appendChild(wrapper);
};



const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;
  console.log(plantsArray)

  const plantsAfter1753 = plantsArray.filter((arrayItem) => {
    return (arrayItem.year > 1753);
  })
  console.log(plantsAfter1753)

  plantsAfter1753.map((arrayItem) => {
    displayResponse(arrayItem.common_name)
    console.log(arrayItem.year);
  })
}