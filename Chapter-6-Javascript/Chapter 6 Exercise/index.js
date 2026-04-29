// Get button
const button = document.getElementById("calcBtn");

// Add click event
button.addEventListener("click", function () {

  // Get values
  let price = parseFloat(document.getElementById("price").value);
  let litres = parseFloat(document.getElementById("litres").value);

  // Fix if empty
  if (isNaN(price) || isNaN(litres)) {
    document.getElementById("result").textContent = "Please enter valid numbers!";
    return;
  }

  // Calculate
  let total = price * litres;

  // Show result
  document.getElementById("result").textContent =
    "Total: £" + total.toFixed(2);
});