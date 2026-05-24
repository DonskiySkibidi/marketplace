import "./CSS/style.css";
import "./CSS/normalize.css";
import { Modal } from "./JS/modal.js";
import { Cart } from "./JS/cart.js";
import { GenerateProducts } from "./JS/generate.js";
import { products } from "./JS/products.js";

const cartModal = new Modal("cart-modal", "cart-button", "cartClose");
const createProductModal = new Modal(
  "addProductModal",
  "createProductButton",
  "createProductClose",
);

const generate = new GenerateProducts(products, "productsGrid");

const cart = new Cart(
  "productsGrid",
  "cart-items",
  "totalCountID",
  "totalSumID",
  () => {
    generate.render(products);
  },
  products,
);
