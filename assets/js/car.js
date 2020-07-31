let params = new URLSearchParams(location.search);
console.log(params.get('carId'))

let carId = params.get('carId');

firebase.firestore().collection("all-cars").doc(carId).get().then(snapshot=>{
    let car=snapshot.data()
    console.log(car)
})