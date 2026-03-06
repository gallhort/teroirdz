// Load env vars FIRST before any other imports that might use them
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import slugify from "slugify";

// PrismaNeon is a factory that accepts a Pool config object (not a Pool instance)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const products = [
  // Charcuterie bœuf
  { name: "Bœuf séché", category: "Charcuterie bœuf", pricePerUnit: 1800, unit: "100g", description: "Viande de bœuf séchée artisanalement, tendre et savoureuse." },
  { name: "Bresaola de bœuf", category: "Charcuterie bœuf", pricePerUnit: 2000, unit: "100g", description: "Bresaola de qualité supérieure, marinée aux herbes." },
  { name: "Bacon de bœuf", category: "Charcuterie bœuf", pricePerUnit: 1600, unit: "100g", description: "Bacon de bœuf fumé, idéal pour le petit-déjeuner ou les recettes." },
  { name: "Chorizo de bœuf", category: "Charcuterie bœuf", pricePerUnit: 1700, unit: "100g", description: "Chorizo épicé 100% bœuf, parfumé au paprika et aux épices." },
  { name: "Pastrami de bœuf", category: "Charcuterie bœuf", pricePerUnit: 2200, unit: "100g", description: "Pastrami traditionnel, fumé et épicé selon la recette artisanale." },
  { name: "Salami de bœuf", category: "Charcuterie bœuf", pricePerUnit: 1900, unit: "100g", description: "Salami de bœuf affiné, saveur intense et délicate." },
  { name: "Coppa de bœuf", category: "Charcuterie bœuf", pricePerUnit: 2100, unit: "100g", description: "Coppa de bœuf affinée, aromatisée aux épices méditerranéennes." },
  { name: "Pancetta de bœuf", category: "Charcuterie bœuf", pricePerUnit: 1750, unit: "100g", description: "Pancetta de bœuf roulée, fumée et épicée avec soin." },

  // Charcuterie volaille
  { name: "Dinde fumée", category: "Charcuterie volaille", flavor: "Nature", pricePerUnit: 1400, unit: "100g", description: "Blanc de dinde fumé naturellement, tendre et moelleux." },
  { name: "Dinde fumée", category: "Charcuterie volaille", flavor: "Miel-moutarde", pricePerUnit: 1500, unit: "100g", description: "Blanc de dinde fumé, mariné au miel et à la moutarde." },
  { name: "Dinde fumée", category: "Charcuterie volaille", flavor: "Paprika fumé", pricePerUnit: 1500, unit: "100g", description: "Blanc de dinde fumé au paprika doux et épicé." },
  { name: "Dinde fumée", category: "Charcuterie volaille", flavor: "Herbes de Provence", pricePerUnit: 1500, unit: "100g", description: "Blanc de dinde fumé aux herbes de Provence." },
  { name: "Bacon de dinde", category: "Charcuterie volaille", pricePerUnit: 1300, unit: "100g", description: "Bacon de dinde fumé, une alternative légère et savoureuse." },
  { name: "Magret de canard séché", category: "Charcuterie volaille", pricePerUnit: 2500, unit: "100g", description: "Magret de canard séché et affiné, saveur riche et intense." },
  { name: "Béret basque", category: "Charcuterie volaille", pricePerUnit: 1600, unit: "100g", description: "Spécialité basque à base de volaille, aux saveurs du terroir." },
  { name: "Chorizo de volaille", category: "Charcuterie volaille", pricePerUnit: 1450, unit: "100g", description: "Chorizo léger à base de volaille, épicé avec finesse." },

  // Poisson fumé
  { name: "Saumon fumé", category: "Poisson fumé", flavor: "Nature", pricePerUnit: 2400, unit: "100g", description: "Saumon fumé artisanalement, saveur pure et délicate." },
  { name: "Saumon fumé", category: "Poisson fumé", flavor: "Aneth", pricePerUnit: 2500, unit: "100g", description: "Saumon fumé à l'aneth frais, un classique scandinave." },
  { name: "Saumon fumé", category: "Poisson fumé", flavor: "Citron-poivre", pricePerUnit: 2500, unit: "100g", description: "Saumon fumé au citron et poivre noir, frais et parfumé." },
  { name: "Rillettes de saumon", category: "Poisson fumé", pricePerUnit: 1200, unit: "pièce", description: "Rillettes onctueuses au saumon fumé, idéales à tartiner." },
  { name: "Truite fumée", category: "Poisson fumé", pricePerUnit: 2000, unit: "100g", description: "Truite fumée artisanale, texture fine et goût délicat." },
  { name: "Maquereau fumé", category: "Poisson fumé", pricePerUnit: 1500, unit: "100g", description: "Maquereau fumé aux arômes boisés, riche en oméga-3." },

  // Asie / Afrique
  { name: "Plateau sushi", category: "Asie / Afrique", pricePerUnit: 3500, unit: "plateau", description: "Assortiment de sushis et makis frais préparés à la commande." },
  { name: "Nems (frits)", category: "Asie / Afrique", pricePerUnit: 350, unit: "pièce", description: "Nems croustillants maison, garnis de viande et légumes." },
  { name: "Mochi", category: "Asie / Afrique", pricePerUnit: 450, unit: "pièce", description: "Mochi japonais à la pâte de riz, garnitures variées." },
  { name: "Yassa poulet", category: "Asie / Afrique", pricePerUnit: 2000, unit: "pièce", description: "Poulet yassa sénégalais, mijoté aux oignons et citron." },
  { name: "Thiéboudiène", category: "Asie / Afrique", pricePerUnit: 2200, unit: "pièce", description: "Plat national sénégalais, riz au poisson et légumes." },
  { name: "Mafé", category: "Asie / Afrique", pricePerUnit: 2000, unit: "pièce", description: "Ragoût à la sauce arachide, recette traditionnelle d'Afrique de l'Ouest." },
  { name: "Tajine maison", category: "Asie / Afrique", pricePerUnit: 2500, unit: "pièce", description: "Tajine marocain maison aux légumes et épices du monde." },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.batchProduct.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.product.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@terodz.dz";
  const adminPassword = process.env.ADMIN_PASSWORD || "terodz2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      password: passwordHash,
      name: "Administrateur Terodz",
    },
  });
  console.log(`✅ Admin user created: ${adminEmail}`);

  // Create products
  const createdProducts = [];
  for (const product of products) {
    const slug = slugify(
      `${product.name}${product.flavor ? "-" + product.flavor : ""}`,
      { lower: true, strict: true, locale: "fr" }
    );
    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug,
        description: product.description,
        category: product.category,
        flavor: product.flavor ?? null,
        pricePerUnit: product.pricePerUnit,
        unit: product.unit,
        isAvailable: true,
      },
    });
    createdProducts.push(created);
  }
  console.log(`✅ ${createdProducts.length} products created`);

  // Create a demo open batch
  const now = new Date();
  const closeDate = new Date(now);
  closeDate.setDate(closeDate.getDate() + 7);
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + 14);

  const batch = await prisma.batch.create({
    data: {
      name: "Fournée #1 — Printemps 2026",
      status: "open",
      orderOpenAt: now,
      orderCloseAt: closeDate,
      deliveryDate: deliveryDate,
      notes: "Première fournée de la saison !",
    },
  });

  // Assign all products to the batch
  for (const product of createdProducts) {
    await prisma.batchProduct.create({
      data: {
        batchId: batch.id,
        productId: product.id,
      },
    });
  }
  console.log(`✅ Demo batch "${batch.name}" created with ${createdProducts.length} products`);

  console.log("🎉 Seed complete!");
  console.log(`\nAdmin credentials:`);
  console.log(`  Email: ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
