/**
 * @file: DimboKidsPage.tsx
 * @description: Страница "ДИМБО детям и любопытным взрослым" - копия dodokids.ru
 * @dependencies: Mantine, React Router, SEO
 * @created: 2025-01-26
 */

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
  Center,
  Alert,
  Anchor,
  Image,
  Modal,
  Box,
  Divider
} from '@mantine/core'
import { useState, useEffect } from 'react'
import {
  IconUsers,
  IconCake,
  IconPalette,
  IconDownload,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconGift,
  IconChefHat,
  IconHome,
  IconChevronLeft,
  IconChevronRight,
  IconX
} from '@tabler/icons-react'
import { SEOPageWrapper } from '../components/SEOHead'

// Данные изображений для галерей
const masterClassImages = [
  { src: '/images/kids/masterclass-1.jpg', alt: 'Дети готовят пиццу - мастер-класс 1' },
  { src: '/images/kids/masterclass-2.jpg', alt: 'Дети готовят пиццу - мастер-класс 2' },
  { src: '/images/kids/masterclass-3.jpg', alt: 'Дети готовят пиццу - мастер-класс 3' },
  { src: '/images/kids/masterclass-4.jpg', alt: 'Дети готовят пиццу - мастер-класс 4' },
  { src: '/images/kids/masterclass-5.jpg', alt: 'Дети готовят пиццу - мастер-класс 5' },
  { src: '/images/kids/masterclass-6.jpg', alt: 'Дети готовят пиццу - мастер-класс 6' },
  { src: '/images/kids/masterclass-7.jpg', alt: 'Дети готовят пиццу - мастер-класс 7' },
  { src: '/images/kids/masterclass-8.jpg', alt: 'Дети готовят пиццу - мастер-класс 8' }
]

const birthdayImages = [
  { src: '/images/kids/birthday-1.jpg', alt: 'День рождения в ДИМБО Пицца - фото 1' },
  { src: '/images/kids/birthday-2.jpg', alt: 'День рождения в ДИМБО Пицца - фото 2' },
  { src: '/images/kids/birthday-3.jpg', alt: 'День рождения в ДИМБО Пицца - фото 3' },
  { src: '/images/kids/birthday-4.jpg', alt: 'День рождения в ДИМБО Пицца - фото 4' },
  { src: '/images/kids/birthday-5.jpg', alt: 'День рождения в ДИМБО Пицца - фото 5' },
  { src: '/images/kids/birthday-6.jpg', alt: 'День рождения в ДИМБО Пицца - фото 6' },
  { src: '/images/kids/birthday-7.jpg', alt: 'День рождения в ДИМБО Пицца - фото 7' },
  { src: '/images/kids/birthday-8.jpg', alt: 'День рождения в ДИМБО Пицца - фото 8' },
  { src: '/images/kids/birthday-9.jpg', alt: 'День рождения в ДИМБО Пицца - фото 9' },
  { src: '/images/kids/birthday-10.jpg', alt: 'День рождения в ДИМБО Пицца - фото 10' }
]

// Компонент галереи изображений
interface ImageGalleryProps {
  images: { src: string; alt: string }[]
  onImageClick: (images: { src: string; alt: string }[], initialIndex: number) => void
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
      {images.map((image, index) => (
        <Box
          key={index}
          style={{ cursor: 'pointer' }}
          onClick={() => onImageClick(images, index)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            radius="md"
            h={120}
            style={{ objectFit: 'cover' }}
            fallbackSrc="/placeholder-food.jpg"
          />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export function DimboKidsPage() {
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

  const handleMasterClassRegistration = () => {
    // TODO: Добавить форму записи на мастер-класс
    window.open('tel:+79061382868', '_blank')
  }

  const handleBirthdayRegistration = () => {
    // TODO: Добавить форму заявки на день рождения
    window.open('https://vk.com/dimbo_volzhsk', '_blank')
  }

  const handleDownloadColoring = () => {
    // TODO: Добавить ссылку на раскраску
    alert('Раскраски скоро будут доступны для скачивания!')
  }

  return (
    <SEOPageWrapper 
      page="kids"
      customSeo={{
        title: 'ДИМБО детям - мастер-классы и дни рождения в пиццерии Волжск',
        description: 'Мастер-классы по приготовлению пиццы для детей от 4 лет в ДИМБО Пицца Волжск. Празднование дня рождения, игровые комнаты, раскраски и развивающие активности.',
        keywords: ['мастер-класс пицца дети', 'день рождения пиццерия Волжск', 'ДИМБО дети', 'детские праздники Волжск', 'обучение готовке детей', 'игровая комната пиццерия']
      }}
    >
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Главный заголовок */}
          <Center>
            <Stack gap="md" ta="center">
              <Title order={1} size="h1" c="orange.7">
                🍕 ДИМБО детям и любопытным взрослым
              </Title>
              <Text size="xl" c="dimmed" maw={600}>
                Пройдите мастер-класс, запишитесь на экскурсию и отпразднуйте день рождения в ДИМБО Пицце.
              </Text>
              <Button 
                size="lg" 
                mt="xl" 
                onClick={handleMasterClassRegistration}
                leftSection={<IconPhone size={20} />}
              >
                Записаться
              </Button>
            </Stack>
          </Center>

          {/* Мастер-класс */}
          <Card shadow="lg" padding="xl" radius="lg" withBorder>
            <Stack gap="lg">
              <Group>
                <ThemeIcon size="xl" color="orange" variant="light">
                  <IconChefHat size={28} />
                </ThemeIcon>
                <Title order={2} c="orange.7">
                  Мастер-класс
                </Title>
              </Group>

              <Text size="lg" lh={1.6}>
                У детей всегда куча вопросов. У нас есть почти все ответы. Ведь мы не просто учим готовить пиццу, 
                но и рассказываем много интересного. Мы уверены: когда ребенок готовит, он не только смешивает 
                ингредиенты, но и учится, развивает мелкую моторику и фантазию.
              </Text>

              {/* Этапы мастер-класса */}
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                <Paper p="md" radius="md" bg="orange.0" withBorder>
                  <Stack gap="sm" ta="center">
                    <Badge size="xl" color="orange" variant="filled">1</Badge>
                    <Text fw={600} c="orange.8">Запишите детей на мастер-класс</Text>
                  </Stack>
                </Paper>
                
                <Paper p="md" radius="md" bg="orange.0" withBorder>
                  <Stack gap="sm" ta="center">
                    <Badge size="xl" color="orange" variant="filled">2</Badge>
                    <Text fw={600} c="orange.8">Оплатите стоимость пиццы</Text>
                  </Stack>
                </Paper>
                
                <Paper p="md" radius="md" bg="orange.0" withBorder>
                  <Stack gap="sm" ta="center">
                    <Badge size="xl" color="orange" variant="filled">3</Badge>
                    <Text fw={600} c="orange.8">Посмотрите, как ваш ребенок ее приготовит и разделите ее вместе. Такие моменты бесценны</Text>
                  </Stack>
                </Paper>
              </SimpleGrid>

              {/* Вопросы детей */}
              <Stack gap="md">
                <Text fw={600} size="lg">Популярные вопросы детей:</Text>
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                  <Paper p="md" radius="md" bg="yellow.0" withBorder>
                    <Text fw={600} c="orange.7">1. Почему пицца круглая?</Text>
                  </Paper>
                  <Paper p="md" radius="md" bg="yellow.0" withBorder>
                    <Text fw={600} c="orange.7">2. Почему тесто липнет?</Text>
                  </Paper>
                  <Paper p="md" radius="md" bg="yellow.0" withBorder>
                    <Text fw={600} c="orange.7">3. Почему помидорки красные?</Text>
                  </Paper>
                </SimpleGrid>
              </Stack>

              {/* Условия */}
              <Alert color="orange" variant="light" icon={<IconUsers size={24} />}>
                <Group justify="space-between">
                  <div>
                    <Text fw={600} mb="xs">Возраст: дети от 4-х лет и взрослые</Text>
                    <Text size="sm">
                      После мастер-класса каждый ребенок получит диплом пиццамейкера и небольшой подарок
                    </Text>
                  </div>
                  <ThemeIcon size="xl" color="orange" variant="light">
                    <IconGift size={28} />
                  </ThemeIcon>
                </Group>
              </Alert>

              {/* Галерея мастер-классов */}
              <Stack gap="md">
                <Divider />
                <Text fw={600} size="lg" ta="center" c="orange.7">
                  📸 Наши мастер-классы в действии
                </Text>
                <Text size="md" ta="center" c="dimmed">
                  Посмотрите, как проходят наши увлекательные мастер-классы! 
                  Нажмите на любое фото для увеличения.
                </Text>
                <ImageGallery images={masterClassImages} onImageClick={handleImageClick} />
              </Stack>

              <Center>
                <Button 
                  size="xl" 
                  onClick={handleMasterClassRegistration}
                  leftSection={<IconPhone size={20} />}
                >
                  Записаться
                </Button>
              </Center>
            </Stack>
          </Card>

          {/* День рождения */}
          <Card shadow="lg" padding="xl" radius="lg" withBorder>
            <Stack gap="lg">
              <Group>
                <ThemeIcon size="xl" color="pink" variant="light">
                  <IconCake size={28} />
                </ThemeIcon>
                <Title order={2} c="pink.7">
                  Отпразднуйте день рождения в ДИМБО
                </Title>
              </Group>

              <Text size="lg" lh={1.6}>
                Можно пригласить аниматоров устроить творческие мастер-классы для детей. 
                Дополнительную информацию вы можете узнать в местной группе ДИМБО Пиццы во Вконтакте.
              </Text>

              <Text size="lg" lh={1.6}>
                Заполните анкету, и мы забронируем для вас столик. Возьмите с собой торт и фрукты, 
                а пиццу закажите у нас :)
              </Text>

              {/* Галерея дней рождения */}
              <Stack gap="md">
                <Divider />
                <Text fw={600} size="lg" ta="center" c="pink.7">
                  🎉 Незабываемые дни рождения в ДИМБО
                </Text>
                <Text size="md" ta="center" c="dimmed">
                  Смотрите, как весело мы празднуем дни рождения! 
                  Каждый праздник становится особенным.
                </Text>
                <ImageGallery images={birthdayImages} onImageClick={handleImageClick} />
              </Stack>

              <Center>
                <Button 
                  size="xl" 
                  color="pink"
                  onClick={handleBirthdayRegistration}
                  leftSection={<IconCake size={20} />}
                >
                  Оставить заявку
                </Button>
              </Center>
            </Stack>
          </Card>



          {/* Контакты и дополнительная информация */}
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
                      +7 900 123-45-67
                    </Anchor>
                  </div>
                </Group>

                <Group>
                  <ThemeIcon color="blue" variant="light">
                    <IconMapPin size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">Адрес</Text>
                    <Text size="sm">г. Волжск</Text>
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
                🎉 Создайте незабываемые воспоминания в ДИМБО Пицце!
              </Title>
              <Text size="lg" c="dimmed">
                Мастер-классы, дни рождения и веселые активности для всей семьи
              </Text>
              <Group justify="center" gap="md">
                <Button 
                  size="lg" 
                  onClick={handleMasterClassRegistration}
                  leftSection={<IconChefHat size={20} />}
                >
                  Записаться на мастер-класс
                </Button>
                <Button 
                  size="lg" 
                  color="pink" 
                  variant="outline"
                  onClick={handleBirthdayRegistration}
                  leftSection={<IconCake size={20} />}
                >
                  Заказать день рождения
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Модальное окно для просмотра изображений */}
      <Modal
        opened={!!modalImage}
        onClose={closeModal}
        size="xl"
        centered
        title={modalImage?.alt}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
      >
        {modalImage && (
          <Image
            src={modalImage.src}
            alt={modalImage.alt}
            radius="md"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
            fallbackSrc="/placeholder-food.jpg"
          />
        )}
      </Modal>
    </SEOPageWrapper>
  )
}