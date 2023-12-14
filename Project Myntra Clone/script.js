// document.addEventListener('contextmenu', event => event.preventDefault());
let bag_item;
let bag_count = document.querySelector("#count");


onload();

function onload() {
  displayItems();
  bagLoad();
}

function bagLoad(){
  let bag_itemStr=localStorage.getItem('bagItems');
    if(bag_itemStr==undefined){
        bag_item=[];
      }
      else{
        bag_item=JSON.parse(bag_itemStr);
        if(!bag_count){return;};
      }
      bagcount();
};
function bagItems(id){
      bag_item.push(id);
       bagcount();
};
function bagcount(){
  if (bag_item.length > 0) {
    bag_count.style.visibility = "visible";
    }else{
    bag_count.style.visibility = "hidden";
    }
    bag_count.innerText = bag_item.length;
    localStorage.setItem('bagItems',JSON.stringify(bag_item));
}
function displayItems() {
let inHtml = "";
let itemsContainerElement = document.querySelector(".items_container");
if(!itemsContainerElement){return;}
  items.forEach((element) => {
    inHtml += `<div class="item-container">
        <img src="${element.image}" alt="Item Image" class="item-image">
        <div class="rating">${element.rating.stars}⭐|${element.rating.count}</div>
        <div class="company-name">${element.company}</div>
        <div class="item-name">${element.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${element.current_price}</span>
            <span class="orignal-price">Rs ${element.original_price}</span>
            <span class="discount">(${element.discount_percentage} OFF)</span>                    
        </div>
        <button class="addto-btn" onclick="bagItems(${element.id})">Add to Bag</button>
        </div>`;
  });

  itemsContainerElement.innerHTML = inHtml;
}

////SEARCH BAR
let inpu;
let searchInput=document.querySelector('.search_input');
let productPop=document.querySelector('.product-search');

productPop.addEventListener("keypress", (e) => {
  setTimeout(searchSort, 10);
  if(searchInput.value.length>0){
  document.getElementById("product-search-pop").style.display = "block";
  }
  else{
  document.getElementById("product-search-pop").style.display = "none";
  }
}); 

function searchSort(){
let searchList=[];
items.forEach((e) => {
  if (e.item_name.includes(searchInput.value)) {
    searchList.push({id:e.id,iName:e.item_name,iImage:e.image});
  }
});
searchDisp(searchList);

}

function searchDisp(arr){
  let searchContainer=document.querySelector('#product-search-pop');
  let innerh='';
  arr.forEach((e)=>{
    innerh += `
    <div class="miniSearch">
                    <span class="miniSearch-img"><img class="immg" src="${e.iImage}" alt=""></span>
                    <p class="miniSearch-name">${e.iName}</p>
                </div>
    `;
  })
  searchContainer.innerHTML=innerh;
}
