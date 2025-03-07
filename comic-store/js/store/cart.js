document.addEventListener("DOMContentLoaded", () => {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // DOM elements
  const cartItemsContainer = document.getElementById("cartItemsContainer")
  const emptyCartMessage = document.getElementById("emptyCartMessage")
  const cartActions = document.getElementById("cartActions")
  const cartSummary = document.getElementById("cartSummary")
  const cartSubtotal = document.getElementById("cartSubtotal")
  const cartShipping = document.getElementById("cartShipping")
  const cartDiscount = document.getElementById("cartDiscount")
  const cartTotal = document.getElementById("cartTotal")
  const discountRow = document.getElementById("discountRow")
  const cartCount = document.getElementById("cartCount")

  // Sample product data (in a real app, this would come from a database)
  const products = [
    {
      id: 1,
      title: "Batman: The Dark Knight Returns",
      price: 19.99,
      image: "../img/products/batman.jpg",
      category: "DC Comics",
    },
    {
      id: 2,
      title: "Spider-Man: Miles Morales Vol. 1",
      price: 17.99,
      image: "../img/products/spiderman.jpg",
      category: "Marvel",
    },
    {
      id: 3,
      title: "Wonder Woman: Year One",
      price: 16.99,
      image: "../img/products/wonderwoman.jpg",
      category: "DC Comics",
    },
    {
      id: 4,
      title: "X-Men: Dark Phoenix Saga",
      price: 14.99,
      image: "../img/products/xmen.jpg",
      category: "Marvel",
    },
    {
      id: 5,
      title: "Iron Man: Extremis",
      price: 18.99,
      image: "../img/products/ironman.jpg",
      category: "Marvel",
    },
    {
      id: 6,
      title: "Watchmen: Deluxe Edition",
      price: 29.99,
      image: "../img/products/watchmen.jpg",
      category: "DC Comics",
    },
  ]

  // Initialize cart page
  function initCart() {
    // Update cart count
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
    }

    // Check if cart is empty
    if (cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = "block"
      if (cartActions) cartActions.style.display = "none"
      if (cartSummary) cartSummary.style.display = "none"
      return
    }

    // Hide empty cart message and show cart actions and summary
    if (emptyCartMessage) emptyCartMessage.style.display = "none"
    if (cartActions) cartActions.style.display = "flex"
    if (cartSummary) cartSummary.style.display = "block"

    // Render cart items
    renderCartItems()

    // Calculate and update cart summary
    updateCartSummary()
  }

  // Render cart items
  function renderCartItems() {
    if (!cartItemsContainer) return

    // Clear container except for empty cart message
    const children = Array.from(cartItemsContainer.children)
    children.forEach((child) => {
      if (child.id !== "emptyCartMessage") {
        child.remove()
      }
    })

    // Add cart items
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id)
      if (!product) return

      const subtotal = (product.price * item.quantity).toFixed(2)

      const cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item"
      cartItemElement.innerHTML = `
                <div class="cart-product">
                    <div class="cart-product-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="cart-product-info">
                        <h3>${product.title}</h3>
                        <div class="product-category">${product.category}</div>
                    </div>
                </div>
                <div class="cart-price">$${product.price.toFixed(2)}</div>
                <div class="cart-quantity">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                </div>
                <div class="cart-subtotal">$${subtotal}</div>
                <div class="cart-remove">
                    <button class="remove-btn" data-id="${product.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `

      cartItemsContainer.appendChild(cartItemElement)
    })

    // Add event listeners to quantity buttons and remove buttons
    addCartEventListeners()
  }

  // Add event listeners to cart elements
  function addCartEventListeners() {
    // Quantity minus buttons
    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        updateCartItemQuantity(productId, "decrease")
      })
    })

    // Quantity plus buttons
    document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        updateCartItemQuantity(productId, "increase")
      })
    })

    // Quantity input fields
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        const newQuantity = Number.parseInt(this.value)
        if (newQuantity > 0) {
          updateCartItemQuantity(productId, "set", newQuantity)
        } else {
          this.value = 1
          updateCartItemQuantity(productId, "set", 1)
        }
      })
    })

    // Remove buttons
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        removeCartItem(productId)
      })
    })

    // Update cart button
    const updateCartBtn = document.querySelector(".update-cart")
    if (updateCartBtn) {
      updateCartBtn.addEventListener("click", () => {
        // In a real app, this would send the updated cart to the server
        alert("Cart updated successfully!")
      })
    }
  }

  // Update cart item quantity
  function updateCartItemQuantity(productId, action, value = null) {
    const cartItem = cart.find((item) => item.id === productId)
    if (!cartItem) return

    switch (action) {
      case "increase":
        cartItem.quantity += 1
        break
      case "decrease":
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1
        }
        break
      case "set":
        cartItem.quantity = value
        break
    }

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update UI
    initCart()
  }

  // Remove item from cart
  function removeCartItem(productId) {
    cart = cart.filter((item) => item.id !== productId)

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update UI
    initCart()
  }

  // Calculate and update cart summary
  function updateCartSummary() {
    if (!cartSubtotal || !cartShipping || !cartTotal) return

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)

    // Calculate shipping (free for orders over $50)
    const shipping = subtotal > 50 ? 0 : 5.99

    // Calculate discount (example: 10% off for orders over $100)
    const discount = subtotal > 100 ? subtotal * 0.1 : 0

    // Calculate total
    const total = subtotal + shipping - discount

    // Update UI
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
    cartShipping.textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`

    if (discount > 0) {
      cartDiscount.textContent = `-$${discount.toFixed(2)}`
      discountRow.style.display = "flex"
    } else {
      discountRow.style.display = "none"
    }

    cartTotal.textContent = `$${total.toFixed(2)}`
  }

  // Initialize the cart page
  initCart()
})

