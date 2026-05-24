export class GenerateProducts {
  constructor(products, whereID) {
    this.products = products;
    this.where = document.getElementById(whereID);
    this.render(products);
  }
  generateHTML(id, good) {
    const divProduct = document.createElement("div");
    divProduct.className = "product";

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "./src/assets/img/cf6894517fbcbad9f2749d254bf550c0.png",
    );
    img.setAttribute("alt", "productImg");
    divProduct.append(img);
    const desc = this.generateDesc(id, good);
    divProduct.append(desc);
    return divProduct;
  }
  generateDesc(id, good) {
    const productDesc = document.createElement("div");
    productDesc.className = "product-desc";

    const name = document.createElement("h2");
    name.innerText = `${good.name}`;

    const count = document.createElement("h4");
    count.innerHTML = `В наличии <span>${good.count}</span>`;

    const toBasket = document.createElement("div");
    toBasket.className = "toBasket";

    const sum = document.createElement("h5");
    sum.innerText = `${good.price} рублей`;

    const button = document.createElement("button");
    button.className = "addToBasket";
    button.setAttribute("data-id", `${id}`);
    button.innerText = `В корзину`;

    toBasket.append(sum, button);
    productDesc.append(name, count, toBasket);
    return productDesc;
  }
  render(products) {
    this.where.innerHTML = "";
    Object.entries(products).forEach(([id, good]) => {
      const product = this.generateHTML(id, good);
      this.where.append(product);
    });
  }
}