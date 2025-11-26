import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { COMPANY_INFO } from '@/lib/company'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('orderId')
    const userId = searchParams.get('userId')

    if (!orderId || !userId) {
      return NextResponse.json(
        { error: 'orderId et userId sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que la commande appartient à l'utilisateur
    const { data: order, error: orderError } = await supabaseAdmin
      .from('nexora_orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    // Récupérer les informations de l'utilisateur
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId)
    const customerEmail = userData?.user?.email || order.customer_email || ''
    const customerName = userData?.user?.user_metadata?.name || customerEmail

    // Formater les dates
    const invoiceDate = new Date(order.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Calculer le montant TTC (TVA 20%)
    const amountHT = order.amount / 100
    const tvaRate = 0.20
    const tvaAmount = amountHT * tvaRate
    const amountTTC = amountHT + tvaAmount

    // Générer le HTML de la facture
    const invoiceHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facture ${orderId.substring(0, 8)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 40px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #17E668;
    }
    .company-info {
      flex: 1;
    }
    .company-name {
      font-size: 28px;
      font-weight: bold;
      color: #17E668;
      margin-bottom: 10px;
    }
    .company-details {
      font-size: 11px;
      color: #666;
      line-height: 1.8;
    }
    .invoice-info {
      text-align: right;
      flex: 1;
    }
    .invoice-title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }
    .invoice-number {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
    .invoice-date {
      font-size: 14px;
      color: #666;
    }
    .customer-section {
      margin-bottom: 40px;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .customer-details {
      font-size: 12px;
      color: #666;
      line-height: 2;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .items-table thead {
      background: #17E668;
      color: #fff;
    }
    .items-table th {
      padding: 12px;
      text-align: left;
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
    }
    .items-table td {
      padding: 15px 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 12px;
    }
    .items-table tbody tr:last-child td {
      border-bottom: none;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .totals {
      margin-left: auto;
      width: 300px;
      margin-bottom: 40px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 12px;
    }
    .total-row.total-final {
      font-size: 18px;
      font-weight: bold;
      padding-top: 15px;
      border-top: 2px solid #17E668;
      color: #17E668;
    }
    .total-label {
      color: #666;
    }
    .total-amount {
      font-weight: bold;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #999;
      text-align: center;
    }
    .payment-info {
      background: #f0f9ff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 30px;
      font-size: 11px;
      color: #666;
    }
    .payment-info strong {
      color: #333;
    }
    @media print {
      body {
        padding: 20px;
      }
      .invoice-container {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div class="company-info">
        <div class="company-name">${COMPANY_INFO.name}</div>
        <div class="company-details">
          ${COMPANY_INFO.address}<br>
          ${COMPANY_INFO.city}<br>
          ${COMPANY_INFO.country}<br><br>
          SIRET : ${COMPANY_INFO.siret}<br>
          TVA : ${COMPANY_INFO.tva}<br><br>
          Email : ${COMPANY_INFO.email}<br>
          Tél : ${COMPANY_INFO.phone}<br>
          Web : ${COMPANY_INFO.website}
        </div>
      </div>
      <div class="invoice-info">
        <div class="invoice-title">FACTURE</div>
        <div class="invoice-number">N° ${orderId.substring(0, 8).toUpperCase()}</div>
        <div class="invoice-date">Date : ${invoiceDate}</div>
      </div>
    </div>

    <div class="customer-section">
      <div class="section-title">Facturé à</div>
      <div class="customer-details">
        ${customerName}<br>
        ${customerEmail}
      </div>
    </div>

    <div class="payment-info">
      <strong>Informations de paiement :</strong><br>
      Paiement effectué le ${invoiceDate} via Stripe<br>
      Référence de transaction : ${order.stripe_payment_intent_id || 'N/A'}
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-center">Quantité</th>
          <th class="text-right">Prix unitaire HT</th>
          <th class="text-right">Total HT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${order.offer_name}</strong><br>
            <span style="color: #666; font-size: 11px;">Référence : ${order.offer_id}</span>
          </td>
          <td class="text-center">1</td>
          <td class="text-right">${amountHT.toFixed(2).replace('.', ',')} €</td>
          <td class="text-right">${amountHT.toFixed(2).replace('.', ',')} €</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row">
        <span class="total-label">Total HT</span>
        <span class="total-amount">${amountHT.toFixed(2).replace('.', ',')} €</span>
      </div>
      <div class="total-row">
        <span class="total-label">TVA (20%)</span>
        <span class="total-amount">${tvaAmount.toFixed(2).replace('.', ',')} €</span>
      </div>
      <div class="total-row total-final">
        <span>Total TTC</span>
        <span>${amountTTC.toFixed(2).replace('.', ',')} €</span>
      </div>
    </div>

    <div class="footer">
      <p>Merci pour votre confiance !</p>
      <p>Cette facture est générée automatiquement et fait foi de preuve d'achat.</p>
      <p style="margin-top: 10px;">
        ${COMPANY_INFO.name} - ${COMPANY_INFO.address} - ${COMPANY_INFO.city}<br>
        SIRET : ${COMPANY_INFO.siret} - TVA : ${COMPANY_INFO.tva}
      </p>
      <p style="margin-top: 15px; font-size: 9px; color: #999; font-style: italic;">
        Nexora est une marque de Home Service
      </p>
    </div>
  </div>
</body>
</html>
    `

    return new NextResponse(invoiceHTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="facture-${orderId.substring(0, 8)}.html"`,
      },
    })
  } catch (error: any) {
    console.error('Erreur lors de la génération de la facture:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la génération de la facture' },
      { status: 500 }
    )
  }
}

