const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById("header");
const main = document.getElementById("main");
const input = document.getElementById("filter-text");
const button = document.getElementById("filter-button");
const select = document.getElementById("filter-select");
const resetBtn = document.getElementById('reset');
const more = document.getElementById('more');
const tothetop = document.getElementById('tothetop');

let currentDogs = [];

// 사진 뿌리는 함수
function displayDogs(item) {
  const dogImgDiv = document.createElement("div");
  dogImgDiv.classList.add("flex-item");
  dogImgDiv.innerHTML = `
            <img src=${item}>
        `;
  main.appendChild(dogImgDiv);
}

//웹 페이지가 처음 로딩되었을 때
window.addEventListener("load", function () {
  // 강아지 사진 뿌리기
  request1.open("get", apiRandomDogs);
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response);
    response.message.forEach(function (item) {
      currentDogs.push(item);
      displayDogs(item);
    });
  });
  request1.send();

  // 셀렉트에 견종 정보 뿌리기
  request2.open("get", apiAllBreeds);
  request2.addEventListener("load", function () {
    const response = JSON.parse(request2.response);
    Object.keys(response.message).forEach(function (item) {
      const option = document.createElement("option");
      option.textContent = item;
      option.value = item;
      select.appendChild(option);
    });
  });
  request2.send();
});

// 견종 입력했을 때 필터링
button.addEventListener("click", function () {
  main.innerHTML = "";
  // currentDogs에 있는 이미지 src에는 견종 이름이 포함되어 있음 그 이름을 가지고 필터링
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(input.value) !== -1;
  });

  input.value = "";

  filteredDogs.forEach(function (item) {
    displayDogs(item);
  });
});

// 셀랙트에서 골랐을 때 필터링
select.addEventListener("change", function () {
  main.innerHTML = "";
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(select.value) !== -1;
  });

  filteredDogs.forEach(function (item) {
    displayDogs(item);
  });
});

// 리셋 버튼 눌렀을 때 새로운 강아지 사진 뿌리기
resetBtn.addEventListener('click', function () {
  window.location.reload();
  // 단순히 리셋 버튼누르면 페이지 리로드 되게함
})

// more 눌렀을 때 강아지 사진 더 가져오기
more.addEventListener('click', function () {
  request1.open('get', apiRandomDogs);
  request1.addEventListener('load', function () {
    const response = JSON.parse(request1.response);
    response.message.forEach(function (item) {
      currentDogs.push(item);
      displayDogs(item);
    });
  })
  request1.send();
})

// top 눌렀을때 스크롤 맨 위로
tothetop.addEventListener('click', function () {
  // scrollTo: 주어진 위치로 스크롤을 이동
  // 위치에 대한 값을 객체 리터럴 형태로 줌
  window.scrollTo({ top: 0 });
})