const STORAGE_KEY_PRODUCTS = "space-app-products";

const defaultProducts = [
  {
    id: 0,
    name: "Гин Ичимару",
    price: 2000,
    count: 5,
    img: "gin.png",
  },
  {
    id: 1,
    name: "Скибиди",
    price: 20,
    count: 10,
    img: "pig.png",
  },
  {
    id: 2,
    name: "Лол",
    price: 5000,
    count: 42,
    img: "ussop.png",
  },
];

function loadProducts() {
  const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (!saved) return defaultProducts.map((item) => ({ ...item }));

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed
      : defaultProducts.map((item) => ({ ...item }));
  } catch {
    return defaultProducts.map((item) => ({ ...item }));
  }
}

export const products = loadProducts();

export function saveProducts(data) {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(data));
}

export function findProductById(id) {
  return products.find((item) => item.id === Number(id));
}

export function getProductIndex(id) {
  return products.findIndex((item) => item.id === Number(id));
}
