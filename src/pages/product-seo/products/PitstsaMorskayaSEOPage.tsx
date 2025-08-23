/**
 * @file: PitstsaMorskayaSEOPage.tsx
 * @description: SEO страница для товара "Пицца Морская"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 10,
  name: "Пицца Морская",
  price: 510,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_karbonara.png"
}

export function PitstsaMorskayaSEOPage() {
  return <ProductSEOTemplate product={product} page="pitstsa-morskaya" />
}

export default PitstsaMorskayaSEOPage
