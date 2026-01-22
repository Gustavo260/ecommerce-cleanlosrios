import express from "express";
import cors from "cors";
import { products } from "./products";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Adaptador para que se parezca a dummyjson.com/products
function toDummyShape(p: any) {
  const title = p.title ?? p.name ?? `Producto ${p.id}`;
  const thumbnail = p.thumbnail ?? p.image ?? null;

  const images =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : thumbnail
      ? [thumbnail]
      : [];

  return {
    id: p.id,
    title,                
    price: p.price ?? 0,
    category: p.category ?? "Sin categoría",
    thumbnail,            
    images,              

    vendor: p.vendor ?? p.brand ?? "CleanLosRios",
    shortDescription: p.shortDescription ?? p.description ?? "",

    description: p.description ?? "Producto de limpieza",
    rating: p.rating ?? 4.5,
    stock: p.stock ?? 50,
    brand: p.brand ?? "CleanLosRios",
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

  const filtered = products.filter((p: any) => {
    const title = String(p.title ?? p.name ?? "").toLowerCase();
    const category = String(p.category ?? "").toLowerCase();
    return title.includes(q) || category.includes(q);
  });

  const mapped = filtered.map(toDummyShape);
  const sliced = mapped.slice(skip, skip + limit);

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
  const found = products.find((p: any) => p.id === id);

  if (!found) return res.status(404).json({ message: "Product not found" });

  res.json(toDummyShape(found));
});

// GET /products/categories
app.get("/products/categories", (_req, res) => {
  const categories = Array.from(new Set(products.map((p: any) => p.category)));
  res.json(categories);
});

// GET /products/category/:category
app.get("/products/category/:category", (req, res) => {
  const categoryParam = decodeURIComponent(req.params.category).toLowerCase();
  const limit = Math.max(0, Number(req.query.limit ?? 30));
  const skip = Math.max(0, Number(req.query.skip ?? 0));

  const filtered = products.filter(
    (p: any) => String(p.category ?? "").toLowerCase() === categoryParam
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
