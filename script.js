// ১২টি প্রোডাক্টের ডেটাবেস
const products = [
  {
    id: 1,
    name: "The Body Shop Tea Tree Face Wash",
    price: 950,
    oldPrice: 1100,
    discount: "15%",
    img: "",
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    price: 1450,
    oldPrice: 1600,
    discount: "10%",
    img: "",
  },
  {
    id: 3,
    name: "CeraVe Foaming Facial Cleanser",
    price: 1800,
    oldPrice: 2000,
    discount: "10%",
    img: "",
  },
  {
    id: 4,
    name: "L'Oreal Paris Revitalift Serum",
    price: 1250,
    oldPrice: 1550,
    discount: "20%",
    img: "",
  },
  {
    id: 5,
    name: "Cetaphil Gentle Skin Cleanser",
    price: 850,
    oldPrice: 1000,
    discount: "15%",
    img: "",
  },
  {
    id: 6,
    name: "Ordinary Niacinamide 10%",
    price: 1100,
    oldPrice: 1350,
    discount: "18%",
    img: "",
  },
  {
    id: 7,
    name: "COSRX Snail Mucin Essence",
    price: 1950,
    oldPrice: 2200,
    discount: "11%",
    img: "",
  },
  {
    id: 8,
    name: "Innisfree Green Tea Seed Serum",
    price: 2100,
    oldPrice: 2600,
    discount: "20%",
    img: "",
  },
  {
    id: 9,
    name: "Laneige Lip Sleeping Mask",
    price: 1650,
    oldPrice: 1850,
    discount: "10%",
    img: "",
  },
  {
    id: 10,
    name: "Bio-Oil Skincare Oil",
    price: 750,
    oldPrice: 950,
    discount: "21%",
    img: "",
  },
  {
    id: 11,
    name: "Aveeno Daily Moisturizing Lotion",
    price: 1350,
    oldPrice: 1600,
    discount: "15%",
    img: "",
  },
  {
    id: 12,
    name: "Kiehl's Ultra Facial Cream",
    price: 3500,
    oldPrice: 4200,
    discount: "16%",
    img: "",
  },
];

let cartCount = 0;

// প্রোডাক্ট রেন্ডার করার ফাংশন
function renderProducts(data) {
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("productSearch");

  if (!productGrid) return;
  productGrid.innerHTML = "";

  if (data.length === 0) {
    productGrid.innerHTML = `<p style='grid-column: 1/-1; text-align: center; padding: 50px; color: #888;'>দুঃখিত, "${searchInput.value}" নামে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>`;
    return;
  }

  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <div class="discount-badge">-${product.discount}</div>
            <div class="product-img-wrapper">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=Beauty+Source'">
            </div>
            <h3>${product.name}</h3>
            <div class="price-container">
                <span class="old-price">৳ ${product.oldPrice}</span>
                <span class="price">৳ ${product.price}</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id}, this)">
                <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
        `;
    productGrid.appendChild(card);
  });
}

// কার্ট ফাংশন (গ্লোবাল উইন্ডোতে রাখা হয়েছে যাতে HTML থেকে এক্সেস পায়)
window.addToCart = function (id, btnElement) {
  const cartBadge = document.getElementById("cartBadge");
  cartCount++;
  cartBadge.innerText = cartCount;

  // এনিমেশন ইফেক্ট
  cartBadge.style.transition = "transform 0.3s ease";
  cartBadge.style.transform = "scale(1.4) rotate(10deg)";

  const originalText = btnElement.innerHTML;
  btnElement.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
  btnElement.style.backgroundColor = "#4CAF50";
  btnElement.style.color = "white";

  setTimeout(() => {
    cartBadge.style.transform = "scale(1) rotate(0deg)";
    btnElement.innerHTML = originalText;
    btnElement.style.backgroundColor = "";
    btnElement.style.color = "";
  }, 1000);
};

// ফিল্টার এবং সর্ট ফাংশন
function handleFilterAndSort() {
  const searchInput = document.getElementById("productSearch");
  const sortSelect = document.getElementById("sortPrice");

  const searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm),
  );

  const sortValue = sortSelect.value;
  if (sortValue === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
}

// ইনিশিয়াল লোড এবং ইভেন্ট লিসেনার
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("productSearch");
  const sortSelect = document.getElementById("sortPrice");

  if (searchInput) searchInput.addEventListener("input", handleFilterAndSort);
  if (sortSelect) sortSelect.addEventListener("change", handleFilterAndSort);

  renderProducts(products);
});
