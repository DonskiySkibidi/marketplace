// copilot
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

// copilot
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

// copilot
const rawProductsArray = loadProducts();

export const products = new Map(
  rawProductsArray.map((item) => [item.id, item]),
);

// Функция сохранения теперь должна превращать Map обратно в строку JSON
export function saveProducts() {
  // products.values() достает чистые объекты товаров, делаем из них массив и сохраняем
  const arrayToSave = Array.from(products.values());
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(arrayToSave));
}

// Теперь вместо find и findIndex у нас мгновенный поиск по ключу!
export function findProductById(id) {
  return products.get(Number(id)) || null;
}
