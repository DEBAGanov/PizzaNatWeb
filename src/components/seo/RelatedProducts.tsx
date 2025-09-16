/**
 * @file: RelatedProducts.tsx
 * @description: Компонент для отображения связанных продуктов и перекрестных ссылок между SEO-страницами
 * @dependencies: Mantine, React Router
 * @created: 2025-01-27
 */

import React from 'react'
import { Card, Title, SimpleGrid, Button, Group, Text, Badge } from '@mantine/core'
import { IconPizza, IconFish, IconGrill, IconBurger, IconMeat, IconCarrot } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

interface RelatedProduct {
  id: string
  title: string
  description: string
  url: string
  icon: React.ReactNode
  color: string
  badge?: string
}

interface RelatedProductsProps {
  currentProduct: string
  variant?: 'compact' | 'full'
}

export function RelatedProducts({ currentProduct, variant = 'full' }: RelatedProductsProps) {
  const allProducts: RelatedProduct[] = [
    {
      id: 'pizza',
      title: 'Заказать пиццу',
      description: 'Горячая пицца с доставкой на дом',
      url: '/zakazat-pizzu',
      icon: <IconPizza size={24} />,
      color: 'orange',
      badge: 'Популярно'
    },
    {
      id: 'sushi',
      title: 'Заказать суши',
      description: 'Свежие суши и роллы',
      url: '/zakazat-sushi',
      icon: <IconFish size={24} />,
      color: 'blue',
      badge: 'Свежее'
    },
    {
      id: 'shashlyk',
      title: 'Заказать шашлык',
      description: 'Сочный шашлык на углях',
      url: '/zakazat-shashlyk',
      icon: <IconGrill size={24} />,
      color: 'red',
      badge: 'На углях'
    },
    {
      id: 'burgers',
      title: 'Заказать бургеры',
      description: 'Сочные бургеры с картофелем',
      url: '/zakazat-burgery',
      icon: <IconBurger size={24} />,
      color: 'yellow'
    },
    {
      id: 'wings',
      title: 'Заказать крылышки',
      description: 'Острые куриные крылышки',
      url: '/zakazat-krylyshki',
      icon: <IconMeat size={24} />,
      color: 'grape'
    },
    {
      id: 'fries',
      title: 'Заказать картофель фри',
      description: 'Хрустящий картофель фри',
      url: '/zakazat-kartoshku-fri',
      icon: <IconCarrot size={24} />,
      color: 'yellow'
    },
    {
      id: 'nuggets',
      title: 'Заказать нагетсы',
      description: 'Хрустящие куриные нагетсы',
      url: '/zakazat-nagetsy',
      icon: <IconMeat size={24} />,
      color: 'orange'
    }
  ]

  // Определяем связанные продукты для каждого типа
  const getRelatedProducts = (current: string): RelatedProduct[] => {
    const relationships: Record<string, string[]> = {
      'pizza': ['sushi', 'burgers', 'wings'], // К пицце подходят суши, бургеры, крылышки
      'sushi': ['pizza', 'fries', 'wings'],   // К суши подходят пицца, картофель, крылышки
      'shashlyk': ['pizza', 'fries', 'burgers'], // К шашлыку подходят пицца, картофель, бургеры
      'burgers': ['pizza', 'fries', 'wings'], // К бургерам подходят пицца, картофель, крылышки
      'wings': ['pizza', 'burgers', 'nuggets'], // К крылышкам подходят пицца, бургеры, нагетсы
      'fries': ['burgers', 'wings', 'nuggets'], // К картофелю подходят бургеры, крылышки, нагетсы
      'nuggets': ['burgers', 'wings', 'fries'] // К нагетсам подходят бургеры, крылышки, картофель
    }

    const relatedIds = relationships[current] || []
    return allProducts.filter(product => relatedIds.includes(product.id))
  }

  const relatedProducts = getRelatedProducts(currentProduct)

  if (relatedProducts.length === 0) return null

  const CompactView = () => (
    <Group justify="center" gap="md">
      {relatedProducts.slice(0, 3).map((product) => (
        <Button
          key={product.id}
          component={Link}
          to={product.url}
          variant="light"
          color={product.color}
          leftSection={product.icon}
          size="sm"
        >
          {product.title.replace('Заказать ', '')}
        </Button>
      ))}
    </Group>
  )

  const FullView = () => (
    <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
      <Title order={3} c="dark" mb="md" ta="center">
        Часто заказывают вместе
      </Title>
      <Text size="sm" c="dimmed" ta="center" mb="lg">
        Дополните ваш заказ популярными блюдами
      </Text>
      
      <SimpleGrid 
        cols={{ base: 1, sm: 2, md: 3 }} 
        spacing="md"
      >
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            shadow="xs"
            radius="md"
            withBorder
            p="md"
            component={Link}
            to={product.url}
            style={{ 
              textDecoration: 'none', 
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Group justify="space-between" mb="xs">
              <Group gap="xs">
                <div style={{ color: `var(--mantine-color-${product.color}-6)` }}>
                  {product.icon}
                </div>
                <Title order={5} size="sm" c={`${product.color}.7`}>
                  {product.title}
                </Title>
              </Group>
              {product.badge && (
                <Badge size="xs" color={product.color} variant="light">
                  {product.badge}
                </Badge>
              )}
            </Group>
            
            <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
              {product.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {/* Дополнительные быстрые ссылки */}
      <Group justify="center" mt="lg" gap="xs">
        <Text size="sm" c="dimmed">Также популярно:</Text>
        {allProducts
          .filter(p => !relatedProducts.find(rp => rp.id === p.id) && p.id !== currentProduct)
          .slice(0, 2)
          .map((product) => (
            <Button
              key={product.id}
              component={Link}
              to={product.url}
              variant="subtle"
              color={product.color}
              size="xs"
            >
              {product.title.replace('Заказать ', '')}
            </Button>
          ))
        }
      </Group>
    </Card>
  )

  return variant === 'compact' ? <CompactView /> : <FullView />
}

// Компонент для показа всех категорий (для главной страницы)
export function AllProductsLinks() {
  const allProducts: RelatedProduct[] = [
    {
      id: 'pizza',
      title: 'Пицца',
      description: 'Доставка пиццы на дом',
      url: '/dostavka-pizzy',
      icon: <IconPizza size={32} />,
      color: 'orange'
    },
    {
      id: 'sushi',
      title: 'Суши и роллы',
      description: 'Доставка суши и роллов',
      url: '/dostavka-sushi',
      icon: <IconFish size={32} />,
      color: 'blue'
    },
    {
      id: 'shashlyk',
      title: 'Шашлык',
      description: 'Доставка шашлыка на углях',
      url: '/dostavka-shashlyka',
      icon: <IconGrill size={32} />,
      color: 'red'
    },
    {
      id: 'burgers',
      title: 'Бургеры',
      description: 'Доставка бургеров и картофеля',
      url: '/dostavka-burgerov',
      icon: <IconBurger size={32} />,
      color: 'yellow'
    }
  ]

  return (
    <Card shadow="sm" radius="md" withBorder p={{ base: 'md', sm: 'xl' }} bg="blue.0">
      <Title order={2} c="dark" mb="md" ta="center" size={{ base: 'h3', sm: 'h2' }}>
        Доставка еды в Волжске
      </Title>
      <Text size={{ base: 'md', sm: 'lg' }} c="dimmed" ta="center" mb="xl">
        Заказать с доставкой на дом за 30-60 минут
      </Text>
      
      {/* Flexbox контейнер для адаптивного отображения */}
      <div className="mobile-flex-container mobile-delivery-blocks">
        {allProducts.map((product) => (
          <Card
            key={product.id}
            shadow="xs"
            radius="md"
            withBorder
            p={{ base: 'sm', sm: 'md' }}
            component={Link}
            to={product.url}
            bg="white"
            className="mobile-flex-item mobile-delivery-block"
            style={{ 
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              if (window.innerWidth > 768) {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex-column-center" style={{ height: '100%', gap: '8px' }}>
              <div className="flex-center" style={{ 
                color: `var(--mantine-color-${product.color}-6)`,
                marginBottom: '8px'
              }}>
                {React.isValidElement(product.icon) 
                  ? React.cloneElement(product.icon as React.ReactElement<any>, { 
                      size: window.innerWidth < 480 ? 24 : 32 
                    })
                  : product.icon
                }
              </div>
              
              <Title 
                order={4} 
                ta="center" 
                c={`${product.color}.7`} 
                mb="xs"
                size={{ base: 'sm', sm: 'md' }}
                className="mobile-delivery-block-title"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%'
                }}
              >
                {product.title}
              </Title>
              
              <Text 
                size={{ base: 'xs', sm: 'sm' }} 
                ta="center" 
                c="dimmed"
                className="mobile-delivery-block-text"
              >
                {window.innerWidth < 480 ? 
                  product.description.replace('Доставка ', '') : 
                  product.description
                }
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
