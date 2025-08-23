/**
 * @file: PitstsaPepperoniSEOPage.tsx
 * @description: SEO страница для товара "Пицца Пепперони"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 5,
  name: "Пицца Пепперони",
  price: 470,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_peperoni.png"
}

export function PitstsaPepperoniSEOPage() {
  return <ProductSEOTemplate product={product} page="pitstsa-pepperoni" />
}

export default PitstsaPepperoniSEOPage
