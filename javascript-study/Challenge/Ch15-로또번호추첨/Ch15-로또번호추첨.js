const todaySpan = document.querySelector('#today');
const numbersDiv = document.querySelector('.numbers');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');

let lottoNumbers = [];
const colors = ['orange', 'skyblue', 'red', 'purple', 'green'];

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
todaySpan.textContent = `${year}년 ${month}월 ${date}일 `;

function paintNumber(number){
    const eachNumDiv = document.createElement('div');
    eachNumDiv.classList.add("eachnum");
    let colorIndex = Math.floor(number / 10);
    eachNumDiv.style.backgroundColor = colors[colorIndex];
    eachNumDiv.textContent = number;
    numbersDiv.append(eachNumDiv);
}

//클릭하면 랜덤숫자 여섯개가 배열에 추가
drawButton.addEventListener('click', function(){
    numbersDiv.innerHTML = "";
    while(lottoNumbers.length < 6){
        let rn = Math.floor(Math.random() * 45) + 1;
        if(lottoNumbers.indexOf(rn) === -1){
            lottoNumbers.push(rn);
            paintNumber(rn);
        }
    }
    lottoNumbers.splice(0, 6);
})

resetButton.addEventListener('click', function(){
    lottoNumbers.splice(0, 6);
    numbersDiv.innerHTML = "";
})

// 추첨 버튼을 누른 후 다시 버튼을 누르지 않은채 추첨을 눌러도 다시 번호가 추첨
// 되도록