/**
 * @file: KidsMenu.tsx
 * @description: Компонент детского меню для SEO-страниц
 * @dependencies: Mantine, ProductCard
 * @created: 2025-01-27
 */

import React, { useEffect, useState } from 'react'
import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Button,
  Group,
  SimpleGrid,
  Badge,
  Alert,
  Box
} from '@mantine/core'
import {
  IconPizza,
  IconShoppingCart,
  IconHeart,
  IconStars,
  IconCake
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../contexts/ProductsContext'
import { ProductCardImage } from '../common/OptimizedImage'

interface KidsMenuProps {
  showTitle?: boolean
  maxProducts?: number
}

// Список ID продуктов, подходящих для детей
const KIDS_FRIENDLY_PRODUCTS = [
  1, // Пицца Маргарита
  2, // Грибная пицца
  4, // Гавайская пицца  
  6, // Домашняя пицца
  10, // Сырная пицца
  11, // Бургер Димбургер
  12, // Бургер Чикенбургер
  15, // Картофель фри 100гр
  16, // Картофель фри 150гр
  17, // Нагетсы 6 штук
  18, // Нагетсы 9 штук
  19, // Нагетсы 12 штук
]

export const KidsMenu: React.FC<KidsMenuProps> = ({ 
  showTitle = true, 
  maxProducts = 8 
}) => {
  const navigate = useNavigate()
  const { products, loadProducts, productsLoading } = useProducts()
  const [kidsProducts, setKidsProducts] = useState<any[]>([])

  useEffect(() => {
    // Загружаем продукты если их еще нет
    if (!products || products.length === 0) {
      loadProducts({ size: 50, page: 0 })
    }
  }, [products, loadProducts])

  useEffect(() => {
    // Фильтруем продукты для детей
    if (products && products.length > 0) {
      const filtered = products
        .filter(product => KIDS_FRIENDLY_PRODUCTS.includes(product.id))
        .slice(0, maxProducts)
      setKidsProducts(filtered)
    }
  }, [products, maxProducts])

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`)
  }

  const handleOrderClick = () => {
    window.open('https://max.ru/id121603899498_bot', '_blank')
  }

  if (productsLoading) {
    return (
      <Card shadow="sm" radius="md" withBorder p="xl">
        <Text ta="center">Загрузка детского меню...</Text>
      </Card>
    )
  }

  return (
    <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
      <Stack gap="lg">
        {showTitle && (
          <Group justify="center">
            <IconPizza size={32} color="orange" />
            <Title order={2} ta="center" c="orange.7">
              🍕 Детское меню на день рождения
            </Title>
            <IconCake size={32} color="orange" />
          </Group>
        )}

        <Text size="lg" ta="center" c="dark.6">
          Не нужно готовить на день рождения! Закажите вкусную пиццу, нагетсы и картошку фри. 
          Дети будут в восторге, а вы сможете наслаждаться праздником!
        </Text>

        <Alert color="green" variant="light" icon={<IconHeart size={20} />}>
          <Text fw={600}>Почему дети любят нашу еду?</Text>
          <Text size="sm">
            ✨ Свежие ингредиенты • 🧀 Много сыра • 🍖 Сочное мясо • 🥔 Хрустящая картошка
          </Text>
        </Alert>

        {kidsProducts.length > 0 ? (
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
            {kidsProducts.map((product) => (
              <Card 
                key={product.id} 
                shadow="sm" 
                radius="md" 
                withBorder 
                p="sm"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)}
              >
                <Stack gap="xs">
                  <Box pos="relative">
                    <ProductCardImage
                      src={product.imageUrl}
                      alt={product.name}
                      h={120}
                      style={{ objectFit: 'cover' }}
                    />
                    {(product.name.toLowerCase().includes('пицца') || 
                      product.name.toLowerCase().includes('нагетсы')) && (
                      <Badge 
                        size="sm" 
                        color="pink" 
                        pos="absolute" 
                        top={5} 
                        right={5}
                      >
                        ХИТ
                      </Badge>
                    )}
                  </Box>
                  
                  <Stack gap={4}>
                    <Text fw={600} size="sm" lineClamp={2}>
                      {product.name}
                    </Text>
                    <Group justify="space-between" align="center">
                      <Text fw={700} c="orange.7" size="lg">
                        {product.price}₽
                      </Text>
                      <IconStars size={16} color="orange" />
                    </Group>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text ta="center" c="dimmed">
            Детское меню загружается...
          </Text>
        )}

        <Group justify="center" gap="md">
          <Button
            size="lg"
            color="orange"
            leftSection={<IconShoppingCart size={20} />}
            onClick={handleOrderClick}
          >
            Заказать детское меню
          </Button>
          <Button
            size="lg"
            variant="outline"
            color="green"
            component="a"
            href="tel:+79021053434"
          >
            Позвонить: +7(902)105-34-34
          </Button>
        </Group>

        <Box bg="yellow.0" p="md" radius="md">
          <Group justify="center" gap="md">
            <IconCake size={24} color="orange" />
            <Stack gap={4} style={{ flex: 1 }}>
              <Text fw={600} c="orange.7" ta="center">
                💡 Совет: Комбо для детского дня рождения
              </Text>
              <Text size="sm" ta="center" c="dark.6">
                Пицца Маргарита + Нагетсы 9шт + Картофель фри 150гр = Счастливые дети! 🎉
              </Text>
            </Stack>
          </Group>
        </Box>

        <Text size="sm" ta="center" c="dimmed" fs="italic">
          Все блюда готовятся из свежих ингредиентов и подходят для детей от 3 лет
        </Text>
      </Stack>
    </Card>
  )
}
