/**
 * @file: PitstsaSalyamiSEOPage.tsx
 * @description: SEO страница для товара "Пицца Салями"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 4,
  name: "Пицца Салями",
  price: 490,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_peperoni.png"
}

export function PitstsaSalyamiSEOPage() {
  return <ProductSEOTemplate product={product} page="pitstsa-salyami" />
}

export default PitstsaSalyamiSEOPage
