let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
let updateForm = document.querySelector('form');
console.log(user)
if (user.uid) {
    document.querySelector('#fullname').vaue = user.fullname;
    document.querySelector('#email').value = user.email;
    document.querySelector('#phone').value = user.phone;
}

updateForm.addEventListener('submit', event => {
    event.preventDefault();
    let userinfo = {
        fullname: event.target[0].value,
        email: event.target[1].value,
        phone: event.target[2].value
    }

    firebase.firestore().collection('users').doc(user.uid).update(userinfo).then(() => { alert("User information updated") });
});

firebase.firestore().collection('users').doc(user.uid).collection('history').get().then(snapshot => {
    let ul = document.createElement('ul');
    ul.classList.add('list-group')

    snapshot.forEach(snap => {
        let history = snap.data()

        let li = document.createElement('li');
        li.classList.add('list-group-item')
        var myDate = history.journey_date;
        myDate = myDate.split("-");
        var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);

        let traveled = false;
        if (newDate.getTime() < Date.now()) {
            traveled = true;
        }
        
        if (!traveled) {
            li.innerHTML = `${history.carname}, (Date: ${history.journey_date}), (${history.location}-${history.destination} &nbsp;&nbsp <button class='cancel-btn' onClick = cancelTrip('${snap.id}')>Cancel</button>`
        }else{
            li.innerHTML = `${history.carname}, (Date: ${history.journey_date}, (${history.location}-${history.destination}))`
        }
        ul.append(li)
    });

    document.querySelector('.travel-history').append(ul)
})

function cancelTrip(id) {
    
    firebase.firestore().collection('users').doc(user.uid).collection('history').doc(id).delete().then(()=>{alert('You cancelled a trip')})
}
