export const WHATSAPP_NUMBER = '923282200919';

export const openWhatsApp = (message: string) => {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
};

export const formatPrice = (price: number) => {
  return `PKR ${price.toLocaleString()}`;
};

export const generateProductWhatsAppMessage = (product: {
  name: string;
  price: number;
  variant?: string;
  quantity?: number;
  customization?: string;
}) => {
  return `Hi! I'm interested in ordering:

🎁 Product: ${product.name}${product.variant ? ` - ${product.variant}` : ''}
💰 Price: ${formatPrice(product.price)}
📦 Quantity: ${product.quantity || 1}
🎨 Customization: ${product.customization || 'None'}

Please confirm availability and total cost with delivery.`;
};

export const generateCartWhatsAppMessage = (items: Array<{
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  customization?: string;
}>, total: number) => {
  const itemLines = items.map(item =>
    `• ${item.name}${item.variant ? ` - ${item.variant}` : ''} - Qty: ${item.quantity} - ${formatPrice(item.price * item.quantity)}${item.customization ? `\n  Customization: ${item.customization}` : ''}`
  ).join('\n');

  return `🛍️ CART SUMMARY:

${itemLines}

Subtotal: ${formatPrice(total)}
Total: ${formatPrice(total)}

Please confirm availability. Thank you!`;
};
