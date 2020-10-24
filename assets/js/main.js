// firebase.firestore().collection('all-cars').add({

//     image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//     name:"jgjgj",
//     brief:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem?",
//     air_condition:true,
//     available: false,
//     description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem animi voluptas voluptatum ea perferendis aliquid dolore facere vel quisquam explicabo dolores, impedit similique quae temporibus, quibusdam dolorem doloribus tenetur deleniti quis ipsa autem. Nam quod voluptas totam officia maxime? Animi, soluta. Illo natus quam ducimus. Natus quam, aut maiores deserunt alias animi esse sunt doloribus officia labore quia, perspiciatis blanditiis repellendus aliquid ex officiis odit ullam laborum quas! Nesciunt dolore repellendus quis reiciendis veritatis quo.",
//     driver:"Testing driver",
//     experience:"2",
//     from:['sylhet', 'dhaka'],
//     locations:['barishal', 'chittagong'],
//     numberOfSits:"7",
//     one_way_fare:"1200",
//     size:"mini",
//     two_way_fare:"1000"

// }).then(data=>{
//     firebase.firestore().collection('all-cars').doc(data.id).update({car_id: data.id});
// })

let user = JSON.parse(localStorage.getItem('user'));

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
