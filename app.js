// Elementos del DOM
const loadProductsButton = document.getElementById('loadProducts');
const productsContainer = document.getElementById('productsContainer');
const cartContainer = document.getElementById('cartContainer');

// Carrito de compras
let cart = [];

// Función asincrónica para obtener productos de la API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products); // Mostrar productos
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

// Mostrar productos
const displayProducts = (products) => {
  productsContainer.innerHTML = ''; // Limpiar contenedor
  products.forEach(product => {
    // Crear estructura básica de producto
    productsContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
      </div>
    `;
  });
};

// Agregar producto al carrito
const addToCart = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  cart.push(product); // Añadir al carrito
  displayCart(); // Mostrar carrito
};

// Mostrar carrito
const displayCart = () => {
  cartContainer.innerHTML = ''; // Limpiar carrito
  cart.forEach((product, index) => {
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="removeFromCart(${index})">Eliminar</button>
      </div>
    `;
  });
};

// Eliminar producto del carrito
const removeFromCart = (index) => {
  cart.splice(index, 1); // Eliminar producto por índice
  displayCart(); // Actualizar vista
};

// Evento para cargar productos
loadProductsButton.addEventListener('click', fetchProducts);

