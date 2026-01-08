// Checkbox selection handling
const selectAllCheckbox = document.querySelector(
  'thead input[type="checkbox"]'
);
const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
const bulkActions = document.getElementById("bulkActions");

function updateBulkActions() {
  const selectedCount = Array.from(rowCheckboxes).filter(
    (cb) => cb.checked
  ).length;
  if (selectedCount > 0) {
    bulkActions.classList.remove("hidden");
    bulkActions.querySelector("span").textContent = `${selectedCount} order${
      selectedCount > 1 ? "s" : ""
    } selected`;
  } else {
    bulkActions.classList.add("hidden");
  }
}

selectAllCheckbox?.addEventListener("change", function () {
  rowCheckboxes.forEach((cb) => (cb.checked = this.checked));
  updateBulkActions();
});

rowCheckboxes.forEach((cb) => {
  cb.addEventListener("change", function () {
    updateBulkActions();

    // Update select all checkbox state
    const allChecked = Array.from(rowCheckboxes).every((cb) => cb.checked);
    const someChecked = Array.from(rowCheckboxes).some((cb) => cb.checked);

    if (selectAllCheckbox) {
      selectAllCheckbox.checked = allChecked;
      selectAllCheckbox.indeterminate = someChecked && !allChecked;
    }
  });
});

// Close bulk actions
document
  .querySelector("#bulkActions button:last-child")
  ?.addEventListener("click", function () {
    rowCheckboxes.forEach((cb) => (cb.checked = false));
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
    bulkActions.classList.add("hidden");
  });
