import "./CSS/style.css";
import "./CSS/normalize.css";
import { Modal } from "./JS/modal.js";
import { Cart } from "./JS/cart.js";
import { GenerateProducts } from "./JS/generate.js";
import { AddProduct } from "./JS/addProduct.js";

const apiURL = `https://6a1d89e7bcc4f20d5ca4be72.mockapi.io/shop/products`;

async function initApp() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`Ошибка сети`);

    const json = await response.json();

    const productsArray = new Map(json.map((item) => [String(item.id), item]));

    const cartModal = new Modal("cart-modal", "cart-button", "cartClose");
    const createProductModal = new Modal(
      "addProductModal",
      "createProductButton",
      "createProductClose",
    );

    const generate = new GenerateProducts(productsArray, "productsGrid");

    const cart = new Cart(
      "productsGrid",
      "cart-items",
      "totalCountID",
      "totalSumID",
      () => {
        generate.render(productsArray);
      },
      productsArray,
    );

    const addProduct = new AddProduct(
      "addProductForm",
      () => {
        generate.render(productsArray);
      },
      productsArray,
      cart,
    );
  } catch (error) {
    console.error("Ошибка инициализации приложения:", error);
  }
}
initApp();
