/**
 * @file: OptimizedImage.tsx
 * @description: Оптимизированный компонент изображений для мобильных устройств
 * @dependencies: Mantine Image
 * @created: 2025-01-26
 */

import { Image, Box } from '@mantine/core'
import { IconPizza } from '@tabler/icons-react'

interface OptimizedImageProps {
  src?: string
  alt: string
  fallbackSrc?: string
  aspectRatio?: string
  height?: number | string
  radius?: string | number
  fallbackIcon?: React.ReactNode
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  aspectRatio = '1 / 1', // Квадратное соотношение по умолчанию
  height,
  radius = 'md',
  fallbackIcon = <IconPizza size={48} color="#ff8000" />,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const containerStyles = {
    position: 'relative' as const,
    width: '100%',
    height: height || '100%',
    overflow: 'hidden',
    borderRadius: `var(--mantine-radius-${radius})`,
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  if (!src) {
    return (
      <Box 
        style={{
          ...containerStyles,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {fallbackIcon}
      </Box>
    )
  }

  return (
    <Box 
      className="optimized-image-container"
      style={containerStyles}
    >
      <Image
        src={src}
        alt={alt}
        className="optimized-image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          objectPosition: 'center',
          borderRadius: `var(--mantine-radius-${radius})`
        }}
        fallbackSrc={fallbackSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff8000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"}
      />
    </Box>
  )
}

// Готовые варианты для разных случаев использования
export function CategoryImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <Box className="category-image">
      <OptimizedImage
        src={src}
        alt={alt}
        objectFit="cover"
        fallbackIcon={<IconPizza size={32} color="#ff8000" />}
      />
    </Box>
  )
}

export function ProductCardImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <Box className="product-card-image">
      <OptimizedImage
        src={src}
        alt={alt}
        objectFit="cover"
        fallbackIcon={<IconPizza size={32} color="#ccc" />}
      />
    </Box>
  )
}

export function ProductDetailImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <Box className="product-detail-image">
      <OptimizedImage
        src={src}
        alt={alt}
        objectFit="cover"
        fallbackIcon={<IconPizza size={60} color="#ccc" />}
      />
    </Box>
  )
}