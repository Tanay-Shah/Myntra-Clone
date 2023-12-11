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
