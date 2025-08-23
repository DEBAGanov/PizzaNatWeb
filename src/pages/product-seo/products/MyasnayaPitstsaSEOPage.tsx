/**
 * @file: MyasnayaPitstsaSEOPage.tsx
 * @description: SEO страница для товара "Мясная пицца"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 8,
  name: "Мясная пицца",
  price: 500,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_mzysnay.png"
}

export function MyasnayaPitstsaSEOPage() {
  return <ProductSEOTemplate product={product} page="myasnaya-pitstsa" />
}

export default MyasnayaPitstsaSEOPage
