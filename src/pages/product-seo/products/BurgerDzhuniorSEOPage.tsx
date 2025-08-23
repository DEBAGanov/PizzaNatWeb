/**
 * @file: BurgerDzhuniorSEOPage.tsx
 * @description: SEO страница для товара "Бургер "Джуниор""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 16,
  name: "Бургер \"Джуниор\"",
  price: 160,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_tom_yam.png"
}

export function BurgerDzhuniorSEOPage() {
  return <ProductSEOTemplate product={product} page="burger-dzhunior" />
}

export default BurgerDzhuniorSEOPage
