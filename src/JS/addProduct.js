export class AddProduct {
  constructor(formID, onChangeCallback, product, cartToUpdate) {
    this.formElement = document.getElementById(formID);
    this.onChangeCallback = onChangeCallback;
    this.products = product;
    this.cartToUpdate = cartToUpdate;
    this._bind();
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

      try {
        const response = await fetch(
          `https://6a1d89e7bcc4f20d5ca4be72.mockapi.io/shop/products`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
          },
        );

        if (response.ok) {
          const createdProduct = await response.json();

          this.products.set(String(createdProduct.id), createdProduct);
          this.cartToUpdate.products = this.products;

          this.onChangeCallback?.();
          this.formElement.reset();
        }
      } catch (error) {
        console.error("Ошибка сети при добавлении товара:", error);
      }
    });
  }
}
