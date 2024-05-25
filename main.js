"use strict";

//-------------Creating Elements --------------------------------

let body = document.body;
let header = document.createElement('header');
let h3 = document.createElement('h3');
h3.textContent = "Pagination";
let container = document.createElement('div');
let maindiv = document.createElement('div');
let buttondiv = document.createElement('div');
let arrow1 = document.createElement('button');
arrow1.innerHTML = `<i class="fa-solid fa-caret-left"></i><i class="fa-solid fa-caret-left"></i>`;
let arrow2 = document.createElement('button');
arrow2.innerHTML = `<i class="fa-solid fa-caret-right"></i><i class="fa-solid fa-caret-right"></i>`;
let button1 = document.createElement('button');
button1.textContent = '1';
let button2 = document.createElement('button');
button2.textContent = '2';
let button3 = document.createElement('button');
button3.textContent = '3';
let button4 = document.createElement('button');
button4.textContent = '4';

//------------- Show Details--------------------------------
let show = document.createElement('div'); 
let showContent = document.createElement('div');
let showClose = document.createElement('span');
let showminidiv = document.createElement('div');
let showmini1 = document.createElement('img');
let showmini2 = document.createElement('img');
let showmini3 = document.createElement('img');
showClose.innerHTML = `<i class="fa-solid fa-x"></i>`;
let showImg = document.createElement('img');
let showimgdiv = document.createElement('div');
let showDes = document.createElement('p');
let showtextdiv = document.createElement('div');
let showTitle = document.createElement('h2');
let showPrice = document.createElement('p');
let addtocart=document.createElement('button');
addtocart.textContent = 'Add to Cart';
let pricediv = document.createElement('div');
let minidiv1 = document.createElement('div');
let minidiv2 = document.createElement('div');
let minidiv3 = document.createElement('div');

//-------------Set attributes --------------------------------

h3.setAttribute('id', "headtag");
container.setAttribute('id', "container");
maindiv.setAttribute('id', "maindiv");
buttondiv.setAttribute('id', 'buttondiv');
arrow1.setAttribute('class', 'arrow');
arrow2.setAttribute('class', 'arrow');
show.setAttribute('class', 'show');
showImg.setAttribute('class', 'showimg');
showContent.setAttribute('class', 'content');
showClose.setAttribute('class', 'close');
showimgdiv.setAttribute('class', 'imgdiv');
showminidiv.setAttribute('class','minidiv');
showmini1.setAttribute('class', 'miniimg');
showmini2.setAttribute('class','miniimg');
showmini3.setAttribute('class','miniimg');
showtextdiv.setAttribute('class', 'textdiv');
showDes.setAttribute('class','para')
addtocart.setAttribute('class', 'cartbtn')
pricediv.setAttribute('class', 'pricediv')
minidiv1.setAttribute('class','imgminidiv');
minidiv2.setAttribute('class','imgminidiv');
minidiv3.setAttribute('class','imgminidiv');
button1.setAttribute('id','btn')
button2.setAttribute('id','btn')
button3.setAttribute('id','btn')
button4.setAttribute('id','btn')

button1.classList.add('active');
show.style.display = 'none';

//------------- Getting API and Functions --------------------------------
let products = [];
let currentPage = 1;
let productsPerPage = 3;

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        products = json;
        display(currentPage);
    })

function display(page) {
    maindiv.innerHTML = '';

    let start = (page - 1) * productsPerPage;
    let end = start + productsPerPage;
    for (let i = start; i < end; i++) {
        if (products[i]) {
            let div = document.createElement('div');
            div.setAttribute('class', "childdiv");
            createProduct(products[i], div);
        }
    }
}

function createProduct(product, div) {
    let img = document.createElement('img');
    img.src = product.image;

    let name = document.createElement('p');
    name.textContent = product.title;

    let price = document.createElement('p');
    price.textContent = `$${product.price}`;

    let showbutton = document.createElement('button');
    showbutton.setAttribute('class', 'showbtn');
    showbutton.textContent = 'Show Details';
    showbutton.addEventListener('click', () => {
        showTitle.textContent = product.title;
        showPrice.textContent = `$${product.price}`;
        showImg.src = product.image;
        showmini1.src = product.image;
        showmini2.src = product.image;
        showmini3.src = product.image;
        showDes.textContent = product.description;
        show.style.display = "block";
        container.style.display = "none";
    });

 //-------------Appending product elements --------------------------------

    div.append(img, name, price, showbutton);
    maindiv.appendChild(div);
    container.appendChild(maindiv);
    body.appendChild(container);
}

//-------------Appending elements --------------------------------
header.appendChild(h3);
buttondiv.append(arrow1, button1, button2, button3, button4, arrow2);
container.appendChild(buttondiv);
body.appendChild(header);
body.appendChild(container);

pricediv.append(showPrice,addtocart)
showtextdiv.append(showTitle,showDes,pricediv)
minidiv1.append(showmini1);
minidiv2.append(showmini2);
minidiv3.append(showmini3);
showminidiv.append(minidiv1,minidiv2,minidiv3);
showimgdiv.append(showImg, showminidiv);
showContent.append(showClose,showimgdiv, showtextdiv);
show.appendChild(showContent);
body.appendChild(show);

//-------------Event Listeners for Buttons --------------------------------
showClose.onclick = function () {
    show.style.display = "none";
    container.style.display = "flex";
}

function updateActiveButton() {
    button1.classList.remove('active');
    button2.classList.remove('active');
    button3.classList.remove('active');
    button4.classList.remove('active');

    if (currentPage == 1) {
        button1.classList.add('active');
    } else if (currentPage == 2) {
        button2.classList.add('active');
    } else if (currentPage == 3) {
        button3.classList.add('active');
    } else if (currentPage == 4) {
        button4.classList.add('active');
    }
}

function updateArrowStyles() {
    arrow1.classList.remove('disabled');
    arrow2.classList.remove('disabled');

    if (currentPage == 1) {
        arrow1.classList.add('disabled');
    }
    if (currentPage == 4) {
        arrow2.classList.add('disabled');
    }
}

var btn=document.querySelectorAll('#btn')
btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        currentPage = btn.textContent;
        display(currentPage);
        updateActiveButton();
        updateArrowStyles();
    });
});

let arrow = document.querySelectorAll('.arrow');
arrow1.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        display(currentPage);
        updateActiveButton();
        updateArrowStyles();
    }
});

arrow2.addEventListener('click', () => {
    if (currentPage < 4) {
        currentPage++;
        display(currentPage);
        updateActiveButton();
        updateArrowStyles();
    }
});

updateArrowStyles();
