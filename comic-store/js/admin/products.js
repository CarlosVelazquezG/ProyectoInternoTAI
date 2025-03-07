document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const addProductBtn = document.getElementById("addProductBtn")
  const productModal = document.getElementById("productModal")
  const closeProductModal = document.getElementById("closeProductModal")
  const cancelProductForm = document.getElementById("cancelProductForm")
  const productForm = document.getElementById("productForm")
  const productModalTitle = document.getElementById("productModalTitle")
  const submitProductForm = document.getElementById("submitProductForm")

  // Add event listeners
  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      openProductModal()
    })
  }

  if (closeProductModal) {
    closeProductModal.addEventListener("click", () => {
      closeModal()
    })
  }

  if (cancelProductForm) {
    cancelProductForm.addEventListener("click", () => {
      closeModal()
    })
  }

  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleProductFormSubmit()
    })
  }

  // Add event listeners to view, edit, and delete buttons
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.getAttribute("title").toLowerCase()
      const row = this.closest("tr")
      const productName = row.querySelector("td:nth-child(2)").textContent

      switch (action) {
        case "view":
          viewProduct(productName)
          break
        case "edit":
          editProduct(productName)
          break
        case "delete":
          deleteProduct(productName)
          break
      }
    })
  })

  // Open product modal for adding a new product
  function openProductModal(product = null) {
    if (productModal) {
      const isEditMode = !!product

      // Set modal title and submit button text
      if (productModalTitle) {
        productModalTitle.textContent = isEditMode ? "Edit Product" : "Add New Product"
      }

      if (submitProductForm) {
        submitProductForm.textContent = isEditMode ? "Update Product" : "Add Product"
      }

      // Fill form with product data if editing
      if (isEditMode) {
        document.getElementById("productId").value = product.id || ""
        document.getElementById("productName").value = product.name || ""
        document.getElementById("productCategory").value = product.category || ""
        document.getElementById("productPublisher").value = product.publisher || ""
        document.getElementById("productPrice").value = product.price || ""
        document.getElementById("productStock").value = product.stock || ""
        document.getElementById("productDescription").value = product.description || ""
        document.getElementById("productFeatured").checked = product.featured || false
        document.getElementById("productNewArrival").checked = product.newArrival || false
      } else {
        // Reset form for new product
        productForm.reset()
        document.getElementById("productId").value = ""
      }

      // Show modal
      productModal.classList.add("active")
    }
  }

  // Close product modal
  function closeModal() {
    if (productModal) {
      productModal.classList.remove("active")
    }
  }

  // Handle product form submission
  function handleProductFormSubmit() {
    const productId = document.getElementById("productId").value
    const isEditMode = !!productId

    // Get form data
    const formData = {
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      publisher: document.getElementById("productPublisher").value,
      price: document.getElementById("productPrice").value,
      stock: document.getElementById("productStock").value,
      description: document.getElementById("productDescription").value,
      featured: document.getElementById("productFeatured").checked,
      newArrival: document.getElementById("productNewArrival").checked,
    }

    // In a real app, this would send data to the server
    // For now, just show a success message and close the modal

    if (isEditMode) {
      window.showToast("Success", `Product "${formData.name}" has been updated.`, "success")
    } else {
      window.showToast("Success", `Product "${formData.name}" has been added.`, "success")
    }

    closeModal()

    // In a real app, you would refresh the product list here
  }

  // View product details
  function viewProduct(productName) {
    window.showToast("Info", `Viewing product: ${productName}`, "info")
    // In a real app, this would open a detailed view of the product
  }

  // Edit product
  function editProduct(productName) {
    // In a real app, this would fetch the product data from the server
    // For now, we'll use dummy data
    const product = {
      id: "1",
      name: productName,
      category: "Comics",
      publisher: "DC Comics",
      price: "19.99",
      stock: "50",
      description: "This is a sample product description.",
      featured: true,
      newArrival: false,
    }

    openProductModal(product)
  }

  // Delete product
  function deleteProduct(productName) {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      window.showToast("Success", `Product "${productName}" has been deleted.`, "success")
      // In a real app, this would send a delete request to the server
      // and remove the product from the list
    }
  }
})

