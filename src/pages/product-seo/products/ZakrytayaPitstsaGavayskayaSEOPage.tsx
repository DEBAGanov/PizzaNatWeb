/**
 * @file: ZakrytayaPitstsaGavayskayaSEOPage.tsx
 * @description: SEO страница для товара "Закрытая пицца "Гавайская""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 45,
  name: "Закрытая пицца \"Гавайская\"",
  price: 180,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png"
}

export function ZakrytayaPitstsaGavayskayaSEOPage() {
  return <ProductSEOTemplate product={product} page="zakrytaya-pitstsa-gavayskaya" />
}

export default ZakrytayaPitstsaGavayskayaSEOPage
