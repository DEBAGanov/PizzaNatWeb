/**
 * @file: GavayskayaPitstsaSEOPage.tsx
 * @description: SEO страница для товара "Гавайская пицца"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 7,
  name: "Гавайская пицца",
  price: 480,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_gavaiyaskay.png"
}

export function GavayskayaPitstsaSEOPage() {
  return <ProductSEOTemplate product={product} page="gavayskaya-pitstsa" />
}

export default GavayskayaPitstsaSEOPage
