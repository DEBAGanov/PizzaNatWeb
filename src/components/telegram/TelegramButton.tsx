/**
 * @file: TelegramButton.tsx
 * @description: Адаптивная кнопка для Telegram Web App и обычного веба
 * @dependencies: Mantine, useTelegram
 * @created: 2025-01-24
 */

import React, { useEffect } from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useTelegram } from '../../contexts/TelegramContext'

interface TelegramButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: (e?: React.MouseEvent) => void
  telegramButtonType?: 'main' | 'secondary' | 'regular'
  hapticFeedback?: 'light' | 'medium' | 'heavy' | 'none'
  telegramText?: string // Отдельный текст для Telegram (если отличается)
}

export const TelegramButton: React.FC<TelegramButtonProps> = ({
  children,
  onClick,
  telegramButtonType = 'regular',
  hapticFeedback = 'light',
  telegramText,
  disabled = false,
  variant = 'filled',
  color = 'orange',
  size = 'md',
  fullWidth = false,
  ...buttonProps
}) => {
  const {
    isInTelegram,
    showMainButton,
    hideMainButton,
    showSecondaryButton,
    hideSecondaryButton,
    hapticFeedback: tgHaptic
  } = useTelegram()

  const buttonText = telegramText || (typeof children === 'string' ? children : 'Кнопка')

  // Обработчик клика с haptic feedback
  const handleClick = (e?: React.MouseEvent) => {
    if (hapticFeedback !== 'none') {
      tgHaptic.impact(hapticFeedback)
    }
    if (onClick) {
      onClick(e)
    }
  }

  useEffect(() => {
    if (isInTelegram && telegramButtonType !== 'regular' && !disabled) {
      if (telegramButtonType === 'main') {
        showMainButton(buttonText, handleClick)
      } else if (telegramButtonType === 'secondary') {
        showSecondaryButton(buttonText, handleClick)
      }

      // Cleanup при размонтировании
      return () => {
        if (telegramButtonType === 'main') {
          hideMainButton()
        } else if (telegramButtonType === 'secondary') {
          hideSecondaryButton()
        }
      }
    }
  }, [isInTelegram, telegramButtonType, buttonText, disabled])

  // В Telegram не рендерим main/secondary кнопки (они отображаются нативно)
  if (isInTelegram && telegramButtonType !== 'regular') {
    return null
  }

  // Обычная кнопка для веба или regular кнопки в Telegram
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      className="telegram-button-mobile"
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

// Специализированные компоненты для удобства
export const TelegramMainButton: React.FC<Omit<TelegramButtonProps, 'telegramButtonType'>> = (props) => (
  <TelegramButton {...props} telegramButtonType="main" />
)

export const TelegramSecondaryButton: React.FC<Omit<TelegramButtonProps, 'telegramButtonType'>> = (props) => (
  <TelegramButton {...props} telegramButtonType="secondary" />
)

// Кнопка заказа для корзины/чекаута
export const OrderButton: React.FC<{
  total: number
  itemsCount: number
  onClick: (e?: React.MouseEvent) => void
  disabled?: boolean
}> = ({ total, itemsCount, onClick, disabled = false }) => {
  const { isInTelegram } = useTelegram()

  const buttonText = `Заказать (${itemsCount} шт.) — ${total}₽`

  if (isInTelegram) {
    return (
      <TelegramMainButton
        onClick={onClick}
        disabled={disabled}
        telegramText={buttonText}
        hapticFeedback="medium"
      >
        {buttonText}
      </TelegramMainButton>
    )
  }

  return (
    <TelegramButton
      onClick={onClick}
      disabled={disabled}
      fullWidth
      size="lg"
      color="orange"
      telegramButtonType="regular"
      hapticFeedback="medium"
    >
      {buttonText}
    </TelegramButton>
  )
}

// Кнопка добавления в корзину для товара
export const AddToCartButton: React.FC<{
  productName: string
  price: number
  onClick: (e?: React.MouseEvent) => void
  disabled?: boolean
  inCart?: boolean
}> = ({ productName, price, onClick, disabled = false, inCart = false }) => {
  const buttonText = inCart ? 'В корзине' : `Добавить — ${price}₽`

  const handleClick = (e: React.MouseEvent) => {
    console.log('🖱️ Клик по кнопке добавления:', { productName, price, inCart, disabled })
    if (!disabled && !inCart) {
      onClick(e)
    }
  }

  return (
    <TelegramButton
      onClick={handleClick}
      disabled={disabled || inCart}
      fullWidth
      variant={inCart ? 'light' : 'filled'}
      color={inCart ? 'green' : 'orange'}
      telegramButtonType="regular"
      hapticFeedback={inCart ? 'none' : 'light'}
    >
      {buttonText}
    </TelegramButton>
  )
}