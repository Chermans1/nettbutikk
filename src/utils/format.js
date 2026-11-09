export const formatPrice = value => new Intl.NumberFormat('nb-NO', {
  style: 'currency', currency: 'USD',
}).format(value);
export const categoryLabel = slug => slug.replaceAll('-', ' ');
