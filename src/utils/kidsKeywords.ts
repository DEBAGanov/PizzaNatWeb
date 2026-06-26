/**
 * @file: kidsKeywords.ts
 * @description: Утилиты для обработки детских ключевиков и создания SEO-страниц
 * @dependencies: transliteration utilities
 * @created: 2025-01-27
 */

import { transliterate } from './transliteration'

// Основные детские ключевики
export const KIDS_KEYWORDS = [
  // Основные
  'детский день рождения',
  'детский день рождения где',
  'где отметить детский день рождения',
  'детские аниматоры на день рождения',
  'меню на детский день рождения',
  'детский подарок на день рождения',
  'отпраздновать детский день рождения',
  'где отпраздновать детский день рождения',
  'где провести детский день рождения',
  'детский квест на день рождения',
  'детский день рождения лет',
  'празднование детского дня рождения',
  'отметить детский день рождения',
  'еда на детском дне рождения',
  'детский день рождения год',
  'праздник для детей',
  'где отметить др ребенка',
  'поздравление с рождением ребенка',
  'детские подарки',
  'что подарить ребенку',
  'подарок мальчику',
  'подарок девочке',
  'подарок дочке',
  'подарок подростку',
  'аниматоры на день рождения',
  'детский праздник',
  'праздники в детском саду',
  'сценарий детского праздника',
  'организация детских праздников',
  'проведение детских праздников',
  'организация детских праздников в волжске',
  'организация праздников и мероприятий в волжске',
  'детские аниматоры в волжске',
  'детские аниматоры на праздник волжск'
]

// Группировка ключевиков по темам
export const KEYWORD_GROUPS = {
  birthday_main: [
    'детский день рождения',
    'детский день рождения где',
    'где отметить детский день рождения',
    'отпраздновать детский день рождения',
    'где отпраздновать детский день рождения',
    'где провести детский день рождения',
    'празднование детского дня рождения',
    'отметить детский день рождения'
  ],
  
  animators: [
    'детские аниматоры на день рождения',
    'аниматоры на день рождения',
    'детские аниматоры в волжске',
    'детские аниматоры на праздник волжск'
  ],
  
  menu_food: [
    'меню на детский день рождения',
    'еда на детском дне рождения'
  ],
  
  gifts: [
    'детский подарок на день рождения',
    'детские подарки',
    'что подарить ребенку',
    'подарок мальчику',
    'подарок девочке',
    'подарок дочке',
    'подарок подростку'
  ],
  
  quests_entertainment: [
    'детский квест на день рождения',
    'праздник для детей',
    'детский праздник'
  ],
  
  age_specific: [
    'детский день рождения лет',
    'детский день рождения год',
    'где отметить др ребенка'
  ],
  
  organization: [
    'организация детских праздников',
    'проведение детских праздников',
    'организация детских праздников в волжске',
    'организация праздников и мероприятий в волжске',
    'праздники в детском саду',
    'сценарий детского праздника'
  ],
  
  congratulations: [
    'поздравление с рождением ребенка'
  ]
}

// Мета-данные для каждой группы
export const GROUP_META = {
  birthday_main: {
    title: 'Детский день рождения в Волжске - ДИМБО',
    description: 'Отметьте детский день рождения в ДИМБО Волжск! Мастер-классы, игровая комната, аниматоры. Лучшее место для празднования детских праздников.',
    icon: '🎂',
    images: ['/images/kids/birthday-1.jpg', '/images/kids/birthday-2.jpg', '/images/kids/birthday-3.jpg']
  },
  
  animators: {
    title: 'Детские аниматоры в Волжске - ДИМБО',
    description: 'Профессиональные детские аниматоры в ДИМБО Волжск. Веселые программы, игры, квесты для детских праздников и дней рождения.',
    icon: '🎭',
    images: ['/images/kids/birthday-4.jpg', '/images/kids/birthday-5.jpg', '/images/kids/masterclass-1.jpg']
  },
  
  menu_food: {
    title: 'Меню для детского дня рождения - ДИМБО',
    description: 'Детское меню для дня рождения в ДИМБО Волжск. Вкусная пицца, полезная еда, специальные детские блюда и напитки.',
    icon: '🍕',
    images: ['/images/kids/masterclass-2.jpg', '/images/kids/masterclass-3.jpg', '/images/kids/birthday-6.jpg']
  },
  
  gifts: {
    title: 'Детские подарки и сюрпризы - ДИМБО',
    description: 'Что подарить ребенку? Идеи подарков для мальчиков и девочек в ДИМБО Волжск. Диплом пиццамейкера и памятные сувениры.',
    icon: '🎁',
    images: ['/images/kids/birthday-7.jpg', '/images/kids/masterclass-4.jpg', '/images/kids/birthday-8.jpg']
  },
  
  quests_entertainment: {
    title: 'Детские квесты и развлечения - ДИМБО',
    description: 'Увлекательные детские квесты и развлечения в ДИМБО Волжск. Игры, конкурсы, творческие активности для детских праздников.',
    icon: '🎮',
    images: ['/images/kids/masterclass-5.jpg', '/images/kids/birthday-9.jpg', '/images/kids/masterclass-6.jpg']
  },
  
  age_specific: {
    title: 'День рождения ребенка по возрастам - ДИМБО',
    description: 'Празднование дня рождения детей разных возрастов в ДИМБО Волжск. Программы для малышей и подростков.',
    icon: '🎈',
    images: ['/images/kids/birthday-10.jpg', '/images/kids/masterclass-7.jpg', '/images/kids/birthday-11.jpg']
  },
  
  organization: {
    title: 'Организация детских праздников в Волжске - ДИМБО',
    description: 'Профессиональная организация детских праздников в ДИМБО Волжск. Полное сопровождение мероприятий, сценарии, координация.',
    icon: '🎪',
    images: ['/images/kids/masterclass-8.jpg', '/images/kids/birthday-1.jpg', '/images/kids/birthday-2.jpg']
  },
  
  congratulations: {
    title: 'Поздравления с рождением ребенка - ДИМБО',
    description: 'Поздравления и празднование рождения ребенка в ДИМБО Волжск. Создаем особенные моменты для семьи.',
    icon: '👶',
    images: ['/images/kids/birthday-3.jpg', '/images/kids/birthday-4.jpg', '/images/kids/masterclass-1.jpg']
  }
}

// Функция для получения URL по ключевику
export function getKidsKeywordUrl(keyword: string): string {
  return transliterate(keyword.toLowerCase().replace(/\s+/g, '-'))
}

// Функция для получения группы по ключевику
export function getKeywordGroup(keyword: string): keyof typeof KEYWORD_GROUPS | null {
  for (const [groupKey, keywords] of Object.entries(KEYWORD_GROUPS)) {
    if (keywords.includes(keyword)) {
      return groupKey as keyof typeof KEYWORD_GROUPS
    }
  }
  return null
}

// Функция для получения мета-данных по ключевику.
// city прокидывается из шаблона, чтобы зеленодольские страницы не отдавали "Волжск".
export function getKeywordMeta(keyword: string, city: string = 'Волжск') {
  const group = getKeywordGroup(keyword)
  if (!group) {
    // Возвращаем дефолтные мета-данные
    return {
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - ДИМБО ${city}`,
      description: `${keyword} в ДИМБО ${city}. Мастер-классы, игровая комната, развлечения для детей. Звоните: +7(906)138-28-68`,
      icon: '🎉',
      images: ['/images/kids/birthday-1.jpg', '/images/kids/masterclass-1.jpg', '/images/kids/birthday-2.jpg']
    }
  }

  return {
    ...GROUP_META[group],
    title: GROUP_META[group].title.replace('ДИМБО', `ДИМБО - ${keyword}`),
    description: `${keyword} в ДИМБО ${city}. ${GROUP_META[group].description.split('.').slice(1).join('.')}`
  }
}

// Функция для получения связанных ключевиков
export function getRelatedKeywords(currentKeyword: string, limit = 6): string[] {
  const group = getKeywordGroup(currentKeyword)
  
  if (group) {
    // Возвращаем другие ключевики из той же группы
    const groupKeywords = KEYWORD_GROUPS[group].filter(k => k !== currentKeyword)
    
    // Добавляем ключевики из других групп
    const otherKeywords = KIDS_KEYWORDS.filter(k => 
      !KEYWORD_GROUPS[group].includes(k) && k !== currentKeyword
    )
    
    return [...groupKeywords, ...otherKeywords].slice(0, limit)
  }
  
  // Если группа не найдена, возвращаем случайные ключевики
  return KIDS_KEYWORDS.filter(k => k !== currentKeyword).slice(0, limit)
}

// FAQ данные для детских страниц
export const KIDS_FAQ = {
  birthday_main: [
    {
      question: "С какого возраста можно проводить день рождения в ДИМБО?",
      answer: "Мы принимаем детей от 3 лет. Наши программы адаптированы под разные возрастные группы - от малышей до подростков."
    },
    {
      question: "Сколько стоит отметить день рождения ребенка?",
      answer: "Стоимость зависит от количества гостей и выбранной программы. Базовый пакет включает столик, мастер-класс и подарки. Уточните цены по телефону +7(906)138-28-68"
    },
    {
      question: "Можно ли принести свой торт?",
      answer: "Да, вы можете принести свой торт и фрукты. Мы предоставим тарелки, салфетки и все необходимое для сервировки."
    },
    {
      question: "Нужно ли бронировать заранее?",
      answer: "Да, рекомендуем бронировать заранее, особенно на выходные. Звоните +7(906)138-28-68 или оставляйте заявку в нашей группе ВК."
    }
  ],
  
  animators: [
    {
      question: "Есть ли у вас аниматоры?",
      answer: "Да, мы можем организовать программу с аниматорами. Подробности уточняйте при бронировании или в нашей группе ВКонтакте."
    },
    {
      question: "Какие программы предлагают аниматоры?",
      answer: "Аниматоры проводят игры, конкурсы, творческие мастер-классы. Программы адаптируются под возраст детей и ваши пожелания."
    }
  ],
  
  default: [
    {
      question: "Какие услуги предоставляет ДИМБО для детей?",
      answer: "Мы предлагаем мастер-классы по приготовлению пиццы, празднование дней рождения, игровую комнату и развивающие активности для детей от 3 лет."
    },
    {
      question: "Как записаться на мероприятие?",
      answer: "Звоните по телефону +7(906)138-28-68, пишите в нашу группу ВКонтакте vk.com/dimbo_volzhsk или приходите по адресу ул. Шестакова 1Б или ул. Ленина 69."
    }
  ]
}

// Функция для получения FAQ по группе ключевика
export function getKeywordFAQ(keyword: string) {
  const group = getKeywordGroup(keyword)
  
  if (group && group in KIDS_FAQ) {
    return KIDS_FAQ[group as keyof typeof KIDS_FAQ]
  }
  
  return KIDS_FAQ.default
}

// Функция для определения, нужно ли показывать детское меню
export function shouldShowKidsMenu(keyword: string): boolean {
  const menuRelevantGroups = [
    'birthday_main', 
    'animators', 
    'menu_food', 
    'age_specific', 
    'organization',
    'quests_entertainment'
  ]
  
  const group = getKeywordGroup(keyword)
  return group ? menuRelevantGroups.includes(group) : false
}

// Ключевики, которые НЕ должны показывать меню (только информационные)
export const NO_MENU_KEYWORDS = [
  'поздравление с рождением ребенка',
  'детские подарки',
  'что подарить ребенку',
  'подарок мальчику',
  'подарок девочке', 
  'подарок дочке',
  'подарок подростку'
]

// Функция для проверки, нужно ли показывать меню (улучшенная версия)
export function shouldShowKidsMenuImproved(keyword: string): boolean {
  // Если это ключевик из исключений - не показываем меню
  if (NO_MENU_KEYWORDS.includes(keyword)) {
    return false
  }
  
  // Для остальных ключевиков показываем меню
  return shouldShowKidsMenu(keyword)
}
