const chatTextContent = document.getElementById('chat-screen');
const chatForm = document.getElementById('chat-form');

let myChatArr = [];

function ChatContent(chatText, chatId, chatWho, chatTime) {
    this.chatText = chatText;
    this.chatId = chatId;
    this.chatWho = chatWho;
    this.chatTime = chatTime;
}

let chatContents = document.querySelectorAll('.text');
chatContents.forEach((el) => {
    const toBeAdded = new ChatContent(el.textContent, new Date().getTime(), "me");
    if (el.classList.contains("left")) {
        toBeAdded.chatWho = "you";
    }
    myChatArr.push(toBeAdded);
    saveChats();
})

// 로컬 저장소에 저장하기
function saveChats() {
    const chatString = JSON.stringify(myChatArr);
    localStorage.setItem("Chats", chatString);
}

// 로컬 저장소에서 가져오기
function loadChats() {
    const Chats = localStorage.getItem("Chats");
    if (Chats !== null) {
        myChatArr = JSON.parse(Chats);
        displayMyChat();
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
    saveChats();
}


function displayMyChat() {
    chatTextContent.innerHTML = "";
    myChatArr.forEach(function (aChat) {
        const MyChat = document.createElement('li');
        const chatTime = document.createElement('span');

        MyChat.textContent = aChat.chatText;

        if (aChat.chatWho === "you") {
            MyChat.classList.add("text", "left");
        } else {
            MyChat.classList.add("text", "right");
        }

        let options = { hour: "numeric", minute: "numeric" };
        const now = new Date();
        chatTime.textContent = now.toLocaleTimeString("ko-KR", options);

        MyChat.addEventListener("dblclick", function () {
            handleChatDbClick(aChat.chatId);
        })

        MyChat.appendChild(chatTime);
        chatTextContent.appendChild(MyChat);
    })
}

chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // const toBeAdded = {
    //     chatText: chatForm.chatText.value,
    //     chatId: new Date().getTime(),
    //     chatWho: "me"
    // };
    let options = { hour: "numeric", minute: "numeric" };
    const now = new Date();
    let chatTime = now.toLocaleTimeString("ko-KR", options);
    const toBeAdded = new ChatContent(chatForm.chatText.value, new Date().getTime(), "me", chatTime);
    chatForm.chatText.value = "";
    myChatArr.push(toBeAdded);
    console.log(myChatArr);
    displayMyChat();
    saveChats();
})