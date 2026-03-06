import { Resend } from "resend";
import { formatDateFr } from "./date";
import { formatPrice } from "./currency";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "Terodz <noreply@terodz.dz>";
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type OrderEmailData = {
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string | null;
  batchName: string;
  deliveryDate?: Date | string | null;
  items: Array<{ productName: string; quantity: number; unitPrice: number | string; unit: string }>;
  totalPrice: number | string;
  notes?: string | null;
};

function itemsTable(items: OrderEmailData["items"]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #E8D9BA">${item.productName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E8D9BA;text-align:center">${item.quantity} ${item.unit}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E8D9BA;text-align:right">${formatPrice(item.unitPrice)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E8D9BA;text-align:right">${formatPrice(Number(item.unitPrice) * item.quantity)}</td>
        </tr>`
    )
    .join("");
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF6ED;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(59,31,14,0.1)">
    <div style="background:#3B1F0E;padding:32px 40px;text-align:center">
      <h1 style="color:#F5EDD6;margin:0;font-size:28px;font-family:Georgia,serif">Terodz</h1>
      <p style="color:#D9C9A8;margin:8px 0 0;font-size:13px">Charcuterie artisanale &amp; saveurs du monde</p>
    </div>
    <div style="padding:32px 40px">
      ${content}
    </div>
    <div style="background:#F5EDD6;padding:20px 40px;text-align:center">
      <p style="color:#5C3317;margin:0;font-size:12px">Terodz — Paiement à la livraison uniquement</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendOrderConfirmationToCustomer(data: OrderEmailData) {
  const html = emailWrapper(`
    <h2 style="color:#3B1F0E;font-family:Georgia,serif;margin:0 0 8px">Votre commande est confirmée !</h2>
    <p style="color:#5C3317">Merci, <strong>${data.customerName}</strong> ! Nous avons bien reçu votre commande.</p>

    <div style="background:#F5EDD6;border-radius:8px;padding:16px;margin:20px 0">
      <p style="margin:0;color:#3B1F0E"><strong>Numéro de commande :</strong> ${data.orderNumber}</p>
      <p style="margin:8px 0 0;color:#3B1F0E"><strong>Fournée :</strong> ${data.batchName}</p>
      ${data.deliveryDate ? `<p style="margin:8px 0 0;color:#3B1F0E"><strong>Livraison prévue le :</strong> ${formatDateFr(data.deliveryDate)}</p>` : ""}
    </div>

    <h3 style="color:#3B1F0E;font-family:Georgia,serif;margin:24px 0 12px">Récapitulatif</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr style="background:#3B1F0E;color:#F5EDD6">
          <th style="padding:10px 12px;text-align:left">Produit</th>
          <th style="padding:10px 12px;text-align:center">Qté</th>
          <th style="padding:10px 12px;text-align:right">Prix unit.</th>
          <th style="padding:10px 12px;text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${itemsTable(data.items)}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:12px;text-align:right;font-weight:bold;color:#3B1F0E">TOTAL</td>
          <td style="padding:12px;text-align:right;font-weight:bold;color:#C4622D;font-size:16px">${formatPrice(data.totalPrice)}</td>
        </tr>
      </tfoot>
    </table>

    ${data.notes ? `<div style="margin:20px 0;padding:16px;background:#FDF6F0;border-left:4px solid #C4622D;border-radius:4px"><p style="margin:0;color:#5C3317"><strong>Notes :</strong> ${data.notes}</p></div>` : ""}

    <div style="margin:24px 0;padding:16px;background:#F5EDD6;border-radius:8px">
      <p style="margin:0;color:#3B1F0E;font-weight:bold">💰 Paiement à la livraison</p>
      <p style="margin:8px 0 0;color:#5C3317;font-size:14px">Le règlement se fera en espèces lors de la réception de votre commande. Nous vous contacterons pour organiser la livraison.</p>
    </div>

    <p style="color:#5C3317;font-size:14px">Pour toute question, contactez-nous à <a href="mailto:${OWNER_EMAIL}" style="color:#C4622D">${OWNER_EMAIL}</a></p>
  `);

  await resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Votre commande Terodz — ${data.orderNumber}`,
    html,
  });
}

export async function sendOrderNotificationToOwner(data: OrderEmailData) {
  if (!OWNER_EMAIL) return;

  const html = emailWrapper(`
    <h2 style="color:#3B1F0E;font-family:Georgia,serif;margin:0 0 8px">Nouvelle commande reçue</h2>
    <p style="color:#5C3317">Commande <strong>${data.orderNumber}</strong> — ${data.batchName}</p>

    <h3 style="color:#3B1F0E;margin:20px 0 12px">Informations client</h3>
    <table style="width:100%;font-size:14px;color:#3B1F0E">
      <tr><td style="padding:4px 0;width:140px;color:#5C3317">Nom :</td><td><strong>${data.customerName}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#5C3317">Téléphone :</td><td><a href="tel:${data.customerPhone}" style="color:#C4622D">${data.customerPhone}</a></td></tr>
      <tr><td style="padding:4px 0;color:#5C3317">Email :</td><td><a href="mailto:${data.customerEmail}" style="color:#C4622D">${data.customerEmail}</a></td></tr>
      ${data.customerAddress ? `<tr><td style="padding:4px 0;color:#5C3317">Adresse :</td><td>${data.customerAddress}</td></tr>` : ""}
      ${data.notes ? `<tr><td style="padding:4px 0;color:#5C3317">Notes :</td><td style="color:#C4622D">${data.notes}</td></tr>` : ""}
    </table>

    <h3 style="color:#3B1F0E;font-family:Georgia,serif;margin:24px 0 12px">Articles commandés</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr style="background:#3B1F0E;color:#F5EDD6">
          <th style="padding:10px 12px;text-align:left">Produit</th>
          <th style="padding:10px 12px;text-align:center">Qté</th>
          <th style="padding:10px 12px;text-align:right">Prix unit.</th>
          <th style="padding:10px 12px;text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${itemsTable(data.items)}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:12px;text-align:right;font-weight:bold;color:#3B1F0E">TOTAL</td>
          <td style="padding:12px;text-align:right;font-weight:bold;color:#C4622D;font-size:16px">${formatPrice(data.totalPrice)}</td>
        </tr>
      </tfoot>
    </table>

    <div style="margin:24px 0;text-align:center">
      <a href="${SITE_URL}/admin/commandes/${data.orderId}" style="background:#C4622D;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
        Voir la commande dans l'admin →
      </a>
    </div>
  `);

  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `[Terodz] Nouvelle commande ${data.orderNumber}`,
    html,
  });
}

export async function sendOrderReadyEmail(data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  batchName: string;
  deliveryDate?: Date | string | null;
  totalPrice: number | string;
}) {
  const html = emailWrapper(`
    <h2 style="color:#3B1F0E;font-family:Georgia,serif;margin:0 0 8px">Votre commande est prête ! 🎉</h2>
    <p style="color:#5C3317">Bonjour <strong>${data.customerName}</strong>,</p>
    <p style="color:#5C3317">Bonne nouvelle ! Votre commande <strong>${data.orderNumber}</strong> est prête.</p>

    <div style="background:#F5EDD6;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
      <p style="margin:0;color:#3B1F0E;font-size:18px;font-weight:bold">${data.orderNumber}</p>
      <p style="margin:8px 0 0;color:#5C3317">${data.batchName}</p>
      ${data.deliveryDate ? `<p style="margin:8px 0 0;color:#C4622D;font-weight:bold">Livraison le ${formatDateFr(data.deliveryDate)}</p>` : ""}
      <p style="margin:12px 0 0;color:#3B1F0E;font-size:20px;font-weight:bold">Total : ${formatPrice(data.totalPrice)}</p>
    </div>

    <div style="background:#FDF6F0;border-left:4px solid #C4622D;border-radius:4px;padding:16px;margin:20px 0">
      <p style="margin:0;color:#3B1F0E;font-weight:bold">💰 Rappel : Paiement à la livraison</p>
      <p style="margin:8px 0 0;color:#5C3317;font-size:14px">Merci de prévoir le montant exact en espèces. Nous vous contacterons pour confirmer les modalités de livraison ou de retrait.</p>
    </div>

    <p style="color:#5C3317;font-size:14px">Questions ? Contactez-nous : <a href="mailto:${OWNER_EMAIL}" style="color:#C4622D">${OWNER_EMAIL}</a></p>
  `);

  await resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Votre commande Terodz est prête — ${data.orderNumber}`,
    html,
  });
}
