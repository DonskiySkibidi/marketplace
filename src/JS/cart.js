
export class Cart {
  constructor(productGridID, cartItemsID, totalCountID, totalSumID, onChangeCallback, products) {
    this.goods = document.getElementById(productGridID);
    this.itemsCart = document.getElementById(cartItemsID);
    this.totalCountElem = document.getElementById(totalCountID);
    this.totalSumElem = document.getElementById(totalSumID);
    this.products = products;
    this.cart = new Map();
    this.onChangeCallback = onChangeCallback;
    this._bindClick();
  }

  addToCart(button) {
    const id = button.dataset.id;
    if (!id || !this.products[id] || this.products[id].count <= 0) return;

    const product = products[id];

    if (this.cart.has(id)) {
      const currentItem = this.cart.get(id);
      this.cart.set(id, {
        ...currentItem,
        count: currentItem.count + 1
      });
    } else {
      this.cart.set(id, {
        name: product.name,
        count: 1,
        price: product.price,
      });
    }

    product.count--;
    this.onChangeCallback?.();
  }

  generateHTML(id, { name, count, price }) {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.setAttribute("data-id", id);

    const img = document.createElement("img");
    img.setAttribute("src", "./src/assets/img/cf6894517fbcbad9f2749d254bf550c0.png");
    img.setAttribute("alt", "productImg");

    const details = this.generateDetails({ name, count, price });

    const closeButton = document.createElement("button");
    closeButton.classList.add("remove-item");
    closeButton.innerHTML = "&times;";

    item.append(img, details, closeButton);
    return item;
  }

  generateDetails({ name, count, price }) {
    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const h3 = document.createElement("h3");
    h3.innerText = name;
    
    const p = document.createElement("p");
    p.innerText = `${price} руб. x ${count} шт.`; 
    
    itemDetails.append(h3, p);
    return itemDetails;
  }

  generateTotals(count, sum) {
    if (this.totalCountElem) this.totalCountElem.innerText = `${count} шт.`;
    if (this.totalSumElem) this.totalSumElem.innerText = `${sum} руб.`;
  }

  walkCart() {
    this.itemsCart.innerHTML = "";
    let count = 0;
    let sum = 0;


    for (const [id, obj] of this.cart.entries()) {
      const elem = this.generateHTML(id, obj);
      this.itemsCart.append(elem);
      
      count += obj.count;
      sum += obj.price * obj.count; 
    }
    
    this.generateTotals(count, sum);
  }

  removeItem(item) {
    const id = item.dataset.id;
    if (!id || !this.cart.has(id)) return;

    const count = this.cart.get(id).count;
    this.cart.delete(id);
    products[id].count += count;

    this.walkCart();
    this.onChangeCallback?.();
  }

  _bindClick() {
    this.goods.addEventListener("click", (event) => {
      const targetButton = event.target.closest(".addToBasket");
      if (targetButton) {
        this.addToCart(targetButton);
        this.walkCart();
      }
    });

    this.itemsCart.addEventListener("click", (event) => {
      const closeButton = event.target.closest(".remove-item");
      if (!closeButton) return;
      const delItem = closeButton.closest(".cart-item");
      this.removeItem(delItem);
    });
  }
}