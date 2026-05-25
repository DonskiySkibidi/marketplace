export class GenerateProducts {
  constructor(products, whereID) {
    this.products = products;
    this.where = document.getElementById(whereID);
    this.render(products);
  }
  generateHTML(good) {
    const divProduct = document.createElement("div");
    divProduct.className = "product";

    const img = document.createElement("img");
    const fullImagePath = `${import.meta.env.BASE_URL}img/${good.img}`;
    img.setAttribute("src", fullImagePath || null);
    img.setAttribute("alt", "productImg");
    divProduct.append(img);
    const desc = this.generateDesc(good);
    divProduct.append(desc);
    return divProduct;
  }
  generateDesc(good) {
    const productDesc = document.createElement("div");
    productDesc.className = "product-desc";

    const name = document.createElement("h2");
    name.innerText = good.name;

    const count = document.createElement("h4");
    count.innerHTML = `В наличии <span>${good.count}</span>`;

    const toBasket = document.createElement("div");
    toBasket.className = "toBasket";

    const sum = document.createElement("h5");
    sum.innerText = `${good.price} рублей`;

    const button = this.generateButton(good);

    toBasket.append(sum, button);
    productDesc.append(name, count, toBasket);
    return productDesc;
  }
  generateButton(good) {
    const div = document.createElement("div");
    div.className = "productInCartButtons";

    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    button1.innerText = "Add";
    button1.setAttribute("data-id", `${good.id}`);
    button1.className = "addToBasket";

    button2.innerText = "Remove";
    button2.setAttribute("data-id", `${good.id}`);
    button2.className = "removeFromBasket";

    div.append(button1, button2);

    return div;
  }
  render(products) {
    this.where.innerHTML = "";
    products.forEach((good) => {
      const product = this.generateHTML(good);
      this.where.append(product);
    });
  }
}
