document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.querySelector(".sidebar")
  const mainContent = document.querySelector(".main-content")

  if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
      mainContent.classList.toggle("expanded")
    })
  }

  // Dropdown toggle
  const userDropdownToggle = document.querySelector(".user-dropdown-toggle")
  const userDropdownMenu = document.querySelector(".dropdown-menu")

  if (userDropdownToggle && userDropdownMenu) {
    userDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      userDropdownMenu.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      if (userDropdownMenu.classList.contains("show")) {
        userDropdownMenu.classList.remove("show")
      }
    })
  }

  // Toast notification system
  window.showToast = (title, message, type = "info") => {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector(".toast-container")
    if (!toastContainer) {
      toastContainer = document.createElement("div")
      toastContainer.className = "toast-container"
      document.body.appendChild(toastContainer)
    }

    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.innerHTML = `
            <div class="toast-header">
                <strong>${title}</strong>
                <button class="toast-close">&times;</button>
            </div>
            <div class="toast-body">${message}</div>
        `

    // Add toast to container
    toastContainer.appendChild(toast)

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.add("toast-hiding")
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 5000)

    // Close button functionality
    const closeBtn = toast.querySelector(".toast-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        toast.classList.add("toast-hiding")
        setTimeout(() => {
          toast.remove()
        }, 300)
      })
    }
  }

  // Add toast styles if not already in the document
  if (!document.querySelector("#toast-styles")) {
    const style = document.createElement("style")
    style.id = "toast-styles"
    style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toast {
                min-width: 300px;
                background-color: white;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .toast-info {
                border-left: 4px solid #2196f3;
            }
            
            .toast-success {
                border-left: 4px solid #4caf50;
            }
            
            .toast-warning {
                border-left: 4px solid #ff9800;
            }
            
            .toast-error {
                border-left: 4px solid #f44336;
            }
            
            .toast-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 15px;
                border-bottom: 1px solid #eee;
            }
            
            .toast-body {
                padding: 10px 15px;
            }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            }
            
            .toast-hiding {
                opacity: 0;
                transform: translateX(100%);
            }
        `
    document.head.appendChild(style)
  }
})

