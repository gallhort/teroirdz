export type BatchStatus = "draft" | "open" | "closed" | "delivered";
export type OrderStatus = "pending" | "confirmed" | "ready" | "delivered" | "cancelled";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  flavor: string | null;
  pricePerUnit: number;
  unit: string;
  image: string | null;
  isAvailable: boolean;
  maxQuantityPerBatch: number | null;
  createdAt: string;
};

export type Batch = {
  id: string;
  name: string;
  status: BatchStatus;
  orderOpenAt: string | null;
  orderCloseAt: string | null;
  deliveryDate: string | null;
  notes: string | null;
  createdAt: string;
};

export type ActiveBatch = Batch & {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    category: string;
    flavor: string | null;
    pricePerUnit: number;
    unit: string;
    image: string | null;
    maxQty: number | null;
    orderedQty: number;
  }>;
};

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  unit: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string | null;
  batchId: string;
  batchName?: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  notes: string | null;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  name: string;
  flavor?: string | null;
  unit: string;
  qty: number;
  unitPrice: number;
};

export const CATEGORIES = [
  "Charcuterie bœuf",
  "Charcuterie volaille",
  "Poisson fumé",
  "Asie / Afrique",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  ready: "Prête",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export const BATCH_STATUS_LABELS: Record<BatchStatus, string> = {
  draft: "Brouillon",
  open: "Ouverte",
  closed: "Fermée",
  delivered: "Livrée",
};
