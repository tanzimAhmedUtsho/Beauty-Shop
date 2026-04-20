/* BeautySource - Core Logic
   Updated: 2026
*/

const products = [
  {
    id: 1,
    name: "The Body Shop Tea Tree Face Wash",
    price: 950,
    oldPrice: 1100,
    discount: "15%",
    img: "image/The Body Shop Tea Tree Face Wash.jpg",
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    price: 1450,
    oldPrice: 1600,
    discount: "10%",
    img: "image/Neutrogena Hydro Boost Water Gel.jpg",
  },
  {
    id: 3,
    name: "CeraVe Foaming Facial Cleanser",
    price: 1800,
    oldPrice: 2000,
    discount: "10%",
    img: "image/CeraVe Foaming Facial Cleanser.jpg",
  },
  {
    id: 4,
    name: "L'Oreal Paris Revitalift Serum",
    price: 1250,
    oldPrice: 1550,
    discount: "20%",
    img: "image/L'Oreal Paris Revitalift Serum.jpg",
  },
  {
    id: 5,
    name: "Cetaphil Gentle Skin Cleanser",
    price: 850,
    oldPrice: 1000,
    discount: "15%",
    img: "image/Cetaphil Gentle Skin Cleanser.jpg",
  },
  {
    id: 6,
    name: "Ordinary Niacinamide 10%",
    price: 1100,
    oldPrice: 1350,
    discount: "18%",
    img: "image/Ordinary.webp",
  },
  {
    id: 7,
    name: "COSRX Snail Mucin Essence",
    price: 1950,
    oldPrice: 2200,
    discount: "11%",
    img: "image/COSRX Snail Mucin Essence.jpg",
  },
  {
    id: 8,
    name: "Innisfree Green Tea Seed Serum",
    price: 2100,
    oldPrice: 2600,
    discount: "20%",
    img: "image/Innisfree Green Tea Seed Serum.jpg",
  },
  {
    id: 9,
    name: "Laneige Lip Sleeping Mask",
    price: 1650,
    oldPrice: 1850,
    discount: "10%",
    img: "image/Laneige Lip Sleeping Mask.jpg",
  },
  {
    id: 10,
    name: "Bio-Oil Skincare Oil",
    price: 750,
    oldPrice: 950,
    discount: "21%",
    img: "image/Bio-Oil Skincare Oil.jpg",
  },
  {
    id: 11,
    name: "Aveeno Daily Moisturizing Lotion",
    price: 1350,
    oldPrice: 1600,
    discount: "15%",
    img: "image/Aveeno Daily Moisturizing Lotion.webp",
  },
  {
    id: 12,
    name: "Kiehl's Ultra Facial Cream",
    price: 3500,
    oldPrice: 4200,
    discount: "16%",
    img: "image/Kiehl's Ultra Facial Cream.jpg",
  },
];

let cart = [];
let wishlist = [];

function renderProducts(data) {
  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  if (data.length === 0) {
    productGrid.innerHTML =
      "<p class='empty-msg' style='grid-column: 1 / -1;'>দুঃখিত, এই নামে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>";
    return;
  }

  data.forEach((product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <button class="wish-card-btn ${isWishlisted ? "active" : ""}" onclick="toggleWishlist(${product.id}, this)">
        <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
      </button>
      <div class="discount-badge">-${product.discount}</div>
      <div class="product-img-wrapper">
        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=Beauty+Source'">
      </div>
      <h3>${product.name}</h3>
      <div class="price-container">
        <span class="old-price">৳ ${product.oldPrice}</span>
        <span class="price">৳ ${product.price}</span>
      </div>
      <button class="add-to-cart" onclick="addToBag(${product.id}, this)">
        <i class="fa-solid fa-bag-shopping"></i> Add to Bag
      </button>
    `;
    productGrid.appendChild(card);
  });
}

window.togglePanel = function (panelId) {
  const panel = document.getElementById(panelId);
  const overlay = document.getElementById("overlay");
  if (!panel || !overlay) return;

  const isOpening = !panel.classList.contains("active");
  closeAllPanels();

  if (isOpening) {
    panel.classList.add("active");
    overlay.classList.add("active");
  }
};

window.closeAllPanels = function () {
  document
    .querySelectorAll(".side-panel")
    .forEach((panel) => panel.classList.remove("active"));

  const overlay = document.getElementById("overlay");
  if (overlay) overlay.classList.remove("active");
};

window.addToBag = function (id, btn) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  cart.push(product);
  updateUI();

  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
  btn.style.background = "var(--secondary)";
  btn.style.color = "white";

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = "";
    btn.style.color = "";
  }, 1000);
};

window.toggleWishlist = function (id, btn) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const index = wishlist.findIndex((item) => item.id === id);

  if (index === -1) {
    wishlist.push(product);
    if (btn) {
      btn.classList.add("active");
      btn.querySelector("i").className = "fa-solid fa-heart";
    }
  } else {
    wishlist.splice(index, 1);
    if (btn) {
      btn.classList.remove("active");
      btn.querySelector("i").className = "fa-regular fa-heart";
    }
  }

  updateUI();
};

function updateUI() {
  const cartBadge = document.getElementById("cartBadge");
  const wishlistBadge = document.getElementById("wishlistBadge");
  const priceSum = document.querySelector(".price-sum");
  const panelTotalAmount = document.getElementById("panelTotalAmount");
  const cartFooter = document.getElementById("cartFooter");

  if (cartBadge) cartBadge.innerText = cart.length;
  if (wishlistBadge) wishlistBadge.innerText = wishlist.length;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (priceSum) priceSum.innerText = `৳${total}`;
  if (panelTotalAmount) panelTotalAmount.innerText = `৳${total}`;

  renderPanelItems("cartContent", cart, true);
  renderPanelItems("wishlistContent", wishlist, false);

  if (cartFooter) {
    cartFooter.style.display = cart.length > 0 ? "block" : "none";
  }
}

function renderPanelItems(containerId, items, isCart) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p class="empty-msg">${
      isCart ? "আপনার ব্যাগে এখনো কোনো পণ্য নেই।" : "আপনার উইশলিস্টে এখনো কোনো পণ্য নেই।"
    }</p>`;
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <div class="item-row">
          <img src="${item.img}" alt="${item.name}">
          <div class="item-info">
            <h4>${item.name}</h4>
            <b>৳${item.price}</b>
          </div>
          <i class="fa-solid fa-trash-can remove-item" onclick="removeItem(${index}, ${isCart})"></i>
        </div>
      `,
    )
    .join("");
}

window.removeItem = function (index, isCart) {
  if (isCart) cart.splice(index, 1);
  else wishlist.splice(index, 1);

  updateUI();
  renderProducts(getFilteredProducts());
};

function getFilteredProducts() {
  const searchInput = document.getElementById("productSearch");
  const sortSelect = document.getElementById("sortPrice");

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const sortValue = sortSelect ? sortSelect.value : "default";

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm),
  );

  if (sortValue === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "highToLow") filtered.sort((a, b) => b.price - a.price);

  return filtered;
}

function handleFilterAndSort() {
  renderProducts(getFilteredProducts());
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("productSearch");
  const sortSelect = document.getElementById("sortPrice");

  if (searchInput) searchInput.addEventListener("input", handleFilterAndSort);
  if (sortSelect) sortSelect.addEventListener("change", handleFilterAndSort);

  renderProducts(products);
  updateUI();
});
