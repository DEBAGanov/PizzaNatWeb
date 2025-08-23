/**
 * @file: KartofelFri150GrSEOPage.tsx
 * @description: SEO страница для товара "Картофель Фри 150 гр."
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 29,
  name: "Картофель Фри 150 гр.",
  price: 499,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/free.png"
}

export function KartofelFri150GrSEOPage() {
  return <ProductSEOTemplate product={product} page="kartofel-fri-150-gr" />
}

export default KartofelFri150GrSEOPage
