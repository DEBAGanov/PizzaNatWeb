/**
 * @file: GribnayaPitstsaSEOPage.tsx
 * @description: SEO страница для товара "Грибная пицца"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 2,
  name: "Грибная пицца",
  price: 469,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_gribnaya.png"
}

export function GribnayaPitstsaSEOPage() {
  return <ProductSEOTemplate product={product} page="gribnaya-pitstsa" />
}

export default GribnayaPitstsaSEOPage
