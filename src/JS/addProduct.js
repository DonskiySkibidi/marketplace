import { saveProducts } from "./products.js";

export class AddProduct {
  constructor(formID, onChangeCallback, product, cartToUpdate) {
    this.formElement = document.getElementById(formID);
    this.onChangeCallback = onChangeCallback;
    this.products = product;
    this.cartToUpdate = cartToUpdate;
    this._bind();
  }

  getNewID() {
    if (this.products.size === 0) return 0;
    return Math.max(...this.products.keys()) + 1;
  }
  saveInProduct(info) {
    this.products.set(info.id, info);
    saveProducts();
    this.onChangeCallback?.();
    this.formElement.reset();
  }
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  async getInputs() {
    const formData = new FormData(this.formElement);
    const file = formData.get("product-image");

    let img = "gin.png";

    if (file && file.size > 0) {
      try {
        img = await this.fileToBase64(file);
      } catch (error) {
        console.error("Ошибка при чтении файла", error);
      }
    }

    return {
      id: this.getNewID(),
      name: formData.get("product-name") || "Без названия",
      price: Number(formData.get("product-price")) || 0,
      count: Number(formData.get("product-count")) || 0,
      img: img,
    };
  }

  _bind() {
    this.formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      const info = await this.getInputs();

      this.saveInProduct(info);
      this.cartToUpdate.products = this.products;
    });
  }
}
