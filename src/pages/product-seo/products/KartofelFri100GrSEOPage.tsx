/**
 * @file: KartofelFri100GrSEOPage.tsx
 * @description: SEO страница для товара "Картофель Фри 100 гр."
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 28,
  name: "Картофель Фри 100 гр.",
  price: 499,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/free.png"
}

export function KartofelFri100GrSEOPage() {
  return <ProductSEOTemplate product={product} page="kartofel-fri-100-gr" />
}

export default KartofelFri100GrSEOPage
