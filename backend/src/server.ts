import express from "express";
import cors from "cors";
import { products } from "./products";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Adaptador para que se parezca a dummyjson.com/products
function toDummyShape(p: any) {
  return {
    id: p.id,
    title: p.name,                 // dummyjson usa "title"
    price: p.price,
    category: p.category,
    thumbnail: p.image,            // dummyjson usa "thumbnail"
    images: [p.image],             // dummyjson suele traer array
    // extras opcionales por compatibilidad:
    description: "Producto de limpieza",
    rating: 4.5,
    stock: 50,
    brand: "CleanLosRios",
  };
}

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "cleanlosrios-api" });
});

// GET /products?limit=10&skip=0
app.get("/products", (req, res) => {
  const limit = Math.max(0, Number(req.query.limit ?? 30));
  const skip = Math.max(0, Number(req.query.skip ?? 0));

  const mapped = products.map(toDummyShape);
  const sliced = mapped.slice(skip, skip + limit);

  res.json({
    products: sliced,
    total: mapped.length,
    skip,
    limit,
  });
});

// GET /products/search?q=xxx
app.get("/products/search", (req, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();
  const limit = Math.max(0, Number(req.query.limit ?? 30));
  const skip = Math.max(0, Number(req.query.skip ?? 0));

  const filtered = products.filter((p) => {
    const name = (p.name ?? "").toLowerCase();
    const category = (p.category ?? "").toLowerCase();
    return name.includes(q) || category.includes(q);
  });

  const mapped = filtered.map(toDummyShape);
  const sliced = mapped.slice(skip, skip + limit);

  // dummyjson normalmente responde 200 aunque venga vacío,
  // pero si tú quieres “error cuando no hay”, puedes mandar 404 aquí.
  res.json({
    products: sliced,
    total: mapped.length,
    skip,
    limit,
  });
});


// GET /products/:id
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = products.find((p) => p.id === id);

  if (!found) return res.status(404).json({ message: "Product not found" });

  res.json(toDummyShape(found));
});

// GET /products/categories
app.get("/products/categories", (_req, res) => {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  res.json(categories);
});

// GET /products/category/:category
app.get("/products/category/:category", (req, res) => {
  const categoryParam = decodeURIComponent(req.params.category).toLowerCase();
  const limit = Math.max(0, Number(req.query.limit ?? 30));
  const skip = Math.max(0, Number(req.query.skip ?? 0));

  const filtered = products.filter(
    (p) => (p.category ?? "").toLowerCase() === categoryParam
  );

  const mapped = filtered.map(toDummyShape);
  const sliced = mapped.slice(skip, skip + limit);

  res.json({
    products: sliced,
    total: mapped.length,
    skip,
    limit,
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});