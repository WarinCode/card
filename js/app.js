let username = '';
let followerCount = 0;
let random = Math.round(Math.random() * 10000);

const card = document.createElement('div');
const render = document.querySelector(".render");
card.setAttribute('class', 'card');
render.appendChild(card);

const fetchAPI = async (link) => {
    const data = await fetch(link);
    const JSONData = await data.json();
    try {
        return JSONData;
    } catch (err) {
        throw new Error(err);
    }
}

window.addEventListener('load', fetchAPI('https://random-data-api.com/api/v2/users')
    .then(data => {
        card.innerHTML = `
                <div class= "card-img"></div>
                <div class="card-profile">
                    <img src=${data.avatar}>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <h2>${data.first_name} ${data.last_name}</h2> 
                        <div class="card-career">
                            <i class="fa-solid fa-briefcase"></i><p>${data.employment.title}</p>
                        </div>  
                        <div class="card-group-follow">
                            <i class="fa-solid fa-user-group"></i><p>Followers <span class="follower-number">${followerCount}</span></p>       
                            <i class="fa-solid fa-users"></i><p>Following <span class="follower-number">${random}</span></p>         
                        </div>
                    </div>
                    <div class="card-detail">
                        <div class="card-items">
                            <i class="fa-solid fa-location-dot faicon"></i>
                            <p>-${data.address.country}</p>
                            <p>-${data.address.city}</p>
                        </div>
                        <div class="card-items">
                            <i class="fa-solid fa-phone faicon"></i>
                            <p>${data.phone_number}</p>
                        </div>
                        <div class="card-items">
                            <i class="fa-solid fa-envelope faicon"></i>
                            <p>${data.email}</p>
                        </div>
                    </div>
                </div>
                <div class="card-btn">
                    <button class= "btn" id="btn" onclick="changeButtonName()">Follow</button>
                </div>
                `
        username = `${data.first_name} ${data.last_name}`;
    })
    .catch(rej => console.error(rej)))

function changeButtonName() {
    const btn = document.querySelector('#btn');
    const followerNumber = document.querySelector('.follower-number')
    if (btn.classList.toString() == 'btn') {
        btn.classList.toggle('btn-following');
        followerCount += 1;
        localStorage.setItem("number", followerCount);
        followerNumber.innerHTML = followerCount;
        btn.innerHTML = 'Following <i class="fa-solid fa-circle-check"></i>'
    } else {
        confirm(`คุณต้องการยกเลิกติดตาม ${username} ไหม?`) ? unFollow() : false;
        localStorage.setItem("number", followerCount -= 1);
        followerNumber.innerHTML = localStorage.getItem("number");
    }
    function unFollow() {
        btn.classList.toggle('btn-following');
        btn.innerHTML = 'Follow';
    }
}