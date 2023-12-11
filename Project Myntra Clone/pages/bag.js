let bag_Items_List;


onLoad();


function onLoad() {
  loadItems();
  displayBagItems();
  bagSummary();

}

function loadItems() {
  bag_Items_List = bag_item.map((element) => {
    for (let i = 0; i < items.length; i++) {
      if (element == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bag_Items_List);
}

function removeFromBag(rId){

  bag_item = bag_item.filter((element) => {
    return rId != element;
  });
  loadItems();
  displayBagItems();
  bagcount();
  bagSummary();
}

function displayBagItems(){
  let containerElement=document.querySelector('.bag-items-container');
  let inBagHtml='';

  bag_Items_List.forEach(element => {
    
    inBagHtml+=`<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${element.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${element.company}</div>
      <div class="item-name">${element.item_name}</div>
      <div class="price-container">
        <span class="current-price">${element.current_price}</span>
        <span class="orignal-price">${element.original_price}</span>
        <span class="discount-percentage">${element.discount_percentage}</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${element.return_period} Days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${element.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${element.id});">X</div>
  </div>`
  });

  containerElement.innerHTML=inBagHtml;
}

function bagSummary(){
let bagSummaryElement=document.querySelector('.bag-summary');

let totalItems=bag_Items_List.length;
let totalMrp=0;
let totalDiscount=0;

bag_Items_List.forEach(element => {
    totalMrp+=element.original_price;
    totalDiscount+=element.original_price-element.current_price;
});
let conviFees= totalMrp>0 ?49:0;
let finalPayment=totalMrp-totalDiscount+conviFees;

bagSummaryElement.innerHTML =` <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹ ${totalMrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">₹ ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ ${conviFees}</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalPayment}</span>
  </div>
  </div>
  <button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
  </button>`
}
