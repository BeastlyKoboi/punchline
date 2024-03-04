import * as requests from "./requests.js";

let currPromptKey;

let currUsername;
let currUserInfo;

const createAddAnswerCard = (username) => {
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
    titleParagraph.textContent = 'Add Answer';

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
    // Create textarea
    const textareaElement = document.createElement('textarea');
    textareaElement.classList.add('textarea');
    textareaElement.setAttribute('placeholder', 'a future payoff?');

    // Append textarea to content div
    contentDiv.appendChild(textareaElement);

    // Append media div and content div to card content div
    cardContentDiv.appendChild(mediaDiv);
    cardContentDiv.appendChild(contentDiv);

    // Create footer element
    const footerElement = document.createElement('footer');
    footerElement.classList.add('card-footer');

    // Create button element
    const buttonElement = document.createElement('button');
    buttonElement.id = 'add-answer-btn';
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

const createAnswerCard = (username, answer) => {
    // Create outer card 
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Create card-content div
    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content');

    // Create answer content div
    let answerDiv = document.createElement('div');
    answerDiv.classList.add('content');
    answerDiv.innerText = `${answer}`;

    // Create Media div
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media');

    // Create media right div
    const mediaRightDiv = document.createElement('div');
    mediaRightDiv.classList.add('media-content', 'has-text-right');

    // Create username p
    const usernameParagraph = document.createElement('p');
    usernameParagraph.classList.add('subtitle', 'is-6');
    usernameParagraph.innerText = `By ${username}`;

    // Append username p to media right div
    mediaRightDiv.appendChild(usernameParagraph);

    // Append media content and media right div to media div
    mediaDiv.appendChild(mediaRightDiv);

    // Create footer 
    // const footerElement = document.createElement('footer');
    // footerElement.classList.add('card-footer');

    // // Create button 
    // const buttonElement = document.createElement('button');
    // buttonElement.classList.add('button', 'is-large', 'card-footer-item');

    // Create like icon span inside button 
    // const iconSpan = document.createElement('span');
    // iconSpan.classList.add('icon');
    // const iconElement = document.createElement('i');
    // iconElement.classList.add('fa-regular', 'fa-heart');
    // iconSpan.appendChild(iconElement);
    // buttonElement.appendChild(iconSpan);

    // Append button to footer
    // footerElement.appendChild(buttonElement);

    // Append all created elements to main card div
    cardContentDiv.appendChild(answerDiv);
    cardContentDiv.appendChild(mediaDiv);
    cardDiv.appendChild(cardContentDiv);
    // cardDiv.appendChild(footerElement);

    return cardDiv;
};

const refreshPage = async () => {
    const promptTitle = document.getElementById('prompt-title');
    const answerCardsDiv = document.getElementById('answer-cards');

    while (answerCardsDiv.firstElementChild) {
        answerCardsDiv.remove(answerCardsDiv.firstElementChild);
    }
    
    const params = new URLSearchParams(window.location.search);
    const getUserResponse = await requests.sendGet('./getUser?' + new URLSearchParams({
        username: params.get('username')
    }));

    currPromptKey = params.get('promptKey');
    currUsername = params.get('username');
    currUserInfo = await getUserResponse.json();

    answerCardsDiv.appendChild(createAddAnswerCard(currUsername));

    console.log(params.get('promptKey'));


    requests.sendGet('./getPrompt?' + params, async (response) => {
        const prompt = await response.json();
        promptTitle.innerText = prompt.text;
        // console.log(prompts);
        const answers = prompt.answers;
        for (let key in answers) {
            const newCard = createAnswerCard(answers[key].createdBy, answers[key].text);
            
            answerCardsDiv.appendChild(newCard);
        }
    });

    let addAnswerBtn = document.getElementById('add-answer-btn');
    addAnswerBtn.addEventListener('click', addAnswer);
};

const addAnswer = async (e) => {
    let newPromptCard = document.getElementById('add-prompt-card');

    let text = newPromptCard.querySelector('textarea').value;

    if (!text || !currUsername)
        return;

    await requests.sendPost('./addAnswer', null, JSON.stringify({
        promptKey: currPromptKey, 
        text: text,
        createdBy: currUsername,
    }));
};

const init = async () => {

    await refreshPage();  
}

init();