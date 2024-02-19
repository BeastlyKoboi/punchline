import * as requests from "./requests.js";

let usernameInput;

let currUsername;
let currUserInfo;

const handleResponse = (response) => {

    response.text().then(responseText => {
        const content = document.querySelector('#data');

        const h1 = document.createElement('h1');
        const p = document.createElement('p');

        // switch (response.status) {
        //     case 200:
        //         h1.innerText = 'Success';
        //         p.innerText = responseText;
        //         break;
        //     case 201:
        //         h1.innerText = 'Created';
        //         p.innerText = `Message: ${JSON.parse(responseText).message}`;
        //         break;
        //     case 204:
        //         h1.innerText = 'Updated (No Content)';
        //         break;
        //     case 400:
        //         h1.innerText = 'Bad Request';
        //         p.innerText = `Message: ${JSON.parse(responseText).message}`;
        //         break;
        //     case 404:
        //         h1.innerText = 'Not Found';
        //         if (responseText)
        //             p.innerText = `Message: ${JSON.parse(responseText).message}`;
        //         break;
        //     default:
        //         h1.innerText = 'Not Sure';
        //         break;
        // }

        h1.innerText = 'Data';
        p.innerText = `${responseText}`;

        content.innerHTML = "";
        content.appendChild(h1);
        content.appendChild(p);

        if (responseText)
            console.log(JSON.parse(responseText));
    });
};

const changeCurrentUsername = async (newUsername) => {

    const getResponse = await requests.sendGet('./getUser?' + new URLSearchParams({
        username: newUsername
    }));

    currUsername = newUsername;

    if (getResponse.status === 200) {
        currUserInfo = await getResponse.json();
    }
    else {
        const postResponse = await requests.sendPost('./addUser', null, JSON.stringify({
            username: newUsername
        }));
        currUserInfo = await postResponse.text();
    }
    

    console.log(currUserInfo);
}

const init = () => {

    // M<akes the burger toggle work on phones screens
    document.querySelector('.navbar-burger').addEventListener('click', (e) => {
        let burger = e.target;
        let nav = document.querySelector('#navbarHeader');
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    })

    // Makes username change work 
    usernameInput = document.getElementById('input-username');
    usernameInput.addEventListener('blur', async (e) => {
        e.target.parentNode.classList.add('is-loading');

        await changeCurrentUsername(e.target.value);

        e.target.parentNode.classList.remove('is-loading');

    });
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click

        }
    });

    // fetch('https://example.com?' + new URLSearchParams({
    //   foo: 'value',
    //   bar: 2,
    // }))

    requests.sendGet('./getAll', handleResponse);
}

init();