const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById('header');
const main = document.getElementById('main');
const input = document.getElementById('filter-text');
const button = document.getElementById('filter-button');
const select = document.getElementById('filter-select');

const currentDogs = [];

//웹 페이지가 처음 로딩되었을 때
window.addEventListener('load', function(){
    // 강아지 사진 뿌리기
    request1.open('get', apiRandomDogs);
    request1.addEventListener('load', function(){
        const response = JSON.parse(request1.response);
        response.message.forEach(function(item){
            currentDogs.push(item);
            const dogImgDiv = document.createElement('div');
            dogImgDiv.classList.add('flex-item');
            dogImgDiv.innerHTML = `
                <img src=${item}>
            `
            main.appendChild(dogImgDiv);
        });
    })
    request1.send();

    // 셀렉트에 견종 정보 뿌리기
    request2.open('get', apiAllBreeds);
    request2.addEventListener('load', function(){
        const response = JSON.parse(request2.response);
        Object.keys(response.message).forEach(function(item){
            const option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            select.appendChild(option);
        });
    })
    request2.send();
})

// 견종 입력했을 때 필터링
button.addEventListener('click', function(){
    main.innerHTML = "";
    // currentDogs에 있는 이미지 src에는 견종 이름이 포함되어 있음 그 이름을 가지고 필터링
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(input.value) !== -1
    })

    input.value = "";

    filteredDogs.forEach(function(item){
        currentDogs.push(item);
        const dogImgDiv = document.createElement('div');
        dogImgDiv.classList.add('flex-item');
        dogImgDiv.innerHTML = `
            <img src=${item}>
        `
        main.appendChild(dogImgDiv);
    })
})

// 셀랙트에서 골랐을 때 필터링
select.addEventListener('change', function(){
    main.innerHTML = "";
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(select.value) !== -1
    })

    filteredDogs.forEach(function(item){
        currentDogs.push(item);
        const dogImgDiv = document.createElement('div');
        dogImgDiv.classList.add('flex-item');
        dogImgDiv.innerHTML = `
            <img src=${item}>
        `
        main.appendChild(dogImgDiv);
    })
})