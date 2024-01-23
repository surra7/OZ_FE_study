const chatSreenContent = document.getElementById('chat-scroll');
const chatTextContent = document.getElementById('chat-screen');
const chatForm = document.getElementById('chat-form');
const deleteAlert = document.getElementById('delete-alert');

let yourChatArr = [];
let AllChatArr = [];

function ChatContent(chatText, chatId, chatWho) {
    this.chatText = chatText;
    this.chatId = chatId;
    this.chatWho = chatWho;
}

// 디폴트 채팅내역 저장
let chatContents = document.querySelectorAll('.text');
chatContents.forEach((el) => {
    const toBeAdded = new ChatContent(el.innerHTML, new Date().getTime(), "you");
    yourChatArr.push(toBeAdded);
})

function displayDefaltChat() {
    for (let i = 0; i < 2; i++) {
        const AllChat = document.createElement('li');

        AllChat.innerHTML = yourChatArr[i].chatText;
        AllChat.classList.add("text", "left");

        chatTextContent.appendChild(AllChat);
    }
}
displayDefaltChat();

// 로컬 저장소에 저장하기
function saveChats() {
    const chatString = JSON.stringify(AllChatArr);
    localStorage.setItem("Chats", chatString);
}

// 로컬 저장소에서 가져오기
function loadChats() {
    const Chats = localStorage.getItem("Chats");
    if (Chats !== null) {
        AllChatArr = JSON.parse(Chats);
        displayAllChat();
    }
}
loadChats();

// 메세지 삭제
function handleChatDbClick(clickedId) {
    deleteAlert.style.display = "block";

    const confirmBtn = deleteAlert.children[1];
    const cancelBtn = deleteAlert.children[2];

    function deleteMsg() {
        AllChatArr = AllChatArr.filter(function (aChat) {
            return aChat.chatId !== clickedId;
        })
        displayAllChat()
        saveChats();
        deleteAlert.style.display = "none";
    }

    function cancelDelete() {
        deleteAlert.style.display = "none";
    }
    confirmBtn.onclick = deleteMsg;
    cancelBtn.onclick = cancelDelete;
    // 삭제시 스크롤 위치 그대로 유지
    // history.scrollRestoration = "manual";
}

// 채팅 보여주기
function displayAllChat() {
    chatTextContent.innerHTML = "";
    displayDefaltChat();
    AllChatArr.forEach(function (aChat) {
        const AllChat = document.createElement('li');
        const chatTime = document.createElement('span');

        AllChat.innerHTML = aChat.chatText;

        if (aChat.chatWho === "me") {
            AllChat.classList.add("text", "right");
        } else if (aChat.chatWho === "you") {
            AllChat.classList.add("text", "left");
        }
        AllChat.title = "더블클릭하여 삭제";

        let options = { hour: "numeric", minute: "numeric" };
        const now = new Date();
        chatTime.textContent = now.toLocaleTimeString("ko-KR", options);

        AllChat.addEventListener("dblclick", function () {
            handleChatDbClick(aChat.chatId);
        })

        AllChat.appendChild(chatTime);
        chatTextContent.appendChild(AllChat);
    })
}

// 상대방의 메세지 설정
function settingYourChat(chatText) {

    if (chatText.includes("수업")) {
        if (!AllChatArr.includes(yourChatArr[2])) {
            AllChatArr.push(yourChatArr[2]);
        }
    } else if (chatText.includes("추천")) {
        if (!AllChatArr.includes(yourChatArr[3])) {
            AllChatArr.push(yourChatArr[3]);
        }
    } else if (chatText.includes("고마워")) {
        if (!AllChatArr.includes(yourChatArr[4])) {
            AllChatArr.push(yourChatArr[4]);
        }
    } else if (chatText.includes("슈붕")) {
        if (!AllChatArr.includes(yourChatArr[5])) {
            AllChatArr.push(yourChatArr[5]);
        }
    }
}

// 나의 메세지
function settingMyChat(aChat) {
    AllChatArr.push(aChat);
    displayAllChat();

    settingYourChat(aChat.chatText);

    saveChats();
    setTimeout(displayAllChat, 3000);
    // 메시지 추가시 스크롤 맨 밑으로
    chatSreenContent.scrollTop = chatSreenContent.scrollHeight;
}

chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let str = chatForm.chatText.value;
    // 입력 값이 공백과 엔터만 있을 경우 추가 x
    if (str.replaceAll(/(\n|\r|\s)/g, "").length != 0) {
        str = str.replace(/(\n|\r)/g, '<br/>');
        const toBeAdded = new ChatContent(str, new Date().getTime(), "me");
        settingMyChat(toBeAdded);
        //setTimeout(displayAllChat, 3000);
    }
    chatForm.chatText.value = "";
})