import { describe, expect, test } from 'vitest'
import { Cart, emptyCart, withItem } from './cart.js'

const cartTest = test.extend<{ cart: Cart }>({
  cart: async ({}, use) => {
    await use(emptyCart())
  }
})

describe('shopping cart', () => {

  test('each new cart has unique ids', () => {
    expect(emptyCart().cartId).not.toEqual(emptyCart().cartId)
  })

  cartTest('with one item', ({ cart }) => {
    const items = withItem(cart, { sku: 'prod-1' }).items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ sku: 'prod-1', quantity: 1 })
  })

  cartTest('with two items', ({ cart }) => {
    const [item1, item2] = withItem(withItem(cart, { sku: 'prod-1' }), { sku: 'prod-2', quantity: 2 }).items
    expect(item1).toMatchObject({ sku: 'prod-1', quantity: 1 })
    expect(item2).toMatchObject({ sku: 'prod-2', quantity: 2 })
  })

  cartTest('with existing item sku increases quantity', ({ cart }) => {
    let items = withItem(withItem(cart, { sku: 'prod-1' }), { sku: 'prod-1' }).items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ sku: 'prod-1', quantity: 2 })
  })

  cartTest('item with zero quantity is not added', ({ cart }) => {
    const items = withItem(cart, { sku: 'prod-1', quantity: 0 }).items
    expect(items).toHaveLength(0)
  })

  cartTest('item with negative quantity is not added', ({ cart }) => {
    const items = withItem(cart, { sku: 'prod-1', quantity: -1 }).items
    expect(items).toHaveLength(0)
  })
})
