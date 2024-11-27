<template>
    <div class="dashboard-container">
      <!-- Navbar -->
      <header class="navbar">
        <div class="navbar-content">
          <span class="navbar-logo">Inua Mkulima Subsidy Program</span>
          <div class="navbar-right">
            <span>Logged In As: {{ firstName }}</span>
            <button class="logout-btn" @click="logout">Logout</button>
          </div>
        </div>
      </header>
  
      <div class="main-content">
        <!-- Sidebar -->
        <aside class="sidebar">
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </aside>
  
        <!-- Content Area -->
        <div class="content-wrapper">
          <!-- Wallet Balance -->
          <div class="wallet-balance">
            Inua Mkulima Wallet balance: 2400
          </div>
  
          <!-- Products and Selected Products in the same row -->
          <div class="products-row">
            <!-- Available Products -->
            <div class="product-card">
              <h3>Available Products</h3>
              <div class="products-list">
                <div v-for="product in products" :key="product.id" class="product-row">
                  <span class="product-column">{{ product.title }}</span>
                  <span class="product-column">{{ product.price }} kes</span>
                  <button class="add-btn" @click="addToCart(product)">+</button>
                </div>
              </div>
            </div>
  
            <!-- Selected Products -->
            <div class="selected-products-card">
              <h3>Selected Products</h3>
              <div v-if="cart.length > 0">
                <div v-for="item in cart" :key="item.id" class="product-row">
                  <span class="product-column">{{ item.title }}</span>
                  <span class="product-column">{{ item.price }} kes</span>
                  <span class="product-column">Quantity: {{ item.quantity }}</span>
                  <div class="action-buttons">
                    <button class="minus-btn" @click="reduceQuantity(item)">-</button>

                  </div>
                </div>
                <!-- Display Dynamic Total -->
                <div class="total-row">
                  <strong>Total:</strong>
                  <span>{{ totalAmount }} kes</span>
                </div>
              </div>
              <p v-else>No products selected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  
  
<script>
export default {
  name: "DashboardVue",
  data() {
    return {
      firstName: "",
      products: [],
      cart: [],
    };
  },
  mounted() {
    this.loadFirstName();
    this.fetchProducts();
  },
  computed: {
    // Calculate total dynamically
    totalAmount() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    loadFirstName() {
      this.firstName = localStorage.getItem("firstName") || "User";
    },
    async fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        this.products = data.products.slice(0, 5); // Adjust the number of products as needed
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    reduceQuantity(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else if (existingProduct) {
        // If quantity is 1, remove the product from the cart
        this.cart = this.cart.filter((item) => item.id !== product.id);
      }
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("firstName");
      window.location.reload(); // Or redirect to login page
    },
  },
};
</script>


  <style scoped>
  /* Reset some default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
  }
  
  /* Dashboard Layout */
  .dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  /* Navbar */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #443b00;
    color: white;
    padding: 10px 20px;
    z-index: 1000;
  }
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-logo {
    font-size: 22px;
    font-weight: bold;
  }
  
  .navbar-right {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .logout-btn {
    background-color: #ff9800;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .logout-btn:hover {
    background-color: #f57c00;
  }
  
  /* Sidebar */
  .main-content {
    margin-top: 50px;
    display: flex;
    flex: 1;
  }
  
  .sidebar {
    width: 250px;
    background-color: #f8f9fa;
    border-right: 1px solid #ddd;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
  }
  
  .sidebar li {
    margin-bottom: 15px;
  }
  
  .sidebar a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  
  .sidebar a:hover {
    color: #28a745;
  }
  
  /* Content Wrapper */
  .content-wrapper {
    flex: 1;
    padding: 20px;
  }
  
  /* Wallet Balance */
  .wallet-balance {
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  /* Products Row */
  .products-row {
    display: flex;
    gap: 20px;
  }
  
  /* Product and Selected Product Cards */
  .product-card,
  .selected-products-card {
    flex: 1;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background: #fff;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .product-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .product-column {
    flex: 1;
    text-align: center;
  }
  
  .add-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-btn:hover {
    background-color: #218838;
  }
  .total-row {
  margin-top: 10px;
  padding: 10px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
  </style>
  