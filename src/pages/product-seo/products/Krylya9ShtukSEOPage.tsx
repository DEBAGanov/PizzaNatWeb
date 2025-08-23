/**
 * @file: Krylya9ShtukSEOPage.tsx
 * @description: SEO страница для товара "Крылья 9 штук"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 36,
  name: "Крылья 9 штук",
  price: 679,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/chiken.png"
}

export function Krylya9ShtukSEOPage() {
  return <ProductSEOTemplate product={product} page="krylya-9-shtuk" />
}

export default Krylya9ShtukSEOPage
