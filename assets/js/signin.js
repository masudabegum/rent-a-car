let signinForm = document.querySelector('#signin-form');
if(signinForm){
    signinForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let email = event.target[0].value;
        let password = event.target[1].value;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(data=>{
                firebase.firestore().collection('users').doc(data.user.uid).get().then((res)=>{
                    console.log(res.data())
                    localStorage.setItem('user', JSON.stringify(res.data()));
                    console.log(localStorage.getItem('user'))
                    location.href = 'index.html'
                })
            })
            .catch(err=>{
                console.log(err);
            })
    })
}