/**
 * @file: PitstsaTsezarSEOPage.tsx
 * @description: SEO страница для товара "Пицца Цезарь"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 6,
  name: "Пицца Цезарь",
  price: 480,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_mario.png"
}

export function PitstsaTsezarSEOPage() {
  return <ProductSEOTemplate product={product} page="pitstsa-tsezar" />
}

export default PitstsaTsezarSEOPage
