/**
 * @file: DomashnyayaPitstsaSEOPage.tsx
 * @description: SEO страница для товара "Домашняя пицца"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 9,
  name: "Домашняя пицца",
  price: 480,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_5_chees.png"
}

export function DomashnyayaPitstsaSEOPage() {
  return <ProductSEOTemplate product={product} page="domashnyaya-pitstsa" />
}

export default DomashnyayaPitstsaSEOPage
