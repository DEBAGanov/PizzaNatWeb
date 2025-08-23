/**
 * @file: PitstsaMargaritaSEOPage.tsx
 * @description: SEO страница для товара "Пицца Маргарита"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 1,
  name: "Пицца Маргарита",
  price: 380,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_margarita.png"
}

export function PitstsaMargaritaSEOPage() {
  return <ProductSEOTemplate product={product} page="pitstsa-margarita" />
}

export default PitstsaMargaritaSEOPage
