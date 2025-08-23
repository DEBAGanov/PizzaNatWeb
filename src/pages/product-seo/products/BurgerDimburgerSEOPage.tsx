/**
 * @file: BurgerDimburgerSEOPage.tsx
 * @description: SEO страница для товара "Бургер "Димбургер""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 13,
  name: "Бургер \"Димбургер\"",
  price: 220,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_classic.png"
}

export function BurgerDimburgerSEOPage() {
  return <ProductSEOTemplate product={product} page="burger-dimburger" />
}

export default BurgerDimburgerSEOPage
