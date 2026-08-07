export const calcSubtotal = (items: Array<{ quantity: number; price: number }>): number => {
    return Number(items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2));
};

export const calcDiscountTotal = (subtotal: number, discountType: 'none' | 'flat' | 'percentage', discountValue: number): number => {
    return Number((discountType === 'flat' ? discountValue : discountType === 'percentage' ? subtotal * (discountValue / 100) : 0).toFixed(2));
};

export const calcTaxTotal = (subtotal: number, discountTotal: number, taxRate: number, taxType: 'exclusive' | 'inclusive'): number => {
    const taxableAmount = Math.max(0, subtotal - discountTotal);
    return Number((taxType === 'exclusive' ? taxableAmount * (taxRate / 100) : taxableAmount - (taxableAmount / (1 + taxRate / 100))).toFixed(2));
};

export const calcTotal = (subtotal: number, discountTotal: number, taxTotal: number, taxType: 'exclusive' | 'inclusive'): number => {
    const taxableAmount = Math.max(0, subtotal - discountTotal);
    return Number((taxType === 'exclusive' ? taxableAmount + taxTotal : taxableAmount).toFixed(2));
};
