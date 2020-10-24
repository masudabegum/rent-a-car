let User = JSON.parse(localStorage.getItem('user'));

if (User != null) {
    document.querySelector('.navbar-nav').innerHTML = `
        <li class="nav-item active">
            <a class="nav-link " href="user.html">Account<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" tabindex="-1" aria-disabled="true" id='logout'>Logout</a>
        </li>
    `
} else {
    document.querySelector('.navbar-nav').innerHTML = `
        <li class="nav-item">
         <a class="nav-link " href="signin.html">Login</a>
        </li>
        `
}

let logout = document.querySelector('#logout');

if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('user');
        location.reload();
    })
}