/**
 * @file: YandexReviewsWidget.tsx
 * @description: Переиспользуемый компонент виджета отзывов Яндекс Карт для ДИМБО Пицца
 * @dependencies: Mantine UI
 * @created: 2025-01-27
 */

import React from 'react'
import { Box, Title, Anchor } from '@mantine/core'

interface YandexReviewsWidgetProps {
  title?: string
  showTitle?: boolean
  maxWidth?: number | string
  height?: number | string
  className?: string
}

/**
 * Виджет отзывов Яндекс Карт для ДИМБО Пицца
 */
export const YandexReviewsWidget: React.FC<YandexReviewsWidgetProps> = ({
  title = "Отзывы о ДИМБО Пицца",
  showTitle = true,
  maxWidth = 560,
  height = 800,
  className
}) => {
  return (
    <Box className={className} mt="xl" mb="xl">
      {showTitle && (
        <Title order={3} ta="center" mb="md" c="orange.7">
          {title}
        </Title>
      )}
      
      <Box
        style={{
          width: '100%',
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          height: typeof height === 'number' ? `${height}px` : height,
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto',
          // Адаптивность для мобильных устройств
          '@media (max-width: 768px)': {
            maxWidth: '100%',
            height: '600px'
          }
        }}
      >
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #e6e6e6',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
          src="https://yandex.ru/maps-reviews-widget/188302222909?comments"
          title="Отзывы ДИМБО Пицца на Яндекс Картах"
          loading="lazy"
          allow="geolocation"
        />
        
        <Anchor
          href="https://yandex.ru/maps/org/dimbo/188302222909/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            boxSizing: 'border-box',
            textDecoration: 'none',
            color: '#b3b3b3',
            fontSize: '10px',
            fontFamily: 'YS Text, sans-serif',
            padding: '0 16px',
            position: 'absolute',
            bottom: '8px',
            width: '100%',
            textAlign: 'center',
            left: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxHeight: '14px',
            whiteSpace: 'nowrap'
          }}
        >
          Димбо на карте Волжска — Яндекс Карты
        </Anchor>
      </Box>
    </Box>
  )
}

export default YandexReviewsWidget
