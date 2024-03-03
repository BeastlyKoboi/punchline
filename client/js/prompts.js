import * as requests from "./requests.js";

let usernameInput;

let currUsername;
let currUserInfo;

let promptTags = ['Pick Up Lines', 'Outrageous Insults', 'So You Got Jokes', 'CHUCK NORRIS', 'Historical Quotes'];

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

const createAddPromptCard = (username) => {
    // Create outer card
    const addPromptCard = document.createElement('div');
    addPromptCard.id = 'add-prompt-card';
    addPromptCard.classList.add('card');

    // Create card content div
    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content');

    // Create media div
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media');

    // Create media content div
    const mediaContentDiv = document.createElement('div');
    mediaContentDiv.classList.add('media-content');

    // Create title p
    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('title', 'is-4');
    titleParagraph.textContent = 'Add Prompt';

    // Create username p
    const subtitleParagraph = document.createElement('p');
    subtitleParagraph.classList.add('subtitle', 'is-6');
    subtitleParagraph.textContent = `By ${username}`;

    // Append title and subtitle paragraphs to media content div
    mediaContentDiv.appendChild(titleParagraph);
    mediaContentDiv.appendChild(subtitleParagraph);

    // Append media content div to media div
    mediaDiv.appendChild(mediaContentDiv);

    // Create content div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    // Create select div
    const selectDiv = document.createElement('div');
    selectDiv.classList.add('select');
    selectDiv.appendChild(document.createElement('select'));

    promptTags.forEach((tag) => {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(tag));
        selectDiv.firstChild.appendChild(option);
    });

    // Create textarea
    const textareaElement = document.createElement('textarea');
    textareaElement.classList.add('textarea');
    textareaElement.setAttribute('placeholder', 'a future setup...');

    // Append select element and textarea to content div
    contentDiv.appendChild(selectDiv);
    contentDiv.appendChild(textareaElement);

    // Append media div and content div to card content div
    cardContentDiv.appendChild(mediaDiv);
    cardContentDiv.appendChild(contentDiv);

    // Create footer element
    const footerElement = document.createElement('footer');
    footerElement.classList.add('card-footer');

    // Create button element
    const buttonElement = document.createElement('button');
    buttonElement.id = 'add-prompt-btn';
    buttonElement.classList.add('button', 'card-footer-item');
    buttonElement.appendChild(document.createTextNode('Submit'));

    // Append button element to footer
    footerElement.appendChild(buttonElement);

    // Append card content and footer elements to main card div
    addPromptCard.appendChild(cardContentDiv);
    addPromptCard.appendChild(footerElement);

    // Append the card to the body
    return addPromptCard;
}

const createPromptCard = (username, prompt, answer) => {
    // Create outer card 
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Create card-content div
    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content');

    // Create prompt content div
    const promptDiv = document.createElement('div');
    promptDiv.classList.add('content');
    promptDiv.innerText = `${prompt}`;

    // Create answer content div
    let answerDiv = document.createElement('div');
    answerDiv.classList.add('content');

    // If top answer is submitted, add it to card
    if (answer) {
        answerDiv.innerText = answer;
    }
    else {
        answerDiv.classList.add('has-text-centered');
        // Create red span
        const spanEl = document.createElement('span');
        spanEl.classList.add('tag', 'is-large', 'is-danger');
        spanEl.innerText = 'No Answers... Yet';
        answerDiv.appendChild(spanEl);
    }

    // Create Media div
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media');

    // Create media content div
    const mediaContentDiv = document.createElement('div');
    mediaContentDiv.classList.add('media-content');

    // Create tag span inside media content div
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('tag', 'is-6', 'is-danger');
    tagSpan.textContent = "Tags";

    // Append tag span to media content div
    mediaContentDiv.appendChild(tagSpan);

    // Create media right div
    const mediaRightDiv = document.createElement('div');
    mediaRightDiv.classList.add('media-right', 'has-text-right');

    // Create username p
    const usernameParagraph = document.createElement('p');
    usernameParagraph.classList.add('subtitle', 'is-6');
    usernameParagraph.innerText = `By ${username}`;

    // Append username p to media right div
    mediaRightDiv.appendChild(usernameParagraph);

    // Append media content and media right div to media div
    mediaDiv.appendChild(mediaContentDiv);
    mediaDiv.appendChild(mediaRightDiv);

    // Create footer 
    const footerElement = document.createElement('footer');
    footerElement.classList.add('card-footer');

    // Create button 
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('button', 'is-large', 'card-footer-item');

    // Create like icon span inside button 
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('icon');
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-regular', 'fa-heart');
    iconSpan.appendChild(iconElement);
    buttonElement.appendChild(iconSpan);

    // Append button to footer
    footerElement.appendChild(buttonElement);

    // Append all created elements to main card div
    cardContentDiv.appendChild(promptDiv);
    cardContentDiv.appendChild(answerDiv);
    cardContentDiv.appendChild(mediaDiv);
    cardDiv.appendChild(cardContentDiv);
    cardDiv.appendChild(footerElement);

    return cardDiv;
};

const refreshPage = async () => {
    // requests.sendGet('./getAll', handleResponse);
    const promptsDiv = document.getElementById('prompt-cards');

    while (promptsDiv.firstElementChild) {
        promptsDiv.remove(promptsDiv.firstElementChild);
    }

    promptsDiv.appendChild(createAddPromptCard(currUsername));

    requests.sendGet('./getPrompts', async (response) => {
        promptsDiv.rev
        const prompts = await response.json();
        // console.log(prompts);
        for (let key in prompts) {
            promptsDiv.appendChild(createPromptCard(prompts[key].createdBy, prompts[key].text, prompts[key].answers));
        }
    });

    let addPromptBtn = document.getElementById('add-prompt-btn');
    addPromptBtn.addEventListener('click', addPrompt);
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
};

const addPrompt = async (e) => {
    let newPromptCard = document.getElementById('add-prompt-card');

    let tag = newPromptCard.querySelector('select').value;
    let text = newPromptCard.querySelector('textarea').value;

    if (!tag || !text || !currUsername)
        return;

    await requests.sendPost('./addPrompt', null, JSON.stringify({
        text: text,
        tags: [tag],
        createdBy: currUsername,
    }));

};

const InitModal = async () => {
    // Get sample username 
    let randomUsernamePromise = await requests.sendGet('./getUnusedUsername');
    let randomUsername = (await randomUsernamePromise.json()).username;

    // Remoes progress bar and adds generated username to modal
    let usernameModalDiv = document.getElementById('username-modal-div');
    usernameModalDiv.removeChild(usernameModalDiv.firstElementChild);
    let randomUsernameH1 = document.createElement('h2');
    randomUsernameH1.appendChild(document.createTextNode(randomUsername));
    usernameModalDiv.appendChild(randomUsernameH1);

    // Adds modal btn onclick that saves the username (generated or given if possible)
    // Then refreshes the page
    let modalBtn = document.getElementById('modal-btn');
    modalBtn.addEventListener('click', async (e) => {
        let usernameInput = document.getElementById('input-username');

        let givenUsername = usernameInput.value || usernameModalDiv.firstElementChild.innerText;

        e.target.classList.add('is-loading');
        await changeCurrentUsername(givenUsername);

        e.target.classList.remove('is-loading');
        document.getElementById('username-modal').classList.remove('is-active');
        await refreshPage();
    });
}

const init = async () => {

    // Makes the burger toggle work on phones screens
    document.querySelector('.navbar-burger').addEventListener('click', (e) => {
        let burger = e.target;
        let nav = document.querySelector('#navbarHeader');
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    })

    await InitModal();

    requests.sendGet('./getAll', handleResponse);
}

init();