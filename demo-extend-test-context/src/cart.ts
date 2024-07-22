import { createId } from '@paralleldrive/cuid2'

export type Cart = Readonly<{
  cartId: string,
  items: readonly CartItem[];
}>

export type CartItem = Readonly<{
  itemId: string,
  sku: string,
  quantity: number,
}>

export const emptyCart = (cartId: string = createId()): Cart => ({
  cartId: cartId,
  items: [],
})

export const withItem = (cart: Cart, item: Optional<Omit<CartItem, 'itemId'>, 'quantity'>): Cart => {
  if (item?.quantity != null && item.quantity <= 0) return cart

  const existingItem = cart.items.find(it => it.sku === item.sku)
  const quantity = item?.quantity ?? 1 + (existingItem?.quantity ?? 0)

  const items = existingItem
    ? [...cart.items.filter(it => it.sku !== item.sku), { ...existingItem, quantity }]
    : [...cart.items, { ...item, itemId: createId(), quantity }]

  return { ...cart, items }
}

type Optional<T, K extends keyof any> = Omit<T, K> & { [K in keyof T]?: T[K] }
