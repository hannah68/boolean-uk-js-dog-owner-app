import {data} from './src/data.js';
const listContainer = document.querySelector('.dogs-list');
const mainDog = document.querySelector('.main__dog-section');
const addBtn = document.querySelector('.dogs-list__button--add');


// show each dog infos===============================
const showDogInfo = (liId) => {
    mainDog.classList.add('show');
    
    for(let i=0; i<data.length; i++){
        if(data[i].id === Number(liId)){
            mainDog.innerHTML =`
                <h2>${data[i].name}</h2>
                <img src="${data[i].image}" alt="dog image"/>
                <div class="main__dog-section__desc">
                    <h3>Bio</h3>
                    <p>${data[i].bio}</p>
                </div class="main__dog-section__desc">
                <p>
                    <em>Is naughty?</em>
                    <span class='naughty'> ${data[i].isGoodDog=== 'true' ? 'No' : 'Yes'}</span>
                   </p>
                <button class="btn">${data[i].isGoodDog=== 'true' ? 'Good Dog' : 'bad Dog'}</button>
                `
        }
    }
    const btn = document.querySelector('.btn');
    const naughty = document.querySelector('.naughty');
    clickButtonDog(btn,naughty);
}

// show the list of dogs==================================
const listOfDogs = () => {

    data.map(info => {
        const listElement = document.createElement('li');
        listElement.classList.add('dogs-list__btn');
        listContainer.appendChild(listElement);
        listElement.innerText = `${info.name}`;
        // set id to my li
        listElement.setAttribute('dataId',`${info.id}`);
        clickLiEventFn(listElement);
    });
}


// click list function ===================================
const clickLiEventFn = listElement =>{
    listElement.addEventListener('click', function(e){
        const liId = e.target.attributes[1].value;
        showDogInfo(liId);
    })
}


// check click button good/bad dog & naughty/not=============
const clickButtonDog = (btn,naughty) => {
    btn.addEventListener('click', function(e){
        if(e.target.innerText === 'Good Dog'){
            e.target.innerText = 'Bad Dog';
            naughty.innerText = 'yes';
        }else{
            e.target.innerText = 'Good Dog';
            naughty.innerText = 'no';
        }
    })
}


// create a form to add dog===================================
const createForm =() => {
    mainDog.innerHTML =`
        <h2>Add a new Dog</h2>
        <form class="form">

            <label for="name">Dog's name</label>
            <input type="text" id="name" name="name">

            <label for="image">Dog's picture</label>
            <input type="url" id="image" name="image">

            <label for="bio">Dog's bio</label>
            <textarea rows="5" id="bio" name="bio"></textarea>

            <input type="submit" id="submit" name="submit" value="Let's add a dog!" class="form__button">
        </form>
        `
    const name = document.getElementById('name');
    const image = document.getElementById('image');
    const bio = document.getElementById('bio');
    const form = document.querySelector('.form');

    addNewDogToList(name,image,bio,form);
}


// Add new dog to the list=====================================
const addNewDogToList = (name,image,bio,form) => {
    form.addEventListener('submit',function(e){
        e.preventDefault();
        const num = data.length;
        // create a new dog object
        const myObj = {
            id: num + 1,
            name: name.value,
            bio: bio.value,
            isGoodDog: true,
            image: image.value
        }
        // push new obj to the data array
        data.push(myObj);
        // create new li to add to the list
        const newLi = document.createElement('li');
        newLi.classList.add('dogs-list__btn');
        addBtn.insertAdjacentElement('afterend', newLi);
        newLi.innerText = `${myObj.name}`;
        // set id to my li
        newLi.setAttribute('dataId',`${myObj.id}`);
        clickLiEventFn(newLi);
    })
}


// init the app=======================================
const startApp = () => {
    listOfDogs();
}
startApp();

// click on plus button to create form=================
addBtn.addEventListener('click', createForm);





