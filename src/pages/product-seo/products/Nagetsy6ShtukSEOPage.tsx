/**
 * @file: Nagetsy6ShtukSEOPage.tsx
 * @description: SEO страница для товара "Нагецы 6 штук"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 30,
  name: "Нагецы 6 штук",
  price: 599,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/nagets.png"
}

export function Nagetsy6ShtukSEOPage() {
  return <ProductSEOTemplate product={product} page="nagetsy-6-shtuk" />
}

export default Nagetsy6ShtukSEOPage
