const chatSreenContent = document.getElementById('chat-scroll');
const chatTextContent = document.getElementById('chat-screen');
const chatForm = document.getElementById('chat-form');

let myChatArr = [];
let yourChatArr = [];

function ChatContent(chatText, chatId) {
    this.chatText = chatText;
    this.chatId = chatId;
}

// 로컬에 디폴트 채팅내역 저장
let chatContents = document.querySelectorAll('.text');
chatContents.forEach((el) => {
    const toBeAdded = new ChatContent(el.innerHTML, new Date().getTime());
    yourChatArr.push(toBeAdded);
    saveChats();
})

// 로컬 저장소에 저장하기
function saveChats() {
    const chatString = JSON.stringify(yourChatArr);
    localStorage.setItem("Chats", chatString);
}

// 로컬 저장소에서 가져오기
function loadChats() {
    const Chats = localStorage.getItem("Chats");
    if (Chats !== null) {
        yourChatArr = JSON.parse(Chats);
    }
}
loadChats();

function handleChatDbClick(clickedId) {
    if (confirm("메시지를 삭제하시겠습니까?")) {
        myChatArr = myChatArr.filter(function (aChat) {
            return aChat.chatId !== clickedId;
        })
    }
    displayMyChat();
}

function displayDefaltChat() {
    for (let i = 0; i < 2; i++) {
        const YourChat = document.createElement('li');

        YourChat.innerHTML = yourChatArr[i].chatText;
        YourChat.classList.add("text", "left");

        chatTextContent.appendChild(YourChat);
    }
}

function displayYourChat(chatText) {
    const YourChat = document.createElement('li');
    const chatTime = document.createElement('span');

    if (chatText.includes("수업")) {
        YourChat.textContent = yourChatArr[2].chatText;
    } else if (chatText.includes("추천")) {
        YourChat.textContent = yourChatArr[3].chatText;
    } else if (chatText.includes("고마워")) {
        YourChat.textContent = yourChatArr[4].chatText;
    } else if (chatText.includes("슈붕")) {
        YourChat.textContent = yourChatArr[5].chatText;
    }

    YourChat.classList.add("text", "left");

    let options = { hour: "numeric", minute: "numeric" };
    const now = new Date();
    chatTime.textContent = now.toLocaleTimeString("ko-KR", options);

    YourChat.appendChild(chatTime);
    chatTextContent.appendChild(YourChat);

    chatSreenContent.scrollTo(0, chatSreenContent.scrollHeight);
}


function displayMyChat() {
    chatTextContent.innerHTML = "";
    displayDefaltChat();
    myChatArr.forEach(function (aChat) {
        const MyChat = document.createElement('li');
        const chatTime = document.createElement('span');

        MyChat.textContent = aChat.chatText;

        MyChat.classList.add("text", "right");

        let options = { hour: "numeric", minute: "numeric" };
        const now = new Date();
        chatTime.textContent = now.toLocaleTimeString("ko-KR", options);

        MyChat.addEventListener("dblclick", function () {
            handleChatDbClick(aChat.chatId);
        })

        MyChat.appendChild(chatTime);
        chatTextContent.appendChild(MyChat);

        if (aChat.chatText.includes("수업") || aChat.chatText.includes("추천") || aChat.chatText.includes("고마워") || aChat.chatText.includes("슈붕")) {
            displayYourChat(aChat.chatText);
        }
        chatSreenContent.scrollTo(0, chatSreenContent.scrollHeight);
    })
}

chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // const toBeAdded = {
    //     chatText: chatForm.chatText.value,
    //     chatId: new Date().getTime(),
    //     chatWho: "me"
    // };
    const toBeAdded = new ChatContent(chatForm.chatText.value, new Date().getTime());
    chatForm.chatText.value = "";
    myChatArr.push(toBeAdded);

    displayMyChat();
    saveChats();
})