/**
 * @file: KidsPageTemplate.tsx
 * @description: Шаблон для детских SEO-страниц с изображениями из DimboKids
 * @dependencies: Mantine, DimboKids images
 * @created: 2025-01-27
 */

import React, { useState, useEffect } from 'react'
import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Button,
  Group,
  SimpleGrid,
  Paper,
  ThemeIcon,
  Badge,
  List,
  Image,
  Modal,
  Box,
  Divider,
  ActionIcon,
  Flex,
  Alert,
  Anchor
} from '@mantine/core'
import {
  IconCake,
  IconPhone,
  IconMapPin,
  IconClock,
  IconGift,
  IconUsers,
  IconChefHat,
  IconHeart,
  IconStars,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconMail
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../SEOHead'
import { getKeywordMeta, getRelatedKeywords, getKeywordFAQ, shouldShowKidsMenuImproved } from '../../utils/kidsKeywords'
import { KidsMenu } from './KidsMenu'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'

interface KidsPageTemplateProps {
  keyword: string
  city?: string
}

// Компонент галереи изображений
interface ImageGalleryProps {
  images: { src: string; alt: string }[]
  onImageClick: (images: { src: string; alt: string }[], initialIndex: number) => void
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
      {images.map((image, index) => (
        <Box
          key={index}
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
          onClick={() => onImageClick(images, index)}
          sx={{
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            radius="md"
            h={140}
            style={{ objectFit: 'cover' }}
            fallbackSrc="/placeholder-food.jpg"
          />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export const KidsPageTemplate: React.FC<KidsPageTemplateProps> = ({ keyword, city = 'Волжск' }) => {
  const navigate = useNavigate()
  const meta = getKeywordMeta(keyword, city)
  const relatedKeywords = getRelatedKeywords(keyword)
  const faqData = getKeywordFAQ(keyword)
  const showMenu = shouldShowKidsMenuImproved(keyword)

  // Состояние для слайдера изображений
  const [galleryState, setGalleryState] = useState<{
    images: { src: string; alt: string }[]
    currentIndex: number
    isOpen: boolean
  }>({
    images: [],
    currentIndex: 0,
    isOpen: false
  })

  // Все изображения из папки kids
  const allKidsImages = [
    // Фотографии дней рождения
    '/images/kids/birthday-1.jpg',
    '/images/kids/birthday-2.jpg', 
    '/images/kids/birthday-3.jpg',
    '/images/kids/birthday-4.jpg',
    '/images/kids/birthday-5.jpg',
    '/images/kids/birthday-6.jpg',
    '/images/kids/birthday-7.jpg',
    '/images/kids/birthday-8.jpg',
    '/images/kids/birthday-9.jpg',
    '/images/kids/birthday-10.jpg',
    '/images/kids/birthday-11.jpg',
    // Фотографии мастер-классов
    '/images/kids/masterclass-1.jpg',
    '/images/kids/masterclass-2.jpg',
    '/images/kids/masterclass-3.jpg',
    '/images/kids/masterclass-4.jpg',
    '/images/kids/masterclass-5.jpg',
    '/images/kids/masterclass-6.jpg',
    '/images/kids/masterclass-7.jpg',
    '/images/kids/masterclass-8.jpg'
  ]

  // Подготавливаем изображения с alt-текстами
  const keywordImages = allKidsImages.map((src, index) => ({
    src,
    alt: `${keyword} в ДИМБО Пицца ${city} - фото ${index + 1}`
  }))

  const handleImageClick = (images: { src: string; alt: string }[], initialIndex: number) => {
    setGalleryState({
      images,
      currentIndex: initialIndex,
      isOpen: true
    })
  }

  const closeModal = () => {
    setGalleryState(prev => ({ ...prev, isOpen: false }))
  }

  const goToNext = () => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }))
  }

  const goToPrevious = () => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }))
  }

  // Обработка клавиш стрелок
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!galleryState.isOpen) return
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNext()
          break
        case 'Escape':
          event.preventDefault()
          closeModal()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [galleryState.isOpen])

  const currentImage = galleryState.images[galleryState.currentIndex]

  const handleContactCall = () => {
    window.open('tel:+79061382868', '_blank')
  }

  const handleVKContact = () => {
    window.open('https://vk.com/dimbo_volzhsk', '_blank')
  }

  const seoData = {
    title: meta.title,
    description: meta.description,
    page: keyword.replace(/\s+/g, '-').toLowerCase(),
    keywords: [keyword, ...relatedKeywords, 'ДИМБО', `пиццерия ${city}`, 'детские мероприятия'],
    imageUrl: meta.images[0]
  }

  return (
    <SEOPageWrapper {...seoData}>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Stack gap="lg" ta="center">
              <Title order={1} size="h1" c="orange.7">
                {meta.icon} {keyword.charAt(0).toUpperCase() + keyword.slice(1)} в ДИМБО {city}
              </Title>
              <Text size="xl" c="dark.6" maw={800}>
                {meta.description}
              </Text>
              <Group justify="center">
                <Badge size="lg" color="green">Возраст: от 3 лет</Badge>
                <Badge size="lg" color="blue">Игровая комната</Badge>
                <Badge size="lg" color="pink">Мастер-классы</Badge>
              </Group>
              <Group justify="center" gap="md">
                <Button
                  size="lg"
                  color="orange"
                  leftSection={<IconPhone size={20} />}
                  onClick={handleContactCall}
                >
                  Позвонить +7(906)138-28-68
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="blue"
                  leftSection={<IconCake size={20} />}
                  onClick={handleVKContact}
                >
                  Оставить заявку в ВК
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* Основная информация */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Card shadow="sm" radius="md" withBorder p="xl">
              <Stack gap="md">
                <Group>
                  <ThemeIcon size="xl" color="orange" variant="light">
                    <IconChefHat size={28} />
                  </ThemeIcon>
                  <Title order={2} c="orange.7">
                    Мастер-классы по приготовлению пиццы
                  </Title>
                </Group>
                <Text size="md" lh={1.6}>
                  Дети от 4 лет могут научиться готовить настоящую пиццу под руководством наших шеф-поваров. 
                  Каждый ребенок получает диплом пиццамейкера и небольшой подарок.
                </Text>
                <List spacing="xs" size="sm">
                  <List.Item icon={<IconGift size={16} color="orange" />}>
                    Диплом пиццамейкера в подарок
                  </List.Item>
                  <List.Item icon={<IconUsers size={16} color="orange" />}>
                    Группы до 8 детей
                  </List.Item>
                  <List.Item icon={<IconHeart size={16} color="orange" />}>
                    Развитие мелкой моторики и фантазии
                  </List.Item>
                </List>
              </Stack>
            </Card>

            <Card shadow="sm" radius="md" withBorder p="xl">
              <Stack gap="md">
                <Group>
                  <ThemeIcon size="xl" color="pink" variant="light">
                    <IconCake size={28} />
                  </ThemeIcon>
                  <Title order={2} c="pink.7">
                    Празднование дня рождения
                  </Title>
                </Group>
                <Text size="md" lh={1.6}>
                  Организуем незабываемый день рождения для вашего ребенка! Игровая комната, 
                  аниматоры, творческие мастер-классы и вкусная пицца.
                </Text>
                <List spacing="xs" size="sm">
                  <List.Item icon={<IconStars size={16} color="pink" />}>
                    Программы с аниматорами
                  </List.Item>
                  <List.Item icon={<IconGift size={16} color="pink" />}>
                    Можно принести свой торт
                  </List.Item>
                  <List.Item icon={<IconHeart size={16} color="pink" />}>
                    Бронирование столика
                  </List.Item>
                </List>
              </Stack>
            </Card>
          </SimpleGrid>

          {/* Галерея изображений */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Stack gap="md">
              <Title order={2} ta="center" c="orange.7">
                📸 {keyword.charAt(0).toUpperCase() + keyword.slice(1)} в ДИМБО
              </Title>
              <Text size="md" ta="center" c="dimmed">
                Более 19 фотографий наших детских праздников и мастер-классов! 
                Смотрите, как весело проходят наши мероприятия. Нажмите на любое фото для увеличения.
              </Text>
              <Group justify="center" gap="xl" mb="md">
                <Group gap="xs">
                  <IconCake size={20} color="pink" />
                  <Text size="sm" c="dimmed">11 фото дней рождения</Text>
                </Group>
                <Group gap="xs">
                  <IconChefHat size={20} color="orange" />
                  <Text size="sm" c="dimmed">8 фото мастер-классов</Text>
                </Group>
              </Group>
              <ImageGallery images={keywordImages} onImageClick={handleImageClick} />
            </Stack>
          </Card>

          {/* Как заказать */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Stack gap="lg">
              <Title order={2} ta="center" c="dark">
                Как заказать {keyword.toLowerCase()}?
              </Title>
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <Paper p="md" radius="md" bg="orange.0" withBorder ta="center">
                  <Stack gap="sm">
                    <Badge size="xl" color="orange" variant="filled">1</Badge>
                    <Text fw={600} c="orange.8">Позвоните по телефону</Text>
                    <Text size="sm">+7(906)138-28-68</Text>
                  </Stack>
                </Paper>
                
                <Paper p="md" radius="md" bg="blue.0" withBorder ta="center">
                  <Stack gap="sm">
                    <Badge size="xl" color="blue" variant="filled">2</Badge>
                    <Text fw={600} c="blue.8">Обсудите детали</Text>
                    <Text size="sm">Дата, время, количество детей</Text>
                  </Stack>
                </Paper>
                
                <Paper p="md" radius="md" bg="green.0" withBorder ta="center">
                  <Stack gap="sm">
                    <Badge size="xl" color="green" variant="filled">3</Badge>
                    <Text fw={600} c="green.8">Приходите и веселитесь!</Text>
                    <Text size="sm">Мы все организуем</Text>
                  </Stack>
                </Paper>
              </SimpleGrid>
            </Stack>
          </Card>

          {/* FAQ */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Stack gap="lg">
              <Title order={2} ta="center" c="dark">
                Часто задаваемые вопросы
              </Title>
              <Stack gap="md">
                {faqData.map((faq, index) => (
                  <Paper key={index} p="md" radius="md" bg="gray.0" withBorder>
                    <Stack gap="sm">
                      <Text fw={600} c="dark">{faq.question}</Text>
                      <Text size="sm" c="dimmed">{faq.answer}</Text>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* Детское меню */}
          {showMenu && (
            <KidsMenu showTitle={true} maxProducts={8} />
          )}

          {/* Связанные услуги */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Stack gap="lg">
              <Title order={2} ta="center" c="dark">
                Также может вас заинтересовать
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {relatedKeywords.slice(0, 6).map((relatedKeyword, index) => (
                  <Paper 
                    key={index} 
                    p="md" 
                    radius="md" 
                    bg="orange.0" 
                    withBorder 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/${relatedKeyword.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <Text fw={600} c="orange.7" ta="center">
                      {relatedKeyword.charAt(0).toUpperCase() + relatedKeyword.slice(1)}
                    </Text>
                  </Paper>
                ))}
              </SimpleGrid>
            </Stack>
          </Card>

          {/* Контактная информация */}
          <Paper p="xl" radius="lg" bg="gray.0" withBorder>
            <Stack gap="md">
              <Title order={3} ta="center" c="orange.7">
                Свяжитесь с нами для записи
              </Title>
              
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
                <Group>
                  <ThemeIcon color="orange" variant="light">
                    <IconPhone size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">Телефон</Text>
                    <Anchor href="tel:+79061382868" c="orange.7">
                      +7 906 138-28-68
                    </Anchor>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="blue" variant="light">
                    <IconMapPin size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">Адрес</Text>
                    {city === 'Волжск' ? (
                      <>
                        <Text size="sm">г. Волжск ул. Шестакова 1Б</Text>
                        <Text size="sm">г. Волжск ул. Ленина 69</Text>
                      </>
                    ) : city === 'Зеленодольск' ? (
                      <Text size="sm">г. Зеленодольск, ул. Татарстан 9</Text>
                    ) : (
                      <Text size="sm">г. {city} - доставка из Волжска</Text>
                    )}
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="green" variant="light">
                    <IconClock size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">Режим работы</Text>
                    <Text size="sm">Ежедневно 10:00-22:00</Text>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="violet" variant="light">
                    <IconMail size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">VK группа</Text>
                    <Anchor href="https://vk.com/dimbo_volzhsk" target="_blank" c="violet.7">
                      vk.com/dimbo_volzhsk
                    </Anchor>
                  </div>
                </Group>
              </SimpleGrid>
            </Stack>
          </Paper>

          {/* Призыв к действию */}
          <Paper p="xl" radius="lg" bg="orange.0" withBorder ta="center">
            <Stack gap="md">
              <Title order={2} c="orange.7">
                🎉 Создайте незабываемые воспоминания в ДИМБО!
              </Title>
              <Text size="lg" c="dimmed">
                {keyword.charAt(0).toUpperCase() + keyword.slice(1)} - это особенный момент для каждого ребенка
              </Text>
              <Group justify="center" gap="md">
                <Button 
                  size="lg" 
                  onClick={handleContactCall}
                  leftSection={<IconPhone size={20} />}
                >
                  Позвонить сейчас
                </Button>
                <Button 
                  size="lg" 
                  color="blue" 
                  variant="outline"
                  onClick={() => navigate('/dimbokids')}
                  leftSection={<IconCake size={20} />}
                >
                  Узнать больше
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>

        {/* Виджет отзывов Яндекс Карт */}
        <YandexReviewsWidget title={`Отзывы о ${keyword} в ДИМБО ${city}`} />
      </Container>

      {/* Модальное окно-слайдер для просмотра изображений */}
      <Modal
        opened={galleryState.isOpen}
        onClose={closeModal}
        size="xl"
        centered
        withCloseButton={false}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        styles={{
          body: { padding: 0 },
          content: { backgroundColor: 'transparent' }
        }}
      >
        {currentImage && (
          <Box pos="relative">
            {/* Кнопка закрытия */}
            <ActionIcon
              variant="filled"
              color="dark"
              size="lg"
              pos="absolute"
              top={10}
              right={10}
              style={{ zIndex: 1000 }}
              onClick={closeModal}
            >
              <IconX size={20} />
            </ActionIcon>

            {/* Счетчик изображений */}
            <Badge
              variant="filled"
              color="dark"
              size="lg"
              pos="absolute"
              top={10}
              left={10}
              style={{ zIndex: 1000 }}
            >
              {galleryState.currentIndex + 1} / {galleryState.images.length}
            </Badge>

            {/* Изображение */}
            <Box style={{ position: 'relative', minHeight: '300px' }}>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                radius="md"
                style={{ 
                  maxHeight: '80vh', 
                  objectFit: 'contain',
                  width: '100%'
                }}
                fallbackSrc="/placeholder-food.jpg"
              />
            </Box>

            {/* Навигация */}
            <Flex justify="space-between" align="center" pos="absolute" top="50%" left={0} right={0} style={{ transform: 'translateY(-50%)', zIndex: 1000 }}>
              {/* Кнопка "Назад" */}
              <ActionIcon
                variant="filled"
                color="dark"
                size="xl"
                onClick={goToPrevious}
                style={{ 
                  marginLeft: '20px',
                  opacity: galleryState.images.length > 1 ? 1 : 0,
                  pointerEvents: galleryState.images.length > 1 ? 'auto' : 'none'
                }}
              >
                <IconChevronLeft size={24} />
              </ActionIcon>

              {/* Кнопка "Вперед" */}
              <ActionIcon
                variant="filled"
                color="dark"
                size="xl"
                onClick={goToNext}
                style={{ 
                  marginRight: '20px',
                  opacity: galleryState.images.length > 1 ? 1 : 0,
                  pointerEvents: galleryState.images.length > 1 ? 'auto' : 'none'
                }}
              >
                <IconChevronRight size={24} />
              </ActionIcon>
            </Flex>

            {/* Название изображения */}
            <Box
              pos="absolute"
              bottom={0}
              left={0}
              right={0}
              p="md"
              style={{
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                borderRadius: '0 0 8px 8px'
              }}
            >
              <Text c="white" size="sm" ta="center" fw={500}>
                {currentImage.alt}
              </Text>
            </Box>
          </Box>
        )}
      </Modal>
    </SEOPageWrapper>
  )
}
