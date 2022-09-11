
let popup_sinup = document.querySelector(".popupsingup");

function opensingup(){
    popup_sinup.classList.add("opensingup");
}
function closesignup(){
    popup_sinup.classList.remove("opensingup");
}
let popup_sinin = document.querySelector(".popupsingin");

function opensinin(){
    popup_sinin.classList.add("opensingin");
}
function closesinin(){
    popup_sinin.classList.remove("opensingin");
}
// let sinupform = document.querySelector(".popupsingup>form");
// sinupform.addEventListener("submit",function(event){
//     event.preventDefault();
//     let obj={
//         email:sinupform.email.value,
//         password:sinupform.pass.value,
//     }
//     let singupdata = JSON.parse(localStorage.getItem("sinupdetail")) || [];
//     singupdata.push(obj);
//     localStorage.setItem("sinupdetail",JSON.stringify(singupdata));
//     console.log(singupdata);
//     popup_sinup.classList.remove("opensingup");
// });
// let sininform = document.querySelector(".popupsingin>form");
// sininform.addEventListener("submit",function(event){
//     event.preventDefault();
//     let obj={
//         email:sininform.email.value,
//         password:sininform.pass.value,
//     }
//     console.log(obj)
//     let singupdata = JSON.parse(localStorage.getItem("sinupdetail")) || [];
//     for(let i=0;i<singupdata.length;i++){
//         if(obj.email==singupdata[i].email && obj.password==singupdata[i].password){
//             window.location.href="/loginsucces.html";
//         }
//     }
// });
function getinput(id){
    const value = document.getElementById(id).value;
    return value;
}

function User(n,e,p,u,m,d){
    this.name =n;
    this.email=e;
    this.password =p;
    this.username=u;
    this.mobile=m;
    this.description=d;

}



async function Register(){
    const name = getinput('name');
    const email = getinput('email');
    const password = getinput('password');
    const username =getinput('username');
    const mobile = getinput('mobile');
    const description =getinput('description');

    let udata=new User(name,email,password,username,mobile,description);
    console.log(udata);


    const rurl = 'https://masai-api-mocker.herokuapp.com/auth/register'
    let res= await fetch(rurl,{
        method: 'POST',
        body: JSON.stringify(udata),
        headers:{
            'Content-Type':'application/json',
        },
    });
    let data = await res.json();
}

async function Login(){
    let ldata={
        username:getinput('lusername'),
        password:getinput('lpassword'),
    };
    const lurl = `https://masai-api-mocker.herokuapp.com/auth/login`;

    let res= await fetch(lurl,{
        method: 'POST',
        body: JSON.stringify(ldata),
        headers: {
            'Content-Type':'application/json',
        },
    });
    let data = await res.json();
    console.log(data);
    let token =data.token;
    getpro(ldata.username,token)
}

async function getpro(username,token){
    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`;

    let res = await fetch(api,{
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    let data =await res.json();
    console.log(data);
    window.location.href="loginsuccess.html"
}


function Start(){
    let data=[
        {image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/2212/1042212-h-0e83e926cfc1"},
        {image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6530/1326530-h-f2a7e4e4e3d6"},
        {image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6700/1026700-h-baab56827741"},
        {image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8315/1328315-h-017b4fc66d35"},
        {image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/9475/1339475-h-990c355522f1"},
    ]
let container=document.querySelector(".container");
container.innerHTML=null;
let image=document.createElement("img");
image.src=data[0].image;
container.append(image);
let i=0;
i++;
setInterval(function(){

    if(i===data.length){
        i=0;
    }
    image.src=data[i].image;

    container.append(image);
    i++;

},3000);

}
Start();
async function serchmovie(){
    try{
        // document.getElementById('con').scrollIntoView();

        let query = document.getElementById("query").value;
    
        
        let res = await fetch(`https://www.omdbapi.com/?apikey=903a510e&s=${query}&type=movie`);
    
        let data= await res.json();
        let acda=data.Search
        // opop(acda);
        cdf(acda)
        console.log(acda);
    }catch(err){
        console.log(err);
    }

}
function cdf(acda){
let fdata = new Promise(function(resolve,reject){

    setTimeout(function(){

        let data = acda;
        if(data!=null){
            resolve(data);
        }else{
            reject("nahi haraha kaha gya pata nahi");
        }

    },5000);

});

fdata.then(function (res){
    console.log(res);
    opop(acda);
}).catch(function (err){
    console.log(err);
});

}

// function constuctor(t,i,y){
//     this.Title = t;
//     this.Poster = i;
//     this.Year = y;
// }

// let arr = JSON.parse(localStorage.getItem("deta"))||[];

function opop(acdata){
    let con = document.querySelector(".con");
    con.innerHTML=null;
    con.id="con";
    acdata.forEach(function(el){

        let div = document.createElement("div");
        let name = document.createElement("p");
        name.innerText=el.Title;
        let date = document.createElement("p");
        date.innerText=el.Year;
        let image = document.createElement("img");
        image.src=el.Poster;
        let btn= document.createElement("button");
        btn.innerHTML="getdata";
        btn.style.padding="10px";
        btn.style.color="white";
        btn.style.backgroundColor="black";
        btn.style.border="none";

        btn.addEventListener("click",function(){
            // let obj= new constuctor(el.Title,el.Poster,el.Year);
                // arr.push(obj);
                // localStorage.setItem("deta",JSON.stringify(arr));
                console.log("hello");
                popup(el.Title,el.Poster,el.Year);
                let popup_offer = document.querySelector(".popupoffer");
                popup_offer.classList.add("openoffer");

        })
        div.append(image,name,date,btn);
        con.append(div);
    })

}


function popup(t,p,y){
    let popup_offer = document.querySelector(".popupoffer");
    popup_offer.innerHTML=null;
    let close=document.createElement("p");
    close.className="closepopupoffer";
    close.innerHTML="&#10005";
    close.addEventListener("click",function(){
        popup_offer.classList.remove("openoffer");
    })
    let name = document.createElement("p");
    name.innerText=t;
    let date = document.createElement("p");
    date.innerText=y;
    let image = document.createElement("img");
    image.src=p;
    popup_offer.append(close,image,name,date);
}

async function notop(){
    try{

        let query = document.getElementById("query").value;
        
        let res = await fetch(`https://www.omdbapi.com/?apikey=903a510e&s=${query}&type=movie`);
    
        let data= await res.json();
        let acdata=data.Search
        oppop( acdata);
    }catch(err){
        console.log(err);
    }

}
function oppop(acdata){
    let con = document.querySelector(".serachi");
        if(acdata===undefined){
            con.innerHTML=null;
            return false;
        }
        con.innerHTML=null;
        con.id="sep";
        acdata.forEach(function(el){
    
            let div = document.createElement("div");
            let div2= document.createElement("div");
            let name = document.createElement("p");
            name.innerText=el.Title;
            let date = document.createElement("p");
            date.innerText=el.Year;
            div2.append(name,date);
            let image = document.createElement("img");
            image.src=el.Poster;
            div.append(image,div2);
            con.append(div);
        })
    
    }

let id;
    function debounce(ntp,delay){
        if(id){
            clearTimeout(id);
        }
        id=setTimeout(function(){
            ntp();
        },delay);
    }

let movie=[
    {name:"The Dark Knight",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51uN6a8e6eL._AC_.jpg",rating:9.0,date:2008},
    {name:"12 Angry Men",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71DFwAcTZLL._AC_SY879_.jpg",rating:8.9,date:1957},
    {name:"Joker",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31J8gN3sRPL._AC_.jpg",rating:8.3,date:2019},
    {name:"Pulp Fiction",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61MjqfuBB9L._AC_SX679_.jpg",rating:8.8,date:1994},
    {name:"Fight Club",poster:"https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T1/images/I/71CwM7bYtfL.__AC_SX300_SY300_QL70_FMwebp_.jpg",rating:8.7,date:1999},
    {name:"The Godfather",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51xxQPXEo1L._AC_SX679_.jpg",rating:9.2,date:1972},
    {name:"Inception",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71JhjA4989L._AC_SY879_.jpg",rating:8.7,date:2010},
    {name:"Se7en",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81VaTAKjOoL._AC_SY879_.jpg",rating:8.6,date:1995},
    {name:"The Shawshank Redemption",poster:"https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71JxA6I+sgL._AC_SY300_SX300_.jpg",rating:9.2,date:1994},
];
localStorage.setItem("movie",JSON.stringify(movie));
function op(){
    let con = document.querySelector(".dis");
    con.innerHTML=null;
    con.id="container";
    movie.forEach(function(el){

        let div = document.createElement("div");
        let name = document.createElement("p");
        name.innerText=el.name;
        let rate = document.createElement("p");
        rate.innerText=`Rating: ${el.rating}`;
        let date = document.createElement("p");
        date.innerText=el.date;
        let image = document.createElement("img");
        image.src=el.poster;
        div.append(image,name,rate,date);
        con.append(div);
    })
}


document.getElementById("sort-lh").addEventListener("click",function (){
movie.sort(function (a,b){
    if(a.rating > b.rating) return 1;
    if(a.rating < b.rating) return -1;
    return 0;
});
op();
});
document.getElementById("sort-hl").addEventListener("click",function (){
movie.sort(function (a,b){
    if(a.rating > b.rating) return -1;
    if(a.rating < b.rating) return 1;
    return 0;
});
op();
});

let fetchdata = new Promise(function(resolve,reject){

    setTimeout(function(){

        let data = movie;
        if(data!=null){
            resolve(data);
        }else{
            reject("nahi haraha kaha gya pata nahi");
        }

    },5000);

});

fetchdata.then(function (res){
    console.log(res);
    op();
}).catch(function (err){
    console.log(err);
});


let slideIndex = 1;
      showSlides(slideIndex);
      function plusSlides(n) {
         showSlides(slideIndex += n);
      }
      function currentSlide(n) {
         showSlides(slideIndex = n);
      }
      function showSlides(n) {
         let i;
         let dots = document.getElementsByClassName("dot");
         let slides = document.getElementsByClassName("mySlides");
         if (n > slides.length) {slideIndex = 1}
         if (n < 1) {slideIndex = slides.length}
         for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
         }
         for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
         }
         slides[slideIndex-1].style.display = "block";
         dots[slideIndex-1].className += " active";
      }