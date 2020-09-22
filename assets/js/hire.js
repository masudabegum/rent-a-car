let params = new URLSearchParams(window.location.search)
let carId = params.get("carId");
user = JSON.parse(localStorage.getItem('user'))
console.log(carId);

let car;
firebase.firestore().collection('all-cars').doc(carId).get().then(snapshot=>{
    console.log(snapshot.data())
    car = snapshot.data();
    document.querySelector('#choosen_car_information').innerHTML = `You have choosen ${car.size}(${car.numberOfSits} seats) size ${car.name} ${car.licenceNo}`;

});


document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault()
    let obj = {
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            email: event.target[2].value,
            mobile: event.target[3].value,
            location:  event.target[4].value,
            destination: event.target[5].value,
            pick_up_location: event.target[6].value,
            travel: event.target[7].value,
            journey_date: event.target[8].value,
            journey_time: event.target[9].value,
            
            carname: car.name,
            hireTime: Date.now()
        }
        console.log(obj)
        firebase.firestore().collection('users').doc(user.uid).collection('history').add(obj).then(()=>{alert("You hired a car. You will notifed soon")}).catch(err=>{alert("Something went wrong")});
    

})