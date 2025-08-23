/**
 * @file: ZakrytayaPitstsaSyrnayaSEOPage.tsx
 * @description: SEO страница для товара "Закрытая пицца "Сырная""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 44,
  name: "Закрытая пицца \"Сырная\"",
  price: 170,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png"
}

export function ZakrytayaPitstsaSyrnayaSEOPage() {
  return <ProductSEOTemplate product={product} page="zakrytaya-pitstsa-syrnaya" />
}

export default ZakrytayaPitstsaSyrnayaSEOPage
