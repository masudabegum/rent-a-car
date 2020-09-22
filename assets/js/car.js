let user = JSON.parse(localStorage.getItem('user'));


let params = new URLSearchParams(window.location.search);
let carId = params.get("carId");

console.log(carId);
firebase
  .firestore()
  .collection("all-cars")
  .doc(carId)
  .get()
  .then((snap) => {
    let car = snap.data();
    document.querySelector("#car-image img").src = car.image;

    let details = `
            <p class="lead"><b>Name: </b> ${car.name}</p>
            <p class="lead"><b>Description: </b> ${car.description}</p>
            <p class="lead"><b>Air Condition: </b> ${car.air_condition}</p>
            <p class="lead"><b>Size: </b> ${car.size}</p>
            <p class="lead"><b>Seats: </b> ${car.numberOfSits}</p>
            <p class="lead"><b>One-way Fare: </b> ${car.one_way_fare}</p>
            <p class="lead"><b>Two-way Fare: </b> ${car.two_way_fare}</p>
            <p class="lead"><b>Starting Point: </b> ${car.from}</p>
            <p class="lead"><b>Destinations: </b> ${car.locations}</p>
            <p class="lead"><b>Driver: </b> ${car.driver}</p>
            <p class="lead"><b>Driver Experience: </b> ${car.experience}</p>
            <p class="lead"><b>Test: </b> ${car.test}</p>
            
          
        `;

    document.querySelector("#car-details").innerHTML = details;

    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlocmFiIiwiYSI6ImNrYXhxNWt1NTA4ZnMyc285ZnQ4eTJiZG4ifQ.2sYKfCuUIILbf04RJdnJDw";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [90.3563, 23.6850],
      zoom: 15
    });
  });


  // Hire Car
  document.querySelector('#hire-button').addEventListener('click', function(event){
    
    if(user!=null && user.uid){
      location.href = `hire.html?carId=${carId}`;
      }else{
        alert("You are not logged in!")
      }
  })
