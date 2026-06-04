const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// ================= CORS =================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// ================= MENU DATA (NOW IN BACKEND) =================
const menuData = {
  boissons: [
    [
      {
        title: "Italiano",
        description: "description goes here",
        img: "italiano.jpg",
        type: "boissons",
        price: 10,
        id: 1,
      },
      {
        title: "Americano",
        description: "description goes here",
        img: "italiano.jpg",
        type: "boissons",
        price: 10,
        id: 2,
      },
    ],

    [
      {
        title: "Italiano",
        description: "description goes here",
        img: "italiano.jpg",
        type: "boissons",
        price: 10,
        id: 1,
      },
      {
        title: "Americano",
        description: "description goes here",
        img: "italiano.jpg",
        type: "boissons",
        price: 10,
        id: 2,
      },
    ],
    [
      {
        title: "mangoJuice",
        description: "description goes here",
        img: "mangoJuice.jpg",
        type: "boissons",
        price: 13,
        id: 3,
      },
      {
        title: "Kiwi Juice",
        img: "kiwiJuice.jpg",
        type: "boissons",
        description: "description goes here",
        price: 13,
        id: 4,
      },
    ],
    [
      {
        title: "Orange Juice",
        img: "OrangeJuice.jpg",
        description: "description goes here",
        type: "boissons",
        price: 22,
        id: 5,
      },
      {
        title: "Lemon Juice",
        description: "description goes here",
        img: "lemonJuice.jpg",
        type: "boissons",
        price: 24,
        id: 6,
      },
    ],
  ],

  boulangerie: [
    [
      {
        title: "Creme Amande mini",
        description: "description goes here",
        img: "cremeAmande.jpg",
        type: "boulangerie",
        price: 2.5,
        id: 7,
      },
      {
        title: "Pain suisse mini",
        description: "description goes here",
        img: "painSuisse.jpg",
        type: "boulangerie",
        price: 2.5,
        id: 8,
      },
    ],
    [
      {
        title: "Creme Amande big",
        description: "description goes here",
        img: "cremeAmande.jpg",
        type: "boulangerie",
        price: 5,
        id: 9,
      },
      {
        title: "Pain suise big",
        description: "description goes here",
        img: "painSuisse.jpg",
        type: "boulangerie",
        price: 8,
        id: 10,
      },
    ],
  ],

  petitDejeuner: [
    [
      {
        title: "Continental BreakFast",
        description: "description goes here",
        img: "continentalBreakFast.jpg",
        type: "petitDejeuner",
        price: 20,
        id: 11,
      },
      {
        title: "American BreakFast",
        description: "description goes here",
        img: "americanBreakFast.jpg",
        type: "petitDejeuner",
        price: 25,
        id: 12,
      },
    ],
    [
      {
        title: "Chineese petitDejeuner",
        description: "Chineese petitDejeuner perfect for the morning ",
        img: "chineeseBreakFast.jpg",
        type: "petitDejeuner",
        price: 30,
        id: 13,
      },

      {
        title: "Chineese petitDejeuner",
        description: "Chineese petitDejeuner perfect for the morning ",
        img: "chineeseBreakFast.jpg",
        type: "petitDejeuner",
        price: 30,
        id: 14,
      },
    ],
  ],

  glaces: [
    [
      {
        title: "Chocolate",
        description: "description goes here",
        img: "chocolateIceCream.jpg",
        type: "glaces",
        price: 30,
        id: 17,
      },
      {
        title: "Pistashu",
        description: "description goes here",
        img: "pistashuIceCream.jpg",
        type: "glaces",
        price: 40,
        id: 18,
      },
    ],
    [
      {
        title: "Vanilla",
        description: "description goes here",
        img: "vanillaIceCream.jpg",
        type: "glaces",
        price: 30,
        id: 19,
      },
      {
        title: "Strawberry",
        description: "description goes here",
        img: "strawberryIceCream.jpg",
        type: "glaces",
        price: 30,
        id: 20,
      },
    ],
  ],
};
// ================= TABLES =================
let tables = {};
for (let i = 1; i <= 12; i++) {
  tables[i] = { id: i, status: "empty" };
}

// ================= ORDERS =================
let orders = {};

// ================= HISTORY =================
let orderHistory = [];

// ================= SOCKET =================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ================= HELPERS =================
function archiveOrder(tableId, finalStatus) {
  if (!orders[tableId]) return;

  const historyEntry = {
    id: Date.now(),
    tableNumber: tableId,
    order: orders[tableId].order,
    status: finalStatus,
    archivedAt: new Date().toISOString(),
  };

  orderHistory.push(historyEntry);
}

// ================= MENU ROUTES =================
app.get("/menu", (req, res) => {
  res.json(menuData);
});

app.get("/menu/:category", (req, res) => {
  const category = req.params.category;

  if (!menuData[category]) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(menuData[category]);
});

// ================= TABLES =================
app.get("/tables", (req, res) => {
  res.json(tables);
});

// ================= ORDERS =================
app.get("/orders", (req, res) => {
  res.json(orders);
});

// ================= HISTORY =================
app.get("/history", (req, res) => {
  res.json({
    count: orderHistory.length,
    data: orderHistory,
  });
});

// ================= CREATE ORDER =================
app.post("/orders", (req, res) => {
  const { tableNumber, order } = req.body;

  if (!tableNumber || !order) {
    return res.status(400).json({ error: "Invalid order" });
  }

  orders[tableNumber] = {
    tableNumber,
    order,
    createdAt: new Date().toISOString(),
  };

  tables[tableNumber].status = "ordered";

  io.emit("new-order", orders);
  io.emit("tables-update", tables);

  return res.status(201).json({
    success: true,
    order: orders[tableNumber],
  });
});

// ================= UPDATE STATUS =================
app.patch("/tables/:id/status", (req, res) => {
  const id = req.params.id;
  const { action } = req.body;

  if (!tables[id]) {
    return res.status(404).json({ error: "Table not found" });
  }

  switch (action) {
    case "confirm":
      tables[id].status = "confirmed";
      break;

    case "ready":
      tables[id].status = "ready";
      break;

    case "served":
      tables[id].status = "notPayed";
      break;

    case "bill":
      tables[id].status = "bill";
      break;

    case "paid":
      tables[id].status = "empty";
      archiveOrder(id, "paid");
      delete orders[id];
      break;

    case "cancel":
      tables[id].status = "empty";
      archiveOrder(id, "cancelled");
      delete orders[id];
      break;

    default:
      return res.status(400).json({ error: "Invalid action" });
  }

  io.emit("tables-update", tables);

  return res.json({
    success: true,
    table: tables[id],
  });
});

// ================= START SERVER =================
server.listen(3005, () => {
  console.log("Server running on port 3005");
});
