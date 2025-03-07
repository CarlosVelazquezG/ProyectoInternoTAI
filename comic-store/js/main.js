// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Tabs functionality
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and content
      document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
      });
      
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      const tabContent = document.getElementById(`tab-${tabId}`);
      if (tabContent) {
        tabContent.classList.add('active');
      }
    });
  });
  
  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.closest('.dropdown');
      dropdown.classList.toggle('active');
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
  
  // Toast notification system
  window.showToast = function(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-header">
        <strong>${title}</strong>
        <button class="close-button">×</button>
      </div>
      <div class="toast-body">${message}</div>
    `;
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
    
    // Close button functionality
    toast.querySelector('.close-button').addEventListener('click', function() {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        toast.remove();
      }, 300);
    });
  };
  
  // Add toast styles if not already in the document
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .toast {
        background-color: var(--card);
        border-radius: var(--radius);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 300px;
        overflow: hidden;
        transition: all 0.3s;
      }
      
      .toast-info {
        border-left: 4px solid #3b82f6;
      }
      
      .toast-success {
        border-left: 4px solid #10b981;
      }
      
      .toast-warning {
        border-left: 4px solid #f59e0b;
      }
      
      .toast-error {
        border-left: 4px solid #ef4444;
      }
      
      .toast-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border);
      }
      
      .toast-body {
        padding: 0.75rem 1rem;
      }
      
      .toast-hiding {
        opacity: 0;
        transform: translateX(100%);
      }
    `;
    document.head.appendChild(style);
  }
});

// Format date helper function
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

