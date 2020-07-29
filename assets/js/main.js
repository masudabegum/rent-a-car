
// Get all cars from firebase)
firebase.firestore().collection('all-cars').get().then(snapshot => {
    snapshot.forEach(snap => {

        let car = snap.data();

        // Create html
        let html = `
             <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                <div class="card">
                    <img class="card-img-top" src="${car.image}" alt="Card image cap" style="height: 230px;">
                    <div class="card-body">
                        <h5 class="card-title">${car.name}</h5>
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
