// ১২টি প্রোডাক্টের বর্ধিত ডেটাবেস (ডিসকাউন্ট সহ)
const products = [
  {
    id: 1,
    name: "The Body Shop Tea Tree Face Wash",
    price: 950,
    oldPrice: 1100,
    discount: "15%",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300",
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    price: 1450,
    oldPrice: 1600,
    discount: "10%",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300",
  },
  {
    id: 3,
    name: "CeraVe Foaming Facial Cleanser",
    price: 1800,
    oldPrice: 2000,
    discount: "10%",
    img: "https://images.unsplash.com/photo-1601049676093-d45e2283f49d?w=300",
  },
  {
    id: 4,
    name: "L'Oreal Paris Revitalift Serum",
    price: 1250,
    oldPrice: 1550,
    discount: "20%",
    img: "https://images.unsplash.com/photo-1617897903246-719242758050?w=300",
  },
  {
    id: 5,
    name: "Cetaphil Gentle Skin Cleanser",
    price: 850,
    oldPrice: 1000,
    discount: "15%",
    img: "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?w=300",
  },
  {
    id: 6,
    name: "Ordinary Niacinamide 10%",
    price: 1100,
    oldPrice: 1350,
    discount: "18%",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300",
  },
  {
    id: 7,
    name: "COSRX Snail Mucin Essence",
    price: 1950,
    oldPrice: 2200,
    discount: "11%",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300",
  },
  {
    id: 8,
    name: "Innisfree Green Tea Seed Serum",
    price: 2100,
    oldPrice: 2600,
    discount: "20%",
    img: "https://images.unsplash.com/photo-1590156221122-c748e78f2a7a?w=300",
  },
  {
    id: 9,
    name: "Laneige Lip Sleeping Mask",
    price: 1650,
    oldPrice: 1850,
    discount: "10%",
    img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300",
  },
  {
    id: 10,
    name: "Bio-Oil Skincare Oil",
    price: 750,
    oldPrice: 950,
    discount: "21%",
    img: "https://images.unsplash.com/photo-1608248543719-270f9076d296?w=300",
  },
  {
    id: 11,
    name: "Aveeno Daily Moisturizing Lotion",
    price: 1350,
    oldPrice: 1600,
    discount: "15%",
    img: "https://images.unsplash.com/photo-1556228852-6d35a585d566?w=300",
  },
  {
    id: 12,
    name: "Kiehl's Ultra Facial Cream",
    price: 3500,
    oldPrice: 4200,
    discount: "16%",
    img: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=300",
  },
];

const productGrid = document.getElementById("productGrid");
const cartBadge = document.getElementById("cartBadge");
let cartCount = 0;

// প্রোডাক্ট রেন্ডার করার ফাংশন
function renderProducts(data) {
  productGrid.innerHTML = "";
  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // ডিসকাউন্ট ব্যাজ থাকলে তা দেখানো হবে
    const discountTag = product.discount
      ? `<div class="discount-badge">-${product.discount}</div>`
      : "";

    card.innerHTML = `
            ${discountTag}
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price-container">
                <span class="old-price">৳ ${product.oldPrice}</span>
                <span class="price">৳ ${product.price}</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Bag</button>
        `;
    productGrid.appendChild(card);
  });
}

// কার্ট আপডেট (Bag update)
window.addToCart = function (id) {
  cartCount++;
  cartBadge.innerText = cartCount;

  // কার্ট ব্যাজ এনিমেশন
  cartBadge.style.transition = "0.2s";
  cartBadge.style.transform = "scale(1.5)";
  setTimeout(() => (cartBadge.style.transform = "scale(1)"), 200);

  // কনসোলে চেক করার জন্য
  console.log(`Product ID: ${id} যোগ করা হয়েছে। মোট আইটেম: ${cartCount}`);
};

// লাইভ সার্চ ফাংশনালিটি
const searchInput = document.getElementById("productSearch");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm),
    );
    renderProducts(filtered);
  });
}

// সাইট লোড হওয়ার সময় সব প্রোডাক্ট দেখানো
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});
