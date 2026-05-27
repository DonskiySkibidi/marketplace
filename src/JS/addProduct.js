import { saveProducts } from "./products.js";

export class AddProduct {
  constructor(formID, onChangeCallback, product) {
    this.formElement = document.getElementById(formID);
    this.onChangeCallback = onChangeCallback;
    this.products = product;
    this._bind();
  }

  getNewID() {
    if (this.products.size === 0) return 0;
    return Math.max(...this.products.keys()) + 1;
  }
  getInputs() {
    const formData = new FormData(this.formElement);

    return {
      id: this.getNewID(),
      name: formData.get("product-name") || "Без названия",
      price: Number(formData.get("product-price")) || 0,
      count: Number(formData.get("product-count")) || 0,
      img: "gin.png",
    };
  }
  saveInProduct() {
    const info = this.getInputs();

    this.products.set(info.id, info);
    saveProducts();
    this.onChangeCallback?.();
  }
  _bind() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.saveInProduct();
      this.formElement.reset();
    });
  }
}
