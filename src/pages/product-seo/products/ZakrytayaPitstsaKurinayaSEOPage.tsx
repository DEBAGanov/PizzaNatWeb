/**
 * @file: ZakrytayaPitstsaKurinayaSEOPage.tsx
 * @description: SEO страница для товара "Закрытая пицца "Куриная""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 42,
  name: "Закрытая пицца \"Куриная\"",
  price: 170,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png"
}

export function ZakrytayaPitstsaKurinayaSEOPage() {
  return <ProductSEOTemplate product={product} page="zakrytaya-pitstsa-kurinaya" />
}

export default ZakrytayaPitstsaKurinayaSEOPage
