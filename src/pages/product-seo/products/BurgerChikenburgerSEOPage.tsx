/**
 * @file: BurgerChikenburgerSEOPage.tsx
 * @description: SEO страница для товара "Бургер "Чикенбургер""
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from '../ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: 15,
  name: "Бургер \"Чикенбургер\"",
  price: 180,
  imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_hawaiian.png"
}

export function BurgerChikenburgerSEOPage() {
  return <ProductSEOTemplate product={product} page="burger-chikenburger" />
}

export default BurgerChikenburgerSEOPage
