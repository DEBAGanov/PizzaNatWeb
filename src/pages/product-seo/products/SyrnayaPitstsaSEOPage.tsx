/**
 * @file: SyrnayaPitstsaSEOPage.tsx
 * @description: SEO страница для товара "Сырная пицца"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 3,
  name: "Сырная пицца",
  price: 470,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_cheese.png"
}

export function SyrnayaPitstsaSEOPage() {
  return <ProductSEOTemplate product={product} page="syrnaya-pitstsa" />
}

export default SyrnayaPitstsaSEOPage
