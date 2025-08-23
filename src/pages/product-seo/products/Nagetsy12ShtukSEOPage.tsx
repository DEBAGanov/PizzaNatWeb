/**
 * @file: Nagetsy12ShtukSEOPage.tsx
 * @description: SEO страница для товара "Нагецы 12 штук"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 32,
  name: "Нагецы 12 штук",
  price: 599,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/nagets.png"
}

export function Nagetsy12ShtukSEOPage() {
  return <ProductSEOTemplate product={product} page="nagetsy-12-shtuk" />
}

export default Nagetsy12ShtukSEOPage
