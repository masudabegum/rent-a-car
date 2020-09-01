
let user = JSON.parse(localStorage.getItem('user'));
console.log(user)

if(user!=null){
    document.querySelector('.greeting').innerHTML = `Welcome ${user.fullname}`;

}else{
    document.querySelector('.greeting').innerHTML = `Welcome`;
}
// Get all cars from firebase
firebase.firestore().collection('all-cars').get().then(snapshot => {
  
    snapshot.forEach(snap => {

        let car = snap.data();
        
        // Create html
        let html = `
             <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <div class="card">
                    <img class="card-img-top" src="${car.image}" alt="Card image cap" style="height: 230px;">
                    <div class="card-body">
                        <h5 class="card-title"> ${car.name} </h5>
                        <p class="card-text">${car.brief}</p>
                        <a href="car.html?carId=${car.car_id}"
                            class="btn btn-primary">Description</a>
                    </div>
                </div>
            </div>
        `;

        // Add HTML to cars div
        document.querySelector('#cars').innerHTML += html;
    })
})


// Find cars
let filterCarsForm =document.querySelector('#filter-cars');
if(filterCarsForm){

    filterCarsForm.addEventListener('submit', event=>{
        event.preventDefault();

        let myLocation = event.target[0].value.toLowerCase();
        let destination = event.target[1].value.toLowerCase();

        // Database
        firebase
        .firestore()
        .collection('all-cars')
        .where('from', 'array-contains', myLocation)
        .get()
        .then(snapshot => {
            let cars = [];

            snapshot.forEach(car=>{
                cars.push(car.data());
            })

            let filteredCars = [];

            for(let i=0; i<cars.length; i++){
                if(cars[i].locations.includes(destination)){
                    filteredCars.push(cars[i])
                }
            }

            document.querySelector('#cars').innerHTML = '';
            
            filteredCars.forEach(snap => {

                let car = snap;
                
                // Create html
                let html = `
                     <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                        <div class="card">
                            <img class="card-img-top" src="${car.image}" alt="Card image cap" style="height: 230px;">
                            <div class="card-body">
                                <h5 class="card-title"> ${car.name} </h5>
                                <p class="card-text">${car.brief}</p>
                                <a href="car.html?carId=${car.car_id}"
                                    class="btn btn-primary">Description</a>
                            </div>
                        </div>
                    </div>
                `;
        
                // Add HTML to cars div
                document.querySelector('#cars').innerHTML += html;
            })
        })
    })

}
