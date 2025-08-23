/**
 * @file: Krylya6ShtukSEOPage.tsx
 * @description: SEO страница для товара "Крылья 6 штук"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 35,
  name: "Крылья 6 штук",
  price: 679,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/chiken.png"
}

export function Krylya6ShtukSEOPage() {
  return <ProductSEOTemplate product={product} page="krylya-6-shtuk" />
}

export default Krylya6ShtukSEOPage
