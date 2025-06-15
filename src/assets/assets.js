export const allProducts = [
  {
    "id": 1,
    "name": "Steller Men Clothes",
    "description": "Premium quality men's wear, perfect for all occasions. Comfortable, stylish, and made from the finest materials",
    "price": "25000.00",
    "stock": 5,
    "category": {
      "id": 1,
      "name": "Men",
      "description": ""
    },
    "image": "http://127.0.0.1:8000/media/product_images/IMG_20210317_090510_109.jpg",
    "created_at": "2025-06-14T19:44:34.724854Z"
  },
  {
    "id": 2,
    "name": "Crop Top Female",
    "description": "Elegant and fashionable women's clothing designed for comfort and style. Perfect for any event.",
    "price": "10000.00",
    "stock": 5,
    "category": {
      "id": 2,
      "name": "Women",
      "description": ""
    },
    "image": "http://127.0.0.1:8000/media/product_images/Gemini_Generated_Image_pzpdhcpzpdhcpzpd.png",
    "created_at": "2025-06-14T19:45:47.745482Z"
  },
  {
    "id": 3,
    "name": "Portable Shoe",
    "description": "Durable and stylish shoes for every occasion. Experience comfort and elegance in every step.",
    "price": "15000.00",
    "stock": 5,
    "category": {
      "id": 3,
      "name": "Shoes",
      "description": ""
    },
    "image": "http://127.0.0.1:8000/media/product_images/Gemini_Generated_Image_2o30x02o30x02o30.png",
    "created_at": "2025-06-14T19:48:29.440293Z"
  }
];

export const userDetails = {
    id: 1,
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St, City, Country",
    email: "john.doe@example.com",
    phone: "+1234567890",
    password: "securepassword123",
};

export const orders = [
  {
    id: 1,
    userId: 1,
    date: "2024-06-01",
    status: "Delivered",
    total: 25000,
    items: 3,
    itemsDetails: [
      { productId: 1, name: "Steller Men Clothes", quantity: 2 },
      { productId: 2, name: "Steller Women Clothes", quantity: 1 },
    ],
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    userId: 1,
    date: "2024-05-15",
    status: "Processing",
    total: 12000,
    items: 1,
    itemsDetails: [
        { productId: 3, name: "Steller Kids Clothes", quantity: 1 }
    ],
    address: "123 Main St, City, Country",
  },
];

export const transactions = [
  {
    id: 1,
    userId: 1,
    date: "2024-06-01",
    amount: 25000,
    type: "Debit",
    status: "Success",
    reason: "Order Payment",
  },
  {
    id: 2,
    userId: 1,
    date: "2024-05-15",
    amount: 12000,
    type: "Debit",
    status: "Success",
    reason: "Order Payment",
  },
];