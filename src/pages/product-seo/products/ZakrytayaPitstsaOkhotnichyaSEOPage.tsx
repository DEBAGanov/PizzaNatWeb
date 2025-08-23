/**
 * @file: ZakrytayaPitstsaOkhotnichyaSEOPage.tsx
 * @description: SEO страница для товара "Закрытая пицца "Охотничья""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 43,
  name: "Закрытая пицца \"Охотничья\"",
  price: 170,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png"
}

export function ZakrytayaPitstsaOkhotnichyaSEOPage() {
  return <ProductSEOTemplate product={product} page="zakrytaya-pitstsa-okhotnichya" />
}

export default ZakrytayaPitstsaOkhotnichyaSEOPage
