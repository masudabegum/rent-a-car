const signUpForm = document.querySelector('form');

if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let user = {
            fullname: event.target[0].value,
            email: event.target[1].value,
            phone: event.target[2].value,
            password:  event.target[3].value
        }
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                delete user.password;
                user['uid'] = data.user.uid
                firebase.firestore().collection('users').doc(data.user.uid).set(user).then(()=>{
                    localStorage.setItem('user', JSON.stringify(user));
                    location.href = 'index.html'
                }).catch(err=>{
                    console.log(err)
                });
                
            })
            .catch(error=>{
                    let message =  'Email already in use';
            })
    })
}