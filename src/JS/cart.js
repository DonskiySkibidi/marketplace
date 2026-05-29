import { saveProducts } from "./products.js";

const STORAGE_KEY_CART = "space-app-cart";

export class Cart {
  constructor(
    productGridID,
    cartItemsID,
    totalCountID,
    totalSumID,
    onChangeCallback,
    products,
  ) {
    this.goods = document.getElementById(productGridID);
    this.itemsCart = document.getElementById(cartItemsID);
    this.totalCountElem = document.getElementById(totalCountID);
    this.totalSumElem = document.getElementById(totalSumID);
    this._products = new Map(products);
    this.cart = new Map(this._loadCart());
    this.onChangeCallback = onChangeCallback;
    this._bindClick();
    this.walkCart();
  }
  set products(products) {
    this._products = new Map(products);
  }
  getProductById(id) {
    return this._products.get(Number(id)) || null;
  }
  getImagePath(imgName) {
    if (imgName.startsWith("data:") || imgName.startsWith("blob:")) {
      return imgName;
    }
    return `${import.meta.env.BASE_URL}img/${imgName}`;
  }

  addToCart(button) {
    const id = button.dataset.id;
    const product = this.getProductById(id);
    if (!product || product.count <= 0) return;

    if (this.cart.has(id)) {
      const currentItem = this.cart.get(id);
      this.cart.set(id, {
        ...currentItem,
        count: currentItem.count + 1,
      });
    } else {
      this.cart.set(id, {
        name: product.name,
        count: 1,
        price: product.price,
        img: product.img,
      });
    }

    product.count--;
    this._saveCart();
    saveProducts(this._products);
    this.onChangeCallback?.();
    this.walkCart();
  }
  removeFromCart(button) {
    const id = button.dataset.id;
    const product = this.getProductById(id);
    if (!product) return;
    const currentItem = this.cart.get(id);
    if (!currentItem) return;
    if (currentItem.count === 1) {
      this.removeItem(button);
      return;
    }
    this.cart.set(id, {
      ...currentItem,
      count: currentItem.count - 1,
    });

    product.count++;

    this._saveCart();
    saveProducts(this._products);
    this.onChangeCallback?.();
    this.walkCart();
  }
  generateHTML(id, { name, count, price, img }) {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.setAttribute("data-id", id);

    const productImg = document.createElement("img");
    const fullImagePath = this.getImagePath(img);
    productImg.setAttribute("src", fullImagePath || null);
    productImg.setAttribute("alt", "productImg");

    const details = this.generateDetails({ name, count, price });

    const closeButton = document.createElement("button");
    closeButton.classList.add("remove-item");
    closeButton.innerHTML = "&times;";

    item.append(productImg, details, closeButton);
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

    const cartItem = this.cart.get(id);
    const product = this.getProductById(id);
    if (!product) return;

    this.cart.delete(id);
    product.count += cartItem.count;

    this._saveCart();
    saveProducts(this._products);
    this.onChangeCallback?.();
    this.walkCart();
  }

  _loadCart() {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  _saveCart() {
    localStorage.setItem(
      STORAGE_KEY_CART,
      JSON.stringify([...this.cart.entries()]),
    );
  }

  _bindClick() {
    document.body.addEventListener("click", (event) => {
      const addBtn = event.target.closest(".addToBasket");
      const removeBtn = event.target.closest(".removeFromBasket");

      if (addBtn) {
        this.addToCart(addBtn);
      }

      if (removeBtn) {
        this.removeFromCart(removeBtn);
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
