let itemCounter = 0;
const itemsTableBody = document.getElementById("itemsTableBody");
const noItemsRow = document.getElementById("noItemsRow");
const addItemModal = document.getElementById("addItemModal");
const addItemBtn = document.getElementById("addItemBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelAddItemBtn = document.getElementById("cancelAddItem");
const addItemForm = document.getElementById("addItemForm");

// Modal functionality
addItemBtn.addEventListener("click", () => {
  addItemModal.classList.remove("hidden");
  document.getElementById("productName").focus();
});

closeModalBtn.addEventListener("click", hideModal);
cancelAddItemBtn.addEventListener("click", hideModal);

function hideModal() {
  addItemModal.classList.add("hidden");
  addItemForm.reset();
}

// Add item functionality
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const quantity = parseInt(document.getElementById("productQuantity").value);
  const price = parseFloat(document.getElementById("productPrice").value);
  const total = quantity * price;

  itemCounter++;

  // Remove no items row if it exists
  if (noItemsRow) {
    noItemsRow.remove();
  }

  // Create new row
  const row = document.createElement("tr");
  row.className = "hover:bg-gray-50";
  row.innerHTML = `
        <td class="px-4 py-4">
            <div class="font-medium text-gray-900">${name}</div>
        </td>
        <td class="px-4 py-4">
            <div class="text-gray-600 text-sm">${
              description || "No description"
            }</div>
        </td>
        <td class="px-4 py-4 text-center">
            <input type="number" value="${quantity}" min="1" 
                   class="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm quantity-input"
                   onchange="updateRowTotal(this)">
        </td>
        <td class="px-4 py-4 text-right">
            <span class="unit-price">$${price.toFixed(2)}</span>
        </td>
        <td class="px-4 py-4 text-right font-medium">
            <span class="row-total">$${total.toFixed(2)}</span>
        </td>
        <td class="px-4 py-4 text-center">
            <button type="button" onclick="removeItem(this)" 
                    class="text-red-600 hover:text-red-800 p-2">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

  itemsTableBody.appendChild(row);
  calculateTotal();
  hideModal();
});

// Update row total when quantity changes
function updateRowTotal(quantityInput) {
  const row = quantityInput.closest("tr");
  const quantity = parseInt(quantityInput.value);
  const priceText = row.querySelector(".unit-price").textContent;
  const price = parseFloat(priceText.replace("$", ""));
  const total = quantity * price;

  row.querySelector(".row-total").textContent = `$${total.toFixed(2)}`;
  calculateTotal();
}

// Remove item
function removeItem(button) {
  const row = button.closest("tr");
  row.remove();

  // Show no items row if table is empty
  if (itemsTableBody.children.length === 0) {
    itemsTableBody.innerHTML = `
            <tr id="noItemsRow">
                <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                    <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-3"></i>
                    <p>No items added yet. Click "Add Item" to get started.</p>
                </td>
            </tr>
        `;
  }

  calculateTotal();
}

// Calculate totals
function calculateTotal() {
  const rows = itemsTableBody.querySelectorAll("tr:not(#noItemsRow)");
  let subtotal = 0;

  rows.forEach((row) => {
    const totalText = row.querySelector(".row-total")?.textContent;
    if (totalText) {
      subtotal += parseFloat(totalText.replace("$", ""));
    }
  });

  const taxRate = 0.085; // 8.5%
  const tax = subtotal * taxRate;
  const shipping = parseFloat(document.getElementById("shipping").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const grandTotal = subtotal + tax + shipping - discount;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("grandTotal").textContent = `$${grandTotal.toFixed(
    2
  )}`;
  document.getElementById("totalAmountHidden").value = grandTotal.toFixed(2);
}

// Close modal on outside click
addItemModal.addEventListener("click", (e) => {
  if (e.target === addItemModal) {
    hideModal();
  }
});

// Initialize
calculateTotal();

// Product and Customer Search Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchProductBtn = document.getElementById("searchProductBtn");
  const productSearchModal = document.getElementById("productSearchModal");
  const closeProductSearchBtn = document.getElementById(
    "closeProductSearchBtn"
  );
  const cancelProductSearch = document.getElementById("cancelProductSearch");
  const productSearchInput = document.getElementById("productSearchInput");
  const productsTableBody = document.getElementById("productsTableBody");
  const productRows = document.querySelectorAll(".product-row");

  // Customer Search Modal Elements
  const searchCustomerBtn = document.getElementById("searchCustomerBtn");
  const customerSearchModal = document.getElementById("customerSearchModal");
  const closeCustomerSearchBtn = document.getElementById(
    "closeCustomerSearchBtn"
  );
  const cancelCustomerSearch = document.getElementById("cancelCustomerSearch");
  const customerSearchInput = document.getElementById("customerSearchInput");
  const customersTableBody = document.getElementById("customersTableBody");
  const customerRows = document.querySelectorAll(".customer-row");

  // Open product search modal
  searchProductBtn.addEventListener("click", function () {
    productSearchModal.classList.remove("hidden");
    productSearchInput.focus();
  });

  // Open customer search modal
  searchCustomerBtn.addEventListener("click", function () {
    customerSearchModal.classList.remove("hidden");
    customerSearchInput.focus();
  });

  // Close product search modal
  function closeProductSearchModal() {
    productSearchModal.classList.add("hidden");
    productSearchInput.value = "";
    showAllProducts();
  }

  // Close customer search modal
  function closeCustomerSearchModal() {
    customerSearchModal.classList.add("hidden");
    customerSearchInput.value = "";
    showAllCustomers();
  }

  closeProductSearchBtn.addEventListener("click", closeProductSearchModal);
  cancelProductSearch.addEventListener("click", closeProductSearchModal);

  closeCustomerSearchBtn.addEventListener("click", closeCustomerSearchModal);
  cancelCustomerSearch.addEventListener("click", closeCustomerSearchModal);

  // Close modals when clicking outside
  productSearchModal.addEventListener("click", function (e) {
    if (e.target === productSearchModal) {
      closeProductSearchModal();
    }
  });

  customerSearchModal.addEventListener("click", function (e) {
    if (e.target === customerSearchModal) {
      closeCustomerSearchModal();
    }
  });

  // Product search functionality
  productSearchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    productRows.forEach((row) => {
      const productName = row.getAttribute("data-product-name").toLowerCase();
      const productSku = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const productCategory = row
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();

      if (
        productName.includes(searchTerm) ||
        productSku.includes(searchTerm) ||
        productCategory.includes(searchTerm)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // Customer search functionality
  customerSearchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    customerRows.forEach((row) => {
      const customerName = row.getAttribute("data-customer-name").toLowerCase();
      const customerEmail = row
        .getAttribute("data-customer-email")
        .toLowerCase();
      const customerPhone = row
        .getAttribute("data-customer-phone")
        .toLowerCase();
      const customerCompany = row
        .getAttribute("data-customer-company")
        .toLowerCase();

      if (
        customerName.includes(searchTerm) ||
        customerEmail.includes(searchTerm) ||
        customerPhone.includes(searchTerm) ||
        customerCompany.includes(searchTerm)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  function showAllProducts() {
    productRows.forEach((row) => {
      row.style.display = "";
    });
  }

  function showAllCustomers() {
    customerRows.forEach((row) => {
      row.style.display = "";
    });
  }

  // Select product functionality
  document.querySelectorAll(".select-product-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest(".product-row");
      const productId = row.getAttribute("data-product-id");
      const productName = row.getAttribute("data-product-name");
      const productPrice = row.getAttribute("data-product-price");
      const productDescription = row.getAttribute("data-product-description");

      // Fill the form fields
      document.getElementById("productName").value = productName;
      document.getElementById("productDescription").value = productDescription;
      document.getElementById("productPrice").value = productPrice;
      document.getElementById("selectedProductId").value = productId;
      document.getElementById("selectedProductPrice").value = productPrice;

      // Close the search modal
      closeProductSearchModal();

      // Show success message
      const productNameField = document.getElementById("productName");
      productNameField.classList.add("border-green-300", "bg-green-50");
      setTimeout(() => {
        productNameField.classList.remove("border-green-300", "bg-green-50");
      }, 2000);
    });
  });

  // Select customer functionality
  document.querySelectorAll(".select-customer-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest(".customer-row");
      const customerId = row.getAttribute("data-customer-id");
      const customerName = row.getAttribute("data-customer-name");
      const customerEmail = row.getAttribute("data-customer-email");
      const customerPhone = row.getAttribute("data-customer-phone");
      const customerCompany = row.getAttribute("data-customer-company");

      // Fill the customer form fields
      document.getElementById("SalesOrder_CustomerName").value = customerName;
      document.getElementById("selectedCustomerId").value = customerId;

      // Auto-populate the other customer fields if they exist
      const emailField = document.getElementById("customerEmail");
      const phoneField = document.getElementById("customerPhone");
      const companyField = document.getElementById("customerCompany");

      if (emailField) emailField.value = customerEmail;
      if (phoneField) phoneField.value = customerPhone;
      if (companyField) companyField.value = customerCompany;

      // Close the search modal
      closeCustomerSearchModal();

      // Show success message
      const customerNameField = document.getElementById(
        "SalesOrder_CustomerName"
      );
      customerNameField.classList.add("border-green-300", "bg-green-50");
      setTimeout(() => {
        customerNameField.classList.remove("border-green-300", "bg-green-50");
        customerNameField.classList.add("bg-gray-50"); // Return to readonly styling
      }, 2000);
    });
  });
});
