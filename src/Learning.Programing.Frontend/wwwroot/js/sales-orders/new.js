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
