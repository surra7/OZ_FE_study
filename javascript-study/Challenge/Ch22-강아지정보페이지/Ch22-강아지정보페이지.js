const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")
const reset = document.getElementById('reset');
const more = document.getElementById("more")
const tothetop = document.getElementById("tothetop")

let currentDogs = []

function displayDogs(item) {
  const dogImgDiv = document.createElement("div")
  dogImgDiv.classList.add("flex-item")
  dogImgDiv.innerHTML = `
    <img src=${item}>
  `
  main.appendChild(dogImgDiv)
}

// 페이지가 새로 로딩 되었을 때
window.addEventListener("load", function () {
  // 강아지 사진 뿌리기
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", handleRequest1)
  request1.send()

  // 견종 텍스트 뿌리기
  request2.open("GET", apiAllBreeds)
  request2.addEventListener("load", function () {
    const response = JSON.parse(request2.response)
    Object.keys(response.message).forEach(function (item) {
      const option = document.createElement("option")
      option.textContent = item
      option.value = item
      select.appendChild(option)
    });
  })
  request2.send()
})

// 필터링 단어 검색
button.addEventListener("click", function () {
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(input.value) !== -1
  })
  input.value = ""
  filteredDogs.forEach(function (item) {
    displayDogs(item)
  });
})

// 셀랙트에서 필터링
select.addEventListener("change", function () {
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(select.value) !== -1
  })

  filteredDogs.forEach(function (item) {
    displayDogs(item)
  });
})

// 다시 강아지 사진 42개 가져오기
reset.addEventListener('click', function () {
  main.innerHTML = "";
  select.value = "";
  currentDogs = [];

  request1.removeEventListener('load', handleRequest1)
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", handleRequest1)
  request1.send()
})

// 강아지 사진 42개 더 가져오기
more.addEventListener("click", function () {
  select.value = "";
  // removeEvent를 해줘야 이전 사진 가져오는 이벤트가 취소되서 한번만 추가가 됨!!!
  request1.removeEventListener('load', handleRequest1)
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", handleRequest1)
  request1.send()
})

// 스크롤 맨 위로
tothetop.addEventListener("click", function () {
  window.scrollTo({ top: 0 })
})

// request1에 대한 이벤트 함수
function handleRequest1() {
  const response = JSON.parse(request1.response)
  response.message.forEach(function (item) {
    currentDogs.push(item)
    displayDogs(item)
  });
}