/**
 * @file: CheckoutPage.tsx
 * @description: Страница оформления заказа с выбором доставки и способа оплаты
 * @dependencies: Mantine, ProductsContext, AuthContext, API тесты
 * @created: 2025-01-24
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Card,
  Text,
  Group,
  Button,
  TextInput,
  Autocomplete,
  Textarea,
  Radio,
  Stepper,
  Paper,
  Badge,
  Alert,
  Loader,
  Center,
  Divider,
  ActionIcon,
  Select,
  ThemeIcon,
  SimpleGrid,
  Box
} from '@mantine/core'
import {
  IconArrowLeft,
  IconCreditCard,
  IconCash,
  IconTruck,
  IconMapPin,
  IconPhone,
  IconUser,
  IconInfoCircle,
  IconCheck,
  IconAlertTriangle,
  IconBrandTelegram
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import { YandexReviewsWidget } from '../components/common/YandexReviewsWidget'
import { useAuth } from '../contexts/AuthContext'
import { notifications } from '@mantine/notifications'
import { getAuthToken } from '../services/api'
import { productsApi } from '../services/productsApi'
import { useYandexMetrika } from '../components/analytics/YandexMetrika'
import { cartItemsToEcommerce } from '../utils/ecommerceHelpers'
import type { CartItem, AddressSuggestion, DeliveryEstimate as DeliveryEstimateType, CreateOrderRequest } from '../types/products'

// Используем импортированный тип DeliveryEstimateType как DeliveryEstimate
type DeliveryEstimate = DeliveryEstimateType

interface OrderData {
  deliveryAddress?: string
  deliveryLocationId?: number
  contactName: string
  contactPhone: string
  comment?: string
  notes?: string
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { state: { cart, cartLoading }, loadCart } = useProducts()

  // Аналитика
  const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || '103585127'
  const { trackCheckoutStart, trackPurchase, trackPaymentMethod } = useYandexMetrika(YANDEX_METRIKA_ID)
  
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [deliveryEstimate, setDeliveryEstimate] = useState<DeliveryEstimate | null>(null)
  const [estimateLoading, setEstimateLoading] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
  const [addressLoading, setAddressLoading] = useState(false)
  
  // Данные формы
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery')
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'sbp'>('sbp')
  // Загружаем сохраненный адрес пользователя
  const getSavedAddress = () => {
    try {
      const savedAddress = localStorage.getItem(`user_address_${user?.id}`)
      return savedAddress || ''
    } catch {
      return ''
    }
  }

  const [orderData, setOrderData] = useState<OrderData>({
    contactName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
    contactPhone: user?.phone || '',
    deliveryAddress: getSavedAddress(),
    comment: ''
  })

  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Отслеживаем начало оформления заказа при загрузке корзины
  useEffect(() => {
    if (cart && cart.items.length > 0) {
      const ecommerceProducts = cartItemsToEcommerce(cart.items, { list: "Оформление заказа" })
      trackCheckoutStart(ecommerceProducts, 1)
    }
  }, [cart?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Автоматический расчет доставки для сохраненного адреса
  useEffect(() => {
    const savedAddress = getSavedAddress()
    if (savedAddress && cart && deliveryType === 'delivery') {
      console.log('🏠 Найден сохраненный адрес, рассчитываем доставку:', savedAddress)
      calculateDelivery(savedAddress)
    }
  }, [cart, deliveryType]) // eslint-disable-line react-hooks/exhaustive-deps

  // Расчет доставки
  const calculateDelivery = async (address: string) => {
    if (!address.trim() || !cart) return

    setEstimateLoading(true)
    try {
      const estimate = await productsApi.estimateDelivery(address, cart.totalAmount)
      setDeliveryEstimate(estimate)
      console.log('🚚 Расчет доставки:', { address, orderAmount: cart.totalAmount, estimate })
    } catch (error) {
      console.error('Ошибка расчета доставки:', error)
      setDeliveryEstimate(null)
    } finally {
      setEstimateLoading(false)
    }
  }

  // Получение подсказок адресов
  const fetchAddressSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setAddressSuggestions([])
      return
    }

    setAddressLoading(true)
    try {
      const suggestions = await productsApi.getAddressSuggestions(query, 8)
      
      // Преобразуем ответ API в формат для Autocomplete
      const formattedSuggestions: AddressSuggestion[] = Array.isArray(suggestions) 
        ? suggestions.map((item: any) => {
            const typeLabel = item.metadata === 'house' ? '🏠' : item.metadata === 'street' ? '🛣️' : '📍'
            return {
              value: item.shortAddress || item.address || String(item),
              label: item.shortAddress || item.address || String(item),
              district: `${typeLabel} ${item.metadata === 'house' ? 'дом' : item.metadata === 'street' ? 'улица' : 'место'}`,
              city: item.city || 'Волжск',
              fullAddress: item.address
            }
          })
        : []
      
      setAddressSuggestions(formattedSuggestions)
    } catch (error) {
      console.error('Ошибка получения подсказок адресов:', error)
      setAddressSuggestions([])
    } finally {
      setAddressLoading(false)
    }
  }

  // Обработка изменения адреса
  const handleAddressChange = (value: string) => {
    setOrderData(prev => ({ ...prev, deliveryAddress: value }))
    
    // Получаем подсказки адресов
    if (value.trim().length >= 3) {
      const suggestionsTimeoutId = setTimeout(() => fetchAddressSuggestions(value), 300)
      // Очищаем предыдущий таймер подсказок
      return () => clearTimeout(suggestionsTimeoutId)
    }
    
    // Рассчитываем доставку с задержкой для полных адресов
    if (value.trim().length > 10) {
      const deliveryTimeoutId = setTimeout(() => calculateDelivery(value), 1000)
      // Очищаем предыдущий таймер доставки
      return () => clearTimeout(deliveryTimeoutId)
    }
  }

  // Форматирование телефона
  const formatPhone = (value: string) => {
    // Удаляем все нецифровые символы
    const numbers = value.replace(/\D/g, '')
    
    // Если начинается с 8, заменяем на 7
    let formatted = numbers.startsWith('8') ? '7' + numbers.slice(1) : numbers
    
    // Если не начинается с 7, добавляем 7
    if (!formatted.startsWith('7')) {
      formatted = '7' + formatted
    }
    
    // Ограничиваем до 11 цифр
    formatted = formatted.slice(0, 11)
    
    // Форматируем как +7 (XXX) XXX-XX-XX
    if (formatted.length >= 1) {
      formatted = '+7'
      if (numbers.length > 1) {
        const restNumbers = numbers.startsWith('7') ? numbers.slice(1) : numbers.startsWith('8') ? numbers.slice(1) : numbers
        if (restNumbers.length > 0) {
          formatted += ' (' + restNumbers.slice(0, 3)
          if (restNumbers.length > 3) {
            formatted += ') ' + restNumbers.slice(3, 6)
            if (restNumbers.length > 6) {
              formatted += '-' + restNumbers.slice(6, 8)
              if (restNumbers.length > 8) {
                formatted += '-' + restNumbers.slice(8, 10)
              }
            }
          } else {
            formatted += ')'
          }
        }
      }
    }
    
    return formatted
  }

  // Валидация телефона
  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '')
    return numbers.length === 11 && (numbers.startsWith('7') || numbers.startsWith('8'))
  }

  // Сохранение адреса пользователя
  const saveUserAddress = (address: string) => {
    if (user?.id && address.trim()) {
      try {
        localStorage.setItem(`user_address_${user.id}`, address)
        console.log('💾 Адрес сохранен:', address)
      } catch (error) {
        console.warn('Ошибка сохранения адреса:', error)
      }
    }
  }

  // Обработчик изменения телефона
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    setOrderData(prev => ({ ...prev, contactPhone: formatted }))
  }

  // Обработка выбора адреса из подсказок
  const handleAddressSelect = (selectedAddress: string) => {
    setOrderData(prev => ({ ...prev, deliveryAddress: selectedAddress }))
    setAddressSuggestions([]) // Очищаем подсказки после выбора
    
    // Сохраняем выбранный адрес
    saveUserAddress(selectedAddress)
    
    // Сразу рассчитываем доставку для выбранного адреса
    if (selectedAddress.trim().length > 10) {
      calculateDelivery(selectedAddress)
    }
  }

  // Преобразование телефона для API
  const getPhoneForApi = (formattedPhone: string) => {
    // Убираем все нецифровые символы
    const numbersOnly = formattedPhone.replace(/\D/g, '')
    // Возвращаем номер в формате 79001234567
    return numbersOnly
  }

  // Создание заказа
  const createOrder = async () => {
    if (!cart || cart.items.length === 0) {
      notifications.show({
        title: 'Ошибка',
        message: 'Корзина пуста',
        color: 'red'
      })
      return
    }

    if (!orderData.contactName.trim()) {
      notifications.show({
        title: 'Ошибка',
        message: 'Укажите ваше имя',
        color: 'red'
      })
      return
    }

    if (!orderData.contactPhone.trim() || !validatePhone(orderData.contactPhone)) {
      notifications.show({
        title: 'Ошибка',
        message: 'Укажите корректный номер телефона в формате +7 (XXX) XXX-XX-XX',
        color: 'red'
      })
      return
    }

    if (deliveryType === 'delivery' && !orderData.deliveryAddress) {
      notifications.show({
        title: 'Ошибка',
        message: 'Укажите адрес доставки',
        color: 'red'
      })
      return
    }

    // Отслеживаем выбор метода оплаты
    trackPaymentMethod(paymentMethod)
    
    setLoading(true)
    try {
      const requestData = deliveryType === 'delivery' 
        ? {
            deliveryAddress: orderData.deliveryAddress,
            contactName: orderData.contactName,
            contactPhone: getPhoneForApi(orderData.contactPhone),
            comment: orderData.comment || undefined,
            notes: `Оплата: ${paymentMethod === 'cash' ? 'Наличными курьеру' : 'СБП'}`,
            paymentMethod: paymentMethod === 'cash' ? 'CASH' as const : 'SBP' as const,
            deliveryType: 'Доставка курьером'
          }
        : {
            deliveryLocationId: 1, // Основной пункт выдачи
            contactName: orderData.contactName,
            contactPhone: getPhoneForApi(orderData.contactPhone),
            comment: orderData.comment || undefined,
            paymentMethod: paymentMethod === 'cash' ? 'CASH' as const : 'SBP' as const,
            deliveryType: 'Самовывоз'
          }

      const order = await productsApi.createOrder(requestData as CreateOrderRequest)
      
      // Отслеживаем завершение покупки
      const ecommerceProducts = cartItemsToEcommerce(cart.items, { list: "Оформление заказа" })
      const deliveryCost = deliveryEstimate?.deliveryCost || 0
      trackPurchase(order.id.toString(), ecommerceProducts, {
        revenue: cart.totalAmount + deliveryCost,
        shipping: deliveryCost,
        affiliation: "ДИМБО Пицца - Доставка пиццы"
      })
        
      if (paymentMethod === 'cash') {
        // Наличный заказ - сразу перенаправляем на страницу успеха
        notifications.show({
          title: 'Заказ оформлен!',
          message: `Заказ №${order.id} принят в обработку`,
          color: 'green'
        })
        navigate(`/order-success/${order.id}`)
      } else {
        // СБП - получаем ссылку оплаты и переходим на ЮКасса
        await redirectToPayment(order.id)
      }
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка',
        message: error.message || 'Не удалось создать заказ',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  // Переход на оплату ЮКасса
  const redirectToPayment = async (orderId: number) => {
    try {
      console.log('🔄 Начинаем процесс создания платежа для заказа:', orderId)
      
      // Сначала пробуем получить ссылку через orders/{id}/payment-url
      try {
        const data = await productsApi.getPaymentUrl(orderId)
        console.log('📋 Ответ от /orders/{id}/payment-url:', data)
        
        if (data.paymentUrl) {
          console.log('✅ Получена ссылка через orders endpoint:', data.paymentUrl)
          window.location.href = data.paymentUrl
          return
        }
      } catch (orderUrlError) {
        console.warn('⚠️ Endpoint /orders/{id}/payment-url не работает:', orderUrlError)
      }
      
      // Альтернативный метод: создаем платеж напрямую через yookassa/create
      console.log('🔄 Пробуем создать платеж напрямую через yookassa/create...')
      
      const paymentData = {
        orderId: orderId,
        method: paymentMethod === 'cash' ? 'CASH' : 'SBP',
        description: `Оплата заказа №${orderId} в ДИМБО Пицца`,
        returnUrl: `${window.location.origin}/order-success/${orderId}`
      }
      
      console.log('📋 Данные для создания платежа:', paymentData)
      
      // Используем метод создания платежа напрямую
      const paymentResponse = await productsApi.createYookassaPayment(paymentData)
      console.log('📋 Ответ от yookassa/create:', paymentResponse)
      
      // Извлекаем ссылку из ответа ЮКасса
      const confirmationUrl = paymentResponse.confirmation?.confirmation_url || paymentResponse.confirmation_url
      
      if (confirmationUrl) {
        console.log('✅ Получена ссылка от ЮКасса:', confirmationUrl)
        window.location.href = confirmationUrl
      } else {
        console.error('❌ Ответ не содержит ссылки для оплаты:', paymentResponse)
        throw new Error('Не получена ссылка для оплаты')
      }
      
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка оплаты',
        message: error.message || 'Не удалось получить ссылку для оплаты',
        color: 'red'
      })
      console.error('Ошибка получения ссылки оплаты:', error)
    }
  }

  // Проверка минимальной суммы заказа
      const isMinimumOrderMet = cart && cart.totalAmount >= 300

  if (cartLoading) {
    return (
      <Container size="md" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" color="orange" />
            <Text>Загрузка корзины...</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container size="md" py="xl">
        <Alert 
          icon={<IconAlertTriangle size={16} />} 
          title="Корзина пуста" 
          color="orange"
        >
          Добавьте товары в корзину перед оформлением заказа
          <Group mt="md">
            <Button variant="light" onClick={() => navigate('/menu')}>
              Перейти в меню
            </Button>
          </Group>
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        {/* Заголовок */}
        <Group>
          <ActionIcon 
            variant="light" 
            size="lg"
            onClick={() => navigate('/cart')}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Title order={1} c="orange.7">
            🛒 Оформление заказа
          </Title>
        </Group>

        {/* Проверка минимальной суммы */}
        {!isMinimumOrderMet && (
          <Alert 
            icon={<IconInfoCircle size={16} />} 
            title="Минимальная сумма заказа" 
            color="orange"
          >
            Минимальная сумма заказа составляет 300 ₽. 
                            Текущая сумма: {cart.totalAmount} ₽
          </Alert>
        )}

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
          {/* Форма оформления */}
          <Stack gap="lg">
            <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
              {/* Шаг 1: Доставка и контакты */}
              <Stepper.Step 
                label="Доставка и контакты" 
                description="Способ получения и ваши данные"
                icon={<IconTruck size={18} />}
              >
                <Stack gap="md">
                  <Radio.Group
                    value={deliveryType}
                    onChange={(value: any) => setDeliveryType(value)}
                  >
                    <Group mt="xs">
                      <Radio value="delivery" label="Доставка курьером" />
                      <Radio value="pickup" label="Самовывоз" />
                    </Group>
                  </Radio.Group>

                  {deliveryType === 'delivery' ? (
                    <Stack gap="md">
                      <Autocomplete
                        label="Адрес доставки"
                        placeholder="г. Волжск, ул. Ленина, д. 1, кв. 10"
                        value={orderData.deliveryAddress}
                        onChange={handleAddressChange}
                        onOptionSubmit={handleAddressSelect}
                        data={addressSuggestions.map(suggestion => ({
                          value: suggestion.value,
                          label: suggestion.district 
                            ? `${suggestion.label} (${suggestion.district})`
                            : suggestion.label
                        }))}
                        leftSection={<IconMapPin size={16} />}
                        rightSection={addressLoading ? <Loader size="xs" /> : null}
                        comboboxProps={{ 
                          shadow: 'md',
                          position: 'bottom',
                          middlewares: { flip: false, shift: false }
                        }}
                        limit={8}
                        maxDropdownHeight={200}
                        required
                      />
                      
                      {estimateLoading && (
                        <Group gap="xs">
                          <Loader size="xs" />
                          <Text size="sm" c="dimmed">Рассчитываем доставку...</Text>
                        </Group>
                      )}
                      
                      {deliveryEstimate && (
                        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
                          <Stack gap="xs">
                            <Text size="sm">
                              <strong>Район:</strong> {deliveryEstimate.zoneName}
                            </Text>
                            <Text size="sm">
                              <strong>Стоимость доставки:</strong> {
                                deliveryEstimate.baseCost 
                                  ? `${deliveryEstimate.baseCost} ₽${deliveryEstimate.isDeliveryFree ? ' (бесплатно от ' + deliveryEstimate.freeDeliveryThreshold + ' ₽)' : ''}`
                                  : deliveryEstimate.isDeliveryFree 
                                    ? 'Бесплатно' 
                                    : `${deliveryEstimate.deliveryCost} ₽`
                              }
                            </Text>
                            <Text size="sm">
                              <strong>Время доставки:</strong> {deliveryEstimate.estimatedTime}
                            </Text>
                          </Stack>
                        </Alert>
                      )}
                    </Stack>
                  ) : (
                    <Alert icon={<IconInfoCircle size={16} />} color="green" variant="light">
                      <Text size="sm">
                        <strong>Адрес:</strong> г. Волжск, ул. Шестакова, д.1Б
                      </Text>
                      <Text size="sm">
                        <strong>Режим работы:</strong> 10:00 - 20:00
                      </Text>
                      <Text size="sm">
                        <strong>Готовность:</strong> 15-25 минут
                      </Text>
                    </Alert>
                  )}

                  {/* Контактные данные */}
                  <Box mt="lg">
                    <Text size="sm" fw={600} mb="xs">Контактная информация</Text>
                    <Stack gap="md">
                      <TextInput
                        label="Имя"
                        placeholder="Введите ваше имя"
                        value={orderData.contactName}
                        onChange={(e) => setOrderData(prev => ({ ...prev, contactName: e.target.value }))}
                        leftSection={<IconUser size={16} />}
                        required
                      />
                      
                      <TextInput
                        label="Телефон"
                        placeholder="+7 (900) 123-45-67"
                        value={orderData.contactPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        leftSection={<IconPhone size={16} />}
                        error={orderData.contactPhone && !validatePhone(orderData.contactPhone) ? 'Неверный формат номера' : null}
                        required
                      />
                      
                      <Textarea
                        label="Комментарий к заказу"
                        placeholder="Дополнительные пожелания (необязательно)"
                        value={orderData.comment}
                        onChange={(e) => setOrderData(prev => ({ ...prev, comment: e.target.value }))}
                        minRows={3}
                      />
                    </Stack>
                  </Box>
                </Stack>
              </Stepper.Step>

              {/* Шаг 2: Способ оплаты */}
              <Stepper.Step 
                label="Оплата" 
                description="Выберите способ оплаты"
                icon={<IconCreditCard size={18} />}
              >
                <Stack gap="md">
                  <Radio.Group
                    value={paymentMethod}
                    onChange={(value: any) => setPaymentMethod(value)}
                  >
                    <Stack gap="sm">
                      <Radio 
                        value="sbp" 
                        label={
                          <Group gap="xs">
                            <IconBrandTelegram size={16} />
                            <Text>СБП (Система быстрых платежей)</Text>
                          </Group>
                        } 
                      />
                      <Radio 
                        value="cash" 
                        label={
                          <Group gap="xs">
                            <IconCash size={16} />
                            <Text>Наличными курьеру</Text>
                          </Group>
                        } 
                      />
                    </Stack>
                  </Radio.Group>

                  {paymentMethod !== 'cash' && (
                    <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
                      <Text size="sm">
                        После создания заказа вы будете перенаправлены на страницу оплаты ЮКасса
                      </Text>
                    </Alert>
                  )}
                </Stack>
              </Stepper.Step>
            </Stepper>

            {/* Навигация по шагам */}
            <Group justify="space-between" mt="xl">
              <Button 
                variant="default" 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
              >
                Назад
              </Button>
              
              {activeStep < 1 ? (
                <Button 
                  onClick={() => setActiveStep(prev => Math.min(1, prev + 1))}
                  color="orange"
                >
                  Далее
                </Button>
              ) : (
                <Button 
                  onClick={createOrder}
                  color="orange"
                  loading={loading}
                  disabled={!isMinimumOrderMet}
                  leftSection={<IconCheck size={18} />}
                >
                  Оформить заказ
                </Button>
              )}
            </Group>
          </Stack>

          {/* Итоги заказа - показываем только на шаге оплаты */}
          {activeStep === 1 && (
            <Paper shadow="sm" p="lg" radius="md" withBorder h="fit-content">
              <Stack gap="md">
                <Title order={3}>Ваш заказ</Title>
                
                <Divider />
                
                {/* Товары */}
                <Stack gap="sm">
                  {cart.items.slice(0, 3).map((item: CartItem) => (
                    <Group key={item.id} justify="space-between">
                      <div style={{ flex: 1 }}>
                        <Text size="sm" lineClamp={1}>{item.productName}</Text>
                        <Text size="xs" c="dimmed">{item.quantity} шт.</Text>
                      </div>
                      <Text size="sm" fw={600}>{item.subtotal} ₽</Text>
                    </Group>
                  ))}
                  
                  {cart.items.length > 3 && (
                    <Text size="sm" c="dimmed" ta="center">
                      ... и еще {cart.items.length - 3} товар(ов)
                    </Text>
                  )}
                </Stack>
                
                <Divider />
                
                {/* Итоги */}
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text>Товары ({cart.items.length})</Text>
                    <Text>{cart.totalAmount} ₽</Text>
                  </Group>
                  
                  <Group justify="space-between">
                    <Text>Доставка</Text>
                    <Text>
                      {deliveryType === 'pickup' 
                        ? 'Самовывоз' 
                        : deliveryEstimate?.baseCost
                          ? deliveryEstimate.isDeliveryFree
                            ? `${deliveryEstimate.baseCost} ₽ (бесплатно)`
                            : `${deliveryEstimate.deliveryCost} ₽`
                          : deliveryEstimate?.isDeliveryFree 
                            ? 'Бесплатно'
                            : deliveryEstimate?.deliveryCost 
                              ? `${deliveryEstimate.deliveryCost} ₽`
                              : 'Рассчитается'
                      }
                    </Text>
                  </Group>
                  
                  <Divider />
                  
                  <Group justify="space-between">
                    <Text fw={600} size="lg">Итого</Text>
                    <Text fw={700} size="xl" c="orange.7">
                      {cart.totalAmount + (deliveryEstimate?.isDeliveryFree === false ? deliveryEstimate.deliveryCost : 0)} ₽
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Paper>
          )}
        </SimpleGrid>
      </Stack>

      {/* Виджет отзывов Яндекс Карт */}
      <YandexReviewsWidget />
    </Container>
  )
}