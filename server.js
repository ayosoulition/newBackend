const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const menuData = require("./data");

const JWT_SECRET = "********";
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// ================= SOCKET =================
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  // Each waiter joins their personal room so targeted events reach only them
  socket.on("server-join", ({ serverId }) => {
    if (serverId) {
      socket.join(`server-${serverId}`);
    }
  });
});

// ================= STATE =================
let tables = {};
for (let i = 1; i <= 12; i++) {
  tables[i] = { id: i, status: "empty", serverName: null, serverId: null };
}

let orders = {};
let orderHistory = [];

// ================= USERS =================
const users = [
  { id: 1, username: "admin",    password: bcrypt.hashSync("admin123",   10), role: "admin"   },
  { id: 2, username: "serveur1", password: bcrypt.hashSync("serveur123", 10), role: "serveur" },
  { id: 3, username: "serveur2", password: bcrypt.hashSync("serveur456", 10), role: "serveur" },
  { id: 4, username: "serveur3", password: bcrypt.hashSync("serveur789", 10), role: "serveur" },
  { id: 5, username: "caisse1",  password: bcrypt.hashSync("caisse123",  10), role: "caisse"  },
];

// ================= MENU HELPERS =================
const PAGE_SIZE = 2;

function flattenCategory(categoryData) {
  return categoryData.flat();
}

function paginate(items) {
  const pages = [];
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    pages.push(items.slice(i, i + PAGE_SIZE));
  }
  return pages;
}

function getMaxId() {
  let maxId = 0;
  Object.values(menuData).flat(2).forEach((item) => {
    if (item.id > maxId) maxId = item.id;
  });
  return maxId;
}

// ================= ORDER HELPERS =================
function archiveOrder(tableId, finalStatus) {
  if (!orders[tableId]) return;
  orderHistory.push({
    id: Date.now(),
    tableNumber: tableId,
    order: orders[tableId].order,
    status: finalStatus,
    serverName: tables[tableId]?.serverName || "Unknown",
    archivedAt: new Date().toISOString(),
  });
}

function clearTable(id) {
  tables[id].status = "empty";
  tables[id].serverName = null;
  tables[id].serverId = null;
  delete orders[id];
}

// ================= AUTH MIDDLEWARE =================
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
}

// ================= IMAGE UPLOAD =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ================= AUTH ROUTES =================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ success: false, error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" },
  );
  res.json({ success: true, token, role: user.role, id: user.id });
});

app.get("/me", authenticate, (req, res) => res.json(req.user));

// ================= IMAGE UPLOAD =================
app.post("/upload", authenticate, authorize("admin"), upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    success: true,
    filename: req.file.filename,
    url: `http://localhost:3005/uploads/${req.file.filename}`,
  });
});

// ================= MENU ROUTES =================
app.get("/menu", (req, res) => res.json(menuData));

app.get("/menu/:category", (req, res) => {
  const { category } = req.params;
  if (!menuData[category]) return res.status(404).json({ error: "Category not found" });
  res.json(menuData[category]);
});

app.post("/menu/:category", authenticate, authorize("admin"), (req, res) => {
  const { category } = req.params;
  if (!menuData[category]) return res.status(404).json({ error: "Category not found" });

  const item = {
    ...req.body,
    img: req.body.img ? `http://localhost:3005/uploads/${req.body.img}` : "",
    id: getMaxId() + 1,
  };
  menuData[category] = paginate([...flattenCategory(menuData[category]), item]);
  io.emit("menu-update", menuData);
  res.status(201).json({ success: true, item });
});

app.put("/menu/:category/:itemId", authenticate, authorize("admin"), (req, res) => {
  const { category, itemId } = req.params;
  const { price, title, description, img } = req.body;
  if (!menuData[category]) return res.status(404).json({ error: "Category not found" });

  let found = false;
  menuData[category] = menuData[category].map((page) =>
    page.map((item) => {
      if (item.id !== Number(itemId)) return item;
      found = true;
      return {
        ...item,
        price: price ?? item.price,
        title: title ?? item.title,
        description: description ?? item.description,
        img: img ? `http://localhost:3005/uploads/${img}` : item.img,
      };
    }),
  );

  if (!found) return res.status(404).json({ error: "Item not found" });
  io.emit("menu-update", menuData);
  res.json({ success: true });
});

app.delete("/menu/:category/:itemId", authenticate, authorize("admin"), (req, res) => {
  const { category, itemId } = req.params;
  if (!menuData[category]) return res.status(404).json({ error: "Category not found" });

  const flat = flattenCategory(menuData[category]);
  const filtered = flat.filter((item) => item.id !== Number(itemId));
  if (filtered.length === flat.length) return res.status(404).json({ error: "Item not found" });

  menuData[category] = paginate(filtered);
  io.emit("menu-update", menuData);
  res.json({ success: true });
});

// ================= TABLE & ORDER READ ROUTES =================
app.get("/tables", (req, res) => res.json(tables));
app.get("/orders",  (req, res) => res.json(orders));
app.get("/history", (req, res) => res.json({ count: orderHistory.length, data: orderHistory }));

// ================= CREATE ORDER (public — customers) =================
app.post("/orders", (req, res) => {
  const { tableNumber, order } = req.body;
  if (!tableNumber || !order) return res.status(400).json({ error: "Invalid order" });

  orders[tableNumber] = { tableNumber, order, createdAt: new Date().toISOString() };
  tables[tableNumber].status = "ordered";

  io.emit("new-order", orders);
  io.emit("tables-update", tables);

  res.status(201).json({ success: true, order: orders[tableNumber] });
});

// ================= BILL REQUEST (public — customers) =================
// Called from the customer's ticket page when they want to pay.
// No authentication needed since customers don't have accounts.
app.patch("/tables/:id/bill", (req, res) => {
  const id = req.params.id;
  if (!tables[id]) return res.status(404).json({ error: "Table not found" });
  if (tables[id].status !== "notPayed") {
    return res.status(400).json({ error: "Table is not in a billable state" });
  }

  tables[id].status = "bill";
  io.emit("tables-update", tables);
  res.json({ success: true });
});

// ================= TABLE STATUS TRANSITIONS (staff only) =================
app.patch("/tables/:id/status", authenticate, (req, res) => {
  const id = req.params.id;
  const { action } = req.body;
  const { id: serverId, username: serverName, role: userRole } = req.user;

  if (!tables[id]) return res.status(404).json({ error: "Table not found" });

  switch (action) {
    // ── Any available serveur claims the table ──
    case "confirm":
      if (userRole !== "serveur") {
        return res.status(403).json({ error: "Only servers can confirm tables" });
      }
      if (tables[id].status !== "ordered") {
        return res.status(400).json({ error: "Table is not awaiting confirmation" });
      }
      if (tables[id].serverId && tables[id].serverId !== serverId) {
        return res.status(409).json({ error: "Table already claimed by another server" });
      }
      tables[id].status = "confirmed";
      tables[id].serverName = serverName;
      tables[id].serverId = serverId;
      break;

    // ── Caisse (kitchen) marks the order ready ──
    case "ready":
      if (userRole !== "caisse") {
        return res.status(403).json({ error: "Only kitchen can mark orders as ready" });
      }
      tables[id].status = "ready";
      // Push notification only to the server who owns this table
      if (tables[id].serverId) {
        io.to(`server-${tables[id].serverId}`).emit("order-ready", { tableId: id });
      }
      io.emit("tables-update", tables);
      return res.json({ success: true });

    // ── Owning serveur marks the food as delivered ──
    case "served":
      if (userRole !== "serveur") {
        return res.status(403).json({ error: "Only servers can serve tables" });
      }
      if (tables[id].serverId !== serverId) {
        return res.status(403).json({ error: "You can only serve your own tables" });
      }
      tables[id].status = "notPayed";
      break;

    // ── Owning serveur marks the table as paid ──
    case "paid":
      if (userRole !== "serveur") {
        return res.status(403).json({ error: "Only servers can process payment" });
      }
      if (tables[id].serverId !== serverId) {
        return res.status(403).json({ error: "You can only process payment for your own tables" });
      }
      archiveOrder(id, "paid");
      clearTable(id);
      break;

    // ── Owning serveur cancels an order ──
    case "cancel":
      if (userRole !== "serveur") {
        return res.status(403).json({ error: "Only servers can cancel tables" });
      }
      // Allow cancel on "ordered" (unclaimed) or on your own table
      if (tables[id].serverId && tables[id].serverId !== serverId) {
        return res.status(403).json({ error: "You can only cancel your own tables" });
      }
      archiveOrder(id, "cancelled");
      clearTable(id);
      break;

    default:
      return res.status(400).json({ error: "Invalid action" });
  }

  io.emit("tables-update", tables);
  return res.json({ success: true, table: tables[id] });
});

// ================= START SERVER =================
server.listen(3005, () => console.log("Server running on port 3005"));
