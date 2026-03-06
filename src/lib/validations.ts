import { z } from "zod";

export const createOrderSchema = z.object({
  batchId: z.string().min(1, "Fournée invalide"),
  customerName: z.string().min(2, "Le nom est requis (min. 2 caractères)"),
  customerPhone: z.string().min(8, "Numéro de téléphone invalide"),
  customerEmail: z.string().email("Adresse email invalide"),
  customerAddress: z.string().optional(),
  notes: z.string().max(500, "Notes trop longues (max 500 caractères)").optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(500),
      })
    )
    .min(1, "Veuillez sélectionner au moins un produit"),
});

export const createProductSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  category: z.enum([
    "Charcuterie bœuf",
    "Charcuterie volaille",
    "Poisson fumé",
    "Asie / Afrique",
  ]),
  flavor: z.string().optional(),
  description: z.string().optional(),
  pricePerUnit: z.number().positive("Prix invalide"),
  unit: z.string().min(1, "Unité requise"),
  maxQuantityPerBatch: z.number().int().positive().optional().nullable(),
  isAvailable: z.boolean().default(true),
  image: z.string().optional().nullable(),
});

export const updateProductSchema = createProductSchema.partial();

export const createBatchSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  orderOpenAt: z.string().datetime().optional().nullable(),
  orderCloseAt: z.string().datetime().optional().nullable(),
  deliveryDate: z.string().datetime().optional().nullable(),
  notes: z.string().optional(),
  productIds: z.array(z.string()).min(1, "Sélectionnez au moins un produit"),
});

export const updateBatchSchema = createBatchSchema.partial().omit({ productIds: true });

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "ready", "delivered", "cancelled"]),
});

export const updateBatchStatusSchema = z.object({
  status: z.enum(["draft", "open", "closed", "delivered"]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateBatchInput = z.infer<typeof createBatchSchema>;
