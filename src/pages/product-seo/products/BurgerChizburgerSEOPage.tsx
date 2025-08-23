/**
 * @file: BurgerChizburgerSEOPage.tsx
 * @description: SEO страница для товара "Бургер "Чизбургер""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 14,
  name: "Бургер \"Чизбургер\"",
  price: 200,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_cheeseburger.png"
}

export function BurgerChizburgerSEOPage() {
  return <ProductSEOTemplate product={product} page="burger-chizburger" />
}

export default BurgerChizburgerSEOPage
