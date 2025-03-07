document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")

  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Quick view modal
  const quickViewBtns = document.querySelectorAll(".quick-view")
  const quickViewModal = document.getElementById("quickViewModal")
  const modalClose = document.querySelector(".modal-close")

  // Sample product data
  const products = [
    {
      id: 1,
      title: "Batman: The Dark Knight Returns",
      price: 19.99,
      oldPrice: 24.99,
      image: "../img/products/batman.jpg",
      rating: 4.5,
      reviews: 24,
      category: "Comics",
      publisher: "DC Comics",
      description:
        "This masterpiece of comics storytelling returns to the dark days of Gotham City in which Batman returns to battle a world that has forgotten him.",
      stock: "In Stock",
    },
    {
      id: 2,
      title: "Spider-Man: Miles Morales Vol. 1",
      price: 17.99,
      oldPrice: null,
      image: "../img/products/spiderman.jpg",
      rating: 5,
      reviews: 42,
      category: "Comics",
      publisher: "Marvel",
      description:
        "Miles Morales takes up the mantle of Spider-Man as a teen in New York City. Follow his adventures as he balances school life and superhero responsibilities.",
      stock: "In Stock",
    },
    {
      id: 3,
      title: "Wonder Woman: Year One",
      price: 16.99,
      oldPrice: 19.99,
      image: "../img/products/wonderwoman.jpg",
      rating: 4,
      reviews: 18,
      category: "Comics",
      publisher: "DC Comics",
      description:
        "The origin story of Wonder Woman, Princess Diana of Themyscira, as she discovers the world of man and becomes one of Earth's greatest heroes.",
      stock: "In Stock",
    },
    {
      id: 4,
      title: "X-Men: Dark Phoenix Saga",
      price: 14.99,
      oldPrice: 22.99,
      image: "../img/products/xmen.jpg",
      rating: 4.5,
      reviews: 31,
      category: "Comics",
      publisher: "Marvel",
      description:
        "The classic X-Men storyline that sees Jean Grey transform into the all-powerful Phoenix, threatening the entire universe.",
      stock: "In Stock",
    },
    {
      id: 5,
      title: "Iron Man: Extremis",
      price: 18.99,
      oldPrice: null,
      image: "../img/products/ironman.jpg",
      rating: 4,
      reviews: 12,
      category: "Comics",
      publisher: "Marvel",
      description:
        "When a terrorist attack puts Tony Stark on the brink of death, he must use his technology to save himself and stop a plot that threatens the world.",
      stock: "In Stock",
    },
    {
      id: 6,
      title: "Watchmen: Deluxe Edition",
      price: 29.99,
      oldPrice: 34.99,
      image: "../img/products/watchmen.jpg",
      rating: 5,
      reviews: 47,
      category: "Graphic Novels",
      publisher: "DC Comics",
      description:
        "The groundbreaking graphic novel that forever changed the superhero genre, now in a deluxe edition with additional content.",
      stock: "In Stock",
    },
  ]

  if (quickViewBtns.length > 0 && quickViewModal) {
    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
        const productId = Number.parseInt(this.getAttribute("data-id"))
        const product = products.find((p) => p.id === productId)

        if (product) {
          // Populate modal with product data
          document.getElementById("quickViewTitle").textContent = product.title
          document.getElementById("quickViewImage").src = product.image
          document.getElementById("quickViewPrice").textContent = `$${product.price}`

          const oldPriceElement = document.getElementById("quickViewOldPrice")
          if (product.oldPrice) {
            oldPriceElement.textContent = `$${product.oldPrice}`
            oldPriceElement.style.display = "inline"
          } else {
            oldPriceElement.style.display = "none"
          }

          document.getElementById("quickViewDescription").textContent = product.description
          document.getElementById("quickViewCategory").textContent = product.category
          document.getElementById("quickViewPublisher").textContent = product.publisher
          document.getElementById("quickViewStock").textContent = product.stock
          document.getElementById("quickViewRating").textContent = `(${product.reviews})`

          // Set data attributes for add to cart and wishlist buttons
          document.getElementById("quickViewAddToCart").setAttribute("data-id", product.id)
          document.getElementById("quickViewAddToWishlist").setAttribute("data-id", product.id)

          // Show modal
          quickViewModal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      })
    })

    // Close modal
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        quickViewModal.classList.remove("active")
        document.body.style.overflow = ""
      })

      // Close modal when clicking outside
      quickViewModal.addEventListener("click", (e) => {
        if (e.target === quickViewModal) {
          quickViewModal.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    }
  }

  // Quantity selector in quick view
  const quantityMinusBtn = document.querySelector(".quantity-btn.minus")
  const quantityPlusBtn = document.querySelector(".quantity-btn.plus")
  const quantityInput = document.querySelector(".quantity-input")

  if (quantityMinusBtn && quantityPlusBtn && quantityInput) {
    quantityMinusBtn.addEventListener("click", () => {
      const value = Number.parseInt(quantityInput.value)
      if (value > 1) {
        quantityInput.value = value - 1
      }
    })

    quantityPlusBtn.addEventListener("click", () => {
      const value = Number.parseInt(quantityInput.value)
      quantityInput.value = value + 1
    })
  }

  // Add to cart functionality
  const addToCartBtns = document.querySelectorAll(".add-to-cart")
  const cartCount = document.querySelector(".cart-count")
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (addToCartBtns.length > 0) {
    // Update cart count display
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
    }

    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
        const productId = Number.parseInt(this.getAttribute("data-id"))
        const product = products.find((p) => p.id === productId)

        if (product) {
          // Check if product is already in cart
          const existingItem = cart.find((item) => item.id === productId)

          if (existingItem) {
            existingItem.quantity += 1
          } else {
            cart.push({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }

          // Save cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart))

          // Update cart count
          if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
          }

          // Show success message
          alert(`${product.title} has been added to your cart!`)
        }
      })
    })
  }

  // Add to wishlist functionality
  const addToWishlistBtns = document.querySelectorAll(".add-to-wishlist")
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

  if (addToWishlistBtns.length > 0) {
    addToWishlistBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
        const productId = Number.parseInt(this.getAttribute("data-id"))
        const product = products.find((p) => p.id === productId)

        if (product) {
          // Check if product is already in wishlist
          const existingItem = wishlist.find((item) => item.id === productId)

          if (!existingItem) {
            wishlist.push({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            })

            // Save wishlist to localStorage
            localStorage.setItem("wishlist", JSON.stringify(wishlist))

            // Show success message
            alert(`${product.title} has been added to your wishlist!`)
          } else {
            alert("This product is already in your wishlist!")
          }
        }
      })
    })
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      // Here you would typically send this to your backend
      // For now, just show a success message
      alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`)
      this.reset()
    })
  }
})

