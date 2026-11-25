import React, { useEffect, useState } from 'react'
import {
  IconAlertCircle,
  IconArrowRight,
  IconBuildingStore,
  IconCertificate,
  IconCheck,
  IconChefHat,
  IconChevronDown,
  IconClock,
  IconFlame,
  IconLoader2,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconPizza,
  IconSchool,
  IconStar,
  IconToolsKitchen2,
  IconUsers,
  IconUsersGroup
} from '@tabler/icons-react'
import { SEOHead } from '../../components/SEOHead'
import { generateBreadcrumbSchema, generateFAQSchema } from '../../utils/schemaOrg'
import { sendKidsBirthdayLead } from '../../services/kidsBirthdayLeadApi'
import styles from './MasterclassPizzaLanding.module.css'

const MEDIA = {
  hero: '/images/masterclass-landing/hero.webp',
  group: '/images/masterclass-landing/group.webp',
  dough: '/images/masterclass-landing/dough.webp',
  creative: '/images/masterclass-landing/creative.webp',
  participants: '/images/masterclass-landing/participants.webp',
  og: 'https://dimbopizza.ru/images/masterclass-landing/og-masterclass.jpg'
}

const PHONE_DISPLAY = '8-906-138-28-68'
const PHONE_TEL = '+79061382868'
const MAX_LINK = 'https://max.ru/u/f9LHodD0cOKxpjw07EONyTZbGCq46uFIkZ3n57GttGEis2FFLNig0E_6gxA'
const YANDEX_MAPS_LINK = 'https://yandex.ru/maps/org/dimbo/188302222909/?ll=48.332228%2C55.868031&z=17'
const YANDEX_REVIEWS_LINK = 'https://yandex.ru/maps/org/dimbo/188302222909/reviews/'
const PAGE_URL = 'https://dimbopizza.ru/v1/master-klass'
const PAGE_TITLE = 'Мастер-класс по пицце в Волжске для детей и взрослых | ДИМБО'
const PAGE_DESCRIPTION = 'Мастер-класс по приготовлению пиццы в Волжске для групп от 10 человек. 50 минут с наставником ДИМБО: дети от 5 лет и взрослые готовят свою пиццу. Оставьте заявку.'
const MASTERCLASS_VIDEO_URL = ''

const FAQ_ITEMS = [
  {
    q: 'Как записаться на мастер-класс?',
    a: 'Оставьте заявку в форме на этой странице, напишите в MAX или позвоните по номеру 8-906-138-28-68. Администратор уточнит формат, свободные даты, стоимость и подтвердит запись.'
  },
  {
    q: 'Как проходит мастер-класс и безопасно ли это для детей?',
    a: 'Участники готовят вместе с наставником: раскатывают тесто, добавляют соус и выкладывают начинку. Дети работают только на безопасных этапах. Пиццу выпекает персонал Dimbo — дети не контактируют с горячей печью.'
  },
  {
    q: 'Что будет с приготовленной пиццей?',
    a: 'Каждый участник получает именно ту пиццу, которую приготовил сам. Её можно съесть в пиццерии или забрать с собой.'
  },
  {
    q: 'Что входит в мастер-класс?',
    a: '50 минут занятия с наставником, продукты и необходимый инвентарь, работа с тестом и начинкой, выпекание, собственная пицца и диплом пиццамейкера. Актуальную стоимость администратор сообщит при записи.'
  },
  {
    q: 'Что нужно взять с собой?',
    a: 'Ничего специально брать не нужно: продукты и инвентарь уже будут на месте. Выбирайте удобную одежду, в которой ребёнку будет комфортно работать с тестом.'
  },
  {
    q: 'Могут ли участвовать родители и взрослые?',
    a: 'Да, мастер-класс подходит не только детям от 5 лет, но и взрослым. Если хотите прийти всей семьёй или сопровождать ребёнка, укажите это в заявке — администратор предложит подходящий формат.'
  },
  {
    q: 'Сколько стоит участие и нужна ли предоплата?',
    a: 'Актуальную стоимость и условия оплаты администратор сообщит перед бронированием. Вы сможете согласовать их до подтверждения записи — никаких платежей на сайте не требуется.'
  },
  {
    q: 'Можно ли прийти группой или провести мастер-класс на день рождения?',
    a: 'Да, основной формат — группы от 10 человек: класс, семейная или дружеская компания, день рождения, взрослый коллектив. В заявке оставьте только имя и телефон — состав группы и программу обсудим с вами при подтверждении.'
  },
  {
    q: 'Что делать, если у ребёнка аллергия?',
    a: 'Обязательно предупредите администратора об аллергии и пищевых ограничениях до занятия. Мы уточним состав ингредиентов и скажем, можно ли адаптировать начинку для участника.'
  },
  {
    q: 'Как перенести или отменить запись?',
    a: 'Позвоните или напишите администратору как можно раньше. Мы поможем изменить дату или отменить участие без необходимости разбираться с отдельной системой бронирования.'
  }
]

const REVIEWS = [
  {
    name: 'Дарья Родионова',
    initials: 'ДР',
    color: '#C73040',
    text: '«Отмечали день рождения на 17 детей, всё прошло замечательно! Вкусно, весело, много активностей, ещё немаловажно — чисто! Видно, что всё сделано с любовью и с душой. На все вопросы и просьбы был моментальный ответ. Обязательно ещё придём!»'
  },
  {
    name: 'Людмила Анатольевна',
    initials: 'ЛА',
    color: '#1A8574',
    text: '«Очень нравится игровой центр «Димбо», в нём есть всё: кафе и игровая для детей. Всё продумано до мелочей. Есть батуты, игровые приставки, VR-очки. Также можно потанцевать и попеть в караоке. Очень вежливый персонал. Советую!»'
  },
  {
    name: 'Алиса С.',
    initials: 'АС',
    color: '#6B47C2',
    text: '«Хорошее уютное место. Еда вкусная, сытная. Готовят всё быстро. Персонал приветливый, вежливый. Всегда чисто, аккуратно. Были на праздновании дня рождения дочки, всем очень понравилось. Для развлечения детей всё есть. Всем советую.»'
  },
  {
    name: 'Миля В.',
    initials: 'МВ',
    color: '#136832',
    text: '«Отмечаем не первый день рождения в этом кафе! Очень добродушный персонал, вкусная еда, всё в одном месте — различная пицца, картошка фри и игровой зал! Дети довольны — мамы счастливы!»'
  }
]

const SERVICE_SCHEMA = {
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  serviceType: 'Мастер-класс по приготовлению пиццы',
  name: 'Мастер-класс по приготовлению пиццы в Dimbo Волжск',
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  image: MEDIA.og,
  provider: {
    '@type': 'Restaurant',
    name: 'ДИМБО Пицца',
    telephone: PHONE_TEL,
    url: 'https://dimbopizza.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Шестакова, 1Б',
      addressLocality: 'Волжск',
      addressRegion: 'Республика Марий Эл',
      addressCountry: 'RU'
    }
  },
  areaServed: {
    '@type': 'City',
    name: 'Волжск'
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: 5
  }
}

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    SERVICE_SCHEMA,
    generateFAQSchema(FAQ_ITEMS.map(item => ({ question: item.q, answer: item.a }))),
    generateBreadcrumbSchema([
      { name: 'Главная', url: 'https://dimbopizza.ru/' },
      { name: 'ДИМБО детям', url: 'https://dimbopizza.ru/dimbokids' },
      { name: 'Мастер-класс по приготовлению пиццы', url: PAGE_URL }
    ])
  ]
}

function trackGoal(goal: string) {
  try {
    window.ym?.('103585127', 'reachGoal', goal)
  } catch {
    return
  }
}

function trackLandingButton(event: React.MouseEvent<HTMLDivElement>) {
  const target = event.target
  if (!(target instanceof Element)) return
  const button = target.closest<HTMLElement>('[data-button]')
  if (!button || !event.currentTarget.contains(button)) return
  const buttonName = button.dataset.button
  if (buttonName) trackGoal(`button_${buttonName}`)
}

function formatPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (!digits.startsWith('7')) digits = `7${digits}`
  digits = digits.slice(0, 11)
  const local = digits.slice(1)
  const first = local.slice(0, 3)
  const second = local.slice(3, 6)
  const third = local.slice(6, 8)
  const fourth = local.slice(8, 10)
  return `+7${first ? ` (${first}` : ''}${second ? `) ${second}` : ''}${third ? `-${third}` : ''}${fourth ? `-${fourth}` : ''}`
}

function isPhoneComplete(phone: string): boolean {
  return phone.replace(/\D/g, '').length === 11
}

function Stars() {
  return (
    <span className={styles.stars} aria-label="Оценка 5 из 5">
      {[0, 1, 2, 3, 4].map(star => <IconStar key={star} size={16} fill="currentColor" aria-hidden="true" />)}
    </span>
  )
}

export const MasterclassPizzaLanding: React.FC = () => {
  const [openFaq, setOpenFaq] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    const linkId = 'v1-masterclass-manrope-font'
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isPhoneComplete(phone) || status === 'submitting') return
    setStatus('submitting')
    const sent = await sendKidsBirthdayLead({
      name,
      phone,
      city: 'Волжск',
      sourcePage: 'v1/master-klass',
      leadType: 'MASTERCLASS_PIZZA',
      comment: 'Мастер-класс по пицце для группы от 10 человек. Дату и состав группы уточнит администратор.'
    })
    if (sent) {
      trackGoal('v1_masterklass_form_submit')
      trackGoal('Lead_masterklass')
      setStatus('success')
    } else {
      setStatus('error')
    }
  }


  return (
    <div className={styles.page} onClick={trackLandingButton}>
      <SEOHead
        page="v1-master-klass"
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        keywords={[
          'мастер-класс по приготовлению пиццы Волжск',
          'мастер-класс по пицце для детей',
          'кулинарный мастер-класс Волжск',
          'детский мастер-класс пицца',
          'научиться готовить пиццу',
          'мастер-класс для детей и взрослых',
          'юный пиццамейкер Волжск',
          'куда сходить с ребёнком в Волжске'
        ]}
        ogImage={MEDIA.og}
        canonical={PAGE_URL}
        structuredData={STRUCTURED_DATA}
      />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logoGroup} aria-label="Dimbo — на главную" data-button="home">
            <span className={styles.logoBadge}><IconPizza size={25} aria-hidden="true" /></span>
            <span className={styles.logoText}>Dimbo<small>Волжск</small></span>
          </a>
          <div className={styles.headerCta}>
            <a href={`tel:${PHONE_TEL}`} className={styles.phoneLink} data-button="call">
              <IconPhone size={18} aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className={styles.headerMsgBtn} aria-label="Написать в MAX" title="Написать в MAX" data-button="max">
              <IconMessageCircle size={20} aria-hidden="true" />
            </a>
            <a href="#booking" className={`${styles.btn} ${styles.btnDark} ${styles.btnSm}`} data-button="signup">Записаться</a>
          </div>
        </div>
      </header>

      <main>
        <section className={`${styles.fullBleed} ${styles.heroBlock}`} aria-labelledby="masterclass-title">
          <div className={`${styles.wrap} ${styles.heroWrap}`}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <h1 id="masterclass-title">Мастер-класс по приготовлению пиццы в Волжске</h1>
                <p className={styles.heroLead}>Кулинарное занятие для компаний от 10 человек. За 50 минут каждый гость приготовит собственную пиццу вместе с наставником Dimbo.</p>
                <ul className={styles.heroFacts} aria-label="Кратко о мастер-классе">
                  <li><IconUsersGroup size={19} aria-hidden="true" />Группа от 10 человек</li>
                  <li><IconClock size={19} aria-hidden="true" />50 минут</li>
                  <li><IconUsers size={19} aria-hidden="true" />Дети от 5 лет и взрослые</li>
                  <li><IconPizza size={19} aria-hidden="true" />Своя пицца</li>
                </ul>
                <div className={styles.heroActions}>
                  <a href="#booking" className={`${styles.btn} ${styles.btnDark}`} data-button="contact">Оставить заявку<IconArrowRight size={19} aria-hidden="true" /></a>
                  <a href="#program" className={styles.textLink} data-button="program">Как всё проходит</a>
                </div>
              </div>
              <div className={styles.heroImg}>
                <img src={MEDIA.hero} alt="Дети с наставником готовят пиццу на мастер-классе Dimbo" width="1200" height="1600" fetchPriority="high" decoding="async" />
                <div className={styles.heroChip}><IconChefHat size={19} aria-hidden="true" />Каждый готовит сам</div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.wrap}>
          <div className={styles.stripWrap}>
            <div className={styles.stripGrid}>
              <article className={`${styles.stripCard} ${styles.stripPhoto}`}>
                <div className={styles.stripPhotoPh}>
                  <img src={MEDIA.group} alt="Участники выкладывают начинку на тесто" width="800" height="1067" loading="lazy" decoding="async" />
                  <div className={styles.stripPhotoTag}>Цена при записи</div>
                </div>
                <div className={styles.stripPhotoBody}>
                  <h2>Всё включено</h2>
                  <a href="#included" data-button="package">Что получит участник →</a>
                </div>
              </article>
              <article className={`${styles.stripCard} ${styles.stripList}`}>
                <h2>О программе</h2>
                <ul>
                  <li><span className={styles.dot}></span>Работаем с тестом и начинкой</li>
                  <li><span className={styles.dot}></span>Готовим под руководством наставника</li>
                  <li><span className={styles.dot}></span>Пиццу выпекает персонал</li>
                  <li><span className={styles.dot}></span>Забираем диплом пиццамейкера</li>
                </ul>
              </article>
              <article className={`${styles.stripCard} ${styles.stripRating}`}>
                <Stars />
                <div className={styles.stripRatingNum}>5.0</div>
                <p>«Вкусно, весело, много активностей и чисто! Видно, что всё сделано с любовью и с душой»</p>
                <div className={styles.stripRatingWho}>Дарья Р. · Яндекс.Карты</div>
              </article>
            </div>
          </div>
        </div>

        <section className={styles.section} id="program" aria-labelledby="program-title">
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle} id="program-title">От теста до первого кусочка — сами</h2>
            <div className={styles.includeGrid}>
              <article className={styles.includeCard}>
                <div className={styles.includeNum}>1</div>
                <IconToolsKitchen2 className={styles.includeIcon} size={28} aria-hidden="true" />
                <h3>Раскатываем тесто</h3>
                <p>Наставник показывает, как сформировать ровную основу для будущей пиццы.</p>
              </article>
              <article className={`${styles.includeCard} ${styles.includeCardAlt1}`}>
                <div className={styles.includeNum}>2</div>
                <IconPizza className={styles.includeIcon} size={28} aria-hidden="true" />
                <h3>Выбираем начинку</h3>
                <p>Добавляем соус, сыр и ингредиенты — у каждого получается свой рецепт.</p>
              </article>
              <article className={`${styles.includeCard} ${styles.includeCardAlt2}`}>
                <div className={styles.includeNum}>3</div>
                <IconFlame className={styles.includeIcon} size={28} aria-hidden="true" />
                <h3>Отправляем в печь</h3>
                <p>Выпеканием занимается персонал, а участники наблюдают за результатом.</p>
              </article>
              <article className={`${styles.includeCard} ${styles.includeCardAlt3}`}>
                <div className={styles.includeNum}>4</div>
                <IconCertificate className={styles.includeIcon} size={28} aria-hidden="true" />
                <h3>Пробуем и празднуем</h3>
                <p>Едим свою пиццу или забираем домой и получаем диплом пиццамейкера.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.sectionCompact} aria-labelledby="experience-title">
          <div className={styles.wrap}>
            <div className={styles.experienceBanner}>
              <div className={styles.experienceText}>
                <h2 id="experience-title">Не мастер-класс «посмотреть», а настоящий опыт «приготовить»</h2>
                <p>Ребёнок пробует новую роль, учится работать по шагам и видит результат своего труда. Взрослым тоже есть чем заняться: пиццу можно приготовить вместе.</p>
                <a href="#booking" className={`${styles.btn} ${styles.btnYellow}`} data-button="booking">Хочу на мастер-класс</a>
              </div>
              <div className={styles.experienceImg}>
                <img src={MEDIA.dough} alt="Дети самостоятельно формуют основы для пиццы" width="800" height="1067" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="formats-title">
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle} id="formats-title">Мастер-класс для вашей компании от 10 человек</h2>
            <div className={styles.formatGrid}>
              <article className={styles.formatCard}>
                <span className={styles.formatIcon}><IconUsers size={28} aria-hidden="true" /></span>
                <h3>Для детей и родителей</h3>
                <p>Семейные, детские и дружеские компании от 10 участников. Дети от 5 лет и взрослые готовят с удовольствием.</p>
                <button type="button" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} data-button="format_family">Выбрать формат<IconArrowRight size={18} aria-hidden="true" /></button>
              </article>
              <article className={`${styles.formatCard} ${styles.formatCardAccent}`}>
                <span className={styles.formatIcon}><IconCertificate size={28} aria-hidden="true" /></span>
                <h3>На день рождения</h3>
                <p>Совместите кулинарное занятие и угощение: праздничная программа обсуждается при записи.</p>
                <button type="button" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} data-button="format_birthday">Обсудить праздник<IconArrowRight size={18} aria-hidden="true" /></button>
              </article>
              <article className={styles.formatCard}>
                <span className={styles.formatIcon}><IconSchool size={28} aria-hidden="true" /></span>
                <h3>С классом или группой</h3>
                <p>Для школьников, организованных детских групп и взрослых компаний от 10 человек.</p>
                <button type="button" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} data-button="format_group">Запросить программу<IconArrowRight size={18} aria-hidden="true" /></button>
              </article>
            </div>
          </div>
        </section>

        <div className={styles.ribbonDivider} aria-hidden="true">
          <div className={styles.ribbonTrack}>
            <span>ТЕСТО · СОУС · НАЧИНКА · ПЕЧЬ · СВОЯ ПИЦЦА ·&nbsp;</span>
            <span>ТЕСТО · СОУС · НАЧИНКА · ПЕЧЬ · СВОЯ ПИЦЦА ·&nbsp;</span>
            <span>ТЕСТО · СОУС · НАЧИНКА · ПЕЧЬ · СВОЯ ПИЦЦА ·&nbsp;</span>
            <span>ТЕСТО · СОУС · НАЧИНКА · ПЕЧЬ · СВОЯ ПИЦЦА ·&nbsp;</span>
          </div>
        </div>

        <section className={`${styles.fullBleed} ${styles.priceBlock}`} id="included" aria-labelledby="included-title">
          <div className={`${styles.wrap} ${styles.priceWrap}`}>
            <div className={styles.priceHead}>
              <h2 id="included-title">Одно занятие. Всё для шедевра</h2>
              <p>Точную стоимость и свободные даты администратор сообщит до бронирования.</p>
            </div>
            <div className={styles.priceCardSingle}>
              <span className={styles.priceLabel}><IconChefHat size={20} aria-hidden="true" />МАСТЕР-КЛАСС ПО ПИЦЦЕ</span>
              <div className={styles.priceNum}>По заявке</div>
              <ul className={styles.priceList}>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>50 минут с наставником</li>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>Продукты и кулинарный инвентарь</li>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>Работа с тестом, соусом и начинкой</li>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>Выпекание пиццы персоналом</li>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>Собственная пицца — на месте или с собой</li>
                <li><span className={styles.check}><IconCheck size={14} aria-hidden="true" /></span>Диплом пиццамейкера</li>
              </ul>
              <div className={styles.priceNote}>Основной формат — группа от 10 человек. Перед подтверждением записи вы узнаете полную стоимость и условия оплаты.</div>
              <a href="#booking" className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`} data-button="booking">Узнать стоимость и даты</a>
            </div>
          </div>
        </section>

        <section className={styles.section} id="booking" aria-labelledby="booking-title">
          <div className={styles.wrap}>
            <div className={styles.bookingSplit}>
              <div className={styles.bookingLeft}>
                <h2 id="booking-title">Планируете мастер-класс для компании?</h2>
                <p>Оставьте только имя и телефон. Администратор уточнит дату, состав группы от 10 человек и стоимость, затем свяжется с вами для подтверждения.</p>
                <ul>
                  <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Подберём формат под возраст и компанию</li>
                  <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Сообщим стоимость до подтверждения</li>
                  <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Ответим на вопросы о продуктах и программе</li>
                </ul>
                <div className={styles.bookingContact}>
                  <IconPhone size={20} aria-hidden="true" />
                  <span>Удобнее позвонить?<br /><a href={`tel:${PHONE_TEL}`} data-button="call">{PHONE_DISPLAY}</a></span>
                </div>
              </div>
              <div className={styles.bookingRight}>
                {status === 'success' ? (
                  <div className={styles.successBlock} role="status">
                    <span className={styles.successIcon}><IconCheck size={30} aria-hidden="true" /></span>
                    <h3>Заявка отправлена</h3>
                    <p>Спасибо, {name || 'мы получили ваши контакты'}! Администратор свяжется с вами, чтобы подтвердить дату и стоимость.</p>
                    <p>Если MAX не открылся автоматически, перейдите по кнопке:</p>
                    <div className={styles.successActions}>
                      <a href={MAX_LINK} className={`${styles.btn} ${styles.btnMax}`} data-button="max">Открыть MAX</a>
                    </div>
                    <button type="button" className={styles.textButton} onClick={() => setStatus('idle')} data-button="new_request">Отправить ещё одну заявку</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate={false}>

                    <div className={styles.formField}>
                      <label htmlFor="masterclass-name">Ваше имя</label>
                      <input id="masterclass-name" type="text" autoComplete="name" placeholder="Как к вам обращаться" value={name} onChange={event => setName(event.target.value)} required />
                    </div>
                    <div className={styles.formField}>
                      <label htmlFor="masterclass-phone">Телефон</label>
                      <input id="masterclass-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" value={phone} maxLength={18} onChange={event => setPhone(formatPhoneInput(event.target.value))} aria-describedby={!isPhoneComplete(phone) && phone.length > 12 ? 'masterclass-phone-error' : undefined} required aria-invalid={!isPhoneComplete(phone) && phone.length > 12} />
                      {!isPhoneComplete(phone) && phone.length > 12 && <span className={styles.fieldError} id="masterclass-phone-error">Введите 10 цифр номера после +7</span>}
                    </div>
                    <label className={styles.consent}>
                      <input type="checkbox" required defaultChecked />
                      <span>Согласен на обработку персональных данных по <a href="/privacy" target="_blank" rel="noopener noreferrer">политике конфиденциальности</a>.</span>
                    </label>
                    {status === 'error' && (
                      <div className={styles.formError} role="alert">
                        <IconAlertCircle size={20} aria-hidden="true" />
                        <span>Заявка не отправилась. Попробуйте ещё раз или позвоните: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.</span>
                      </div>
                    )}
                    <button type="submit" className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`} disabled={status === 'submitting' || !isPhoneComplete(phone)} data-button="form_submit">
                      {status === 'submitting' ? <><IconLoader2 className={styles.spinner} size={20} aria-hidden="true" />Отправляем…</> : <>Оставить заявку<IconArrowRight size={19} aria-hidden="true" /></>}
                    </button>
                    <p className={styles.formNote}>Оплата на сайте не требуется. Сначала подтвердим дату и стоимость.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionCompact} aria-labelledby="gallery-title">
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle} id="gallery-title">Вот как это выглядит в Dimbo</h2>
            <div className={styles.galleryGrid}>
              <figure>
                <img src={MEDIA.dough} alt="Дети раскатывают тесто на мастер-классе по пицце" width="800" height="1067" loading="lazy" decoding="async" />
                <figcaption>Формуем основу</figcaption>
              </figure>
              <figure>
                <img src={MEDIA.group} alt="Наставник помогает участникам приготовить пиццу" width="800" height="1067" loading="lazy" decoding="async" />
                <figcaption>Добавляем начинку</figcaption>
              </figure>
              <figure>
                <img src={MEDIA.creative} alt="Участники украшают коробки для своей пиццы" width="800" height="1067" loading="lazy" decoding="async" />
                <figcaption>Добавляем творчества</figcaption>
              </figure>
              <figure>
                <img src={MEDIA.participants} alt="Довольные юные пиццамейкеры с заготовками для пиццы" width="800" height="1067" loading="lazy" decoding="async" />
                <figcaption>Гордимся результатом</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {MASTERCLASS_VIDEO_URL && (
          <section className={styles.sectionCompact} aria-labelledby="video-title">
            <div className={styles.wrap}>
              <h2 className={styles.sectionTitle} id="video-title">Посмотрите, как проходит мастер-класс</h2>
              <video className={styles.masterclassVideo} controls playsInline preload="metadata" poster={MEDIA.hero} aria-label="Видео мастер-класса по приготовлению пиццы в Dimbo">
                <source src={MASTERCLASS_VIDEO_URL} type="video/mp4" />
                Ваш браузер не поддерживает видео. Откройте ролик по <a href={MASTERCLASS_VIDEO_URL}>ссылке</a>.
              </video>
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="reviews-title">
          <div className={styles.wrap}>
            <div className={styles.reviewsHead}>
              <div>
                <h2 className={styles.sectionTitleLeft} id="reviews-title">Что говорят гости Dimbo</h2>
                <p className={styles.sectionLead}>Реальные отзывы на Яндекс.Картах</p>
              </div>
              <a href={YANDEX_REVIEWS_LINK} target="_blank" rel="noopener noreferrer" className={styles.reviewsScore} data-button="yandex_maps">
                <Stars />
                <span className={styles.reviewsScoreNum}>5.0</span>
                <span className={styles.reviewsScoreMeta}>87 отзывов<br />Яндекс.Карты</span>
              </a>
            </div>
            <div className={styles.reviewGrid}>
              {REVIEWS.map(review => (
                <article key={review.name} className={styles.reviewCard}>
                  <Stars />
                  <p className={styles.reviewText}>{review.text}</p>
                  <div className={styles.reviewWho}>
                    <div className={styles.reviewAvatar} style={{ background: review.color }}>{review.initials}</div>
                    <div><div className={styles.reviewName}>{review.name}</div><div className={styles.reviewMeta}>Яндекс.Карты</div></div>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.reviewsMore}>
              <a href={YANDEX_REVIEWS_LINK} target="_blank" rel="noopener noreferrer" data-button="yandex_maps">Смотреть все отзывы на Яндекс.Картах<IconArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className={styles.sectionCompact} id="faq" aria-labelledby="faq-title">
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle} id="faq-title">Частые вопросы о мастер-классе</h2>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <article key={item.q} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                    <h3>
                      <button type="button" className={styles.faqQ} data-button={`faq_${index + 1}`} onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`}>
                        <span className={styles.faqLabel}>{item.q}</span>
                        <span className={styles.faqIcon}><IconChevronDown size={20} aria-hidden="true" /></span>
                      </button>
                    </h3>
                    <div className={styles.faqA} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen}>
                      <div><p>{item.a}</p></div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contacts-title">
          <div className={styles.wrap}>
            <div className={styles.contactBlock}>
              <div>
                <h2 id="contacts-title">Остались вопросы? Поговорим</h2>
                <p className={styles.contactLead}>Расскажем о программе, свободных датах и стоимости. Выберите удобный способ связи.</p>
              </div>
              <div className={styles.contactRow}>

                <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className={`${styles.contactPill} ${styles.contactMax}`} data-button="max"><IconMessageCircle size={20} aria-hidden="true" />MAX</a>
                <a href={`tel:${PHONE_TEL}`} className={`${styles.contactPill} ${styles.contactPhone}`} data-button="call"><IconPhone size={20} aria-hidden="true" />{PHONE_DISPLAY}</a>
              </div>
            </div>

            <div className={styles.mapBlock}>
              <div className={styles.mapFrame}>
                <iframe src="https://yandex.ru/map-widget/v1/?ll=48.332228%2C55.868031&z=16&pt=48.332228,55.868031,pm2rdm" width="100%" height="100%" style={{ border: 0, display: 'block' }} loading="lazy" title="Dimbo на карте — Волжск, ул. Шестакова, 1Б" />
                <a href={YANDEX_MAPS_LINK} target="_blank" rel="noopener noreferrer" className={styles.mapOverlay} data-button="yandex_maps">
                  <IconMapPin size={21} aria-hidden="true" />
                  <span><strong>Dimbo на Яндекс.Картах</strong><small>Открыть карту и построить маршрут</small></span>
                  <IconArrowRight size={19} aria-hidden="true" />
                </a>
              </div>
              <div className={styles.mapInfo}>
                <div className={styles.mapInfoTitle}><IconBuildingStore size={24} aria-hidden="true" />Dimbo, ул. Шестакова, 1Б</div>
                <div className={styles.mapInfoRow}><IconStar size={19} aria-hidden="true" />5,0 · 87 отзывов на Яндекс.Картах</div>
                <div className={styles.mapInfoRow}><IconMapPin size={19} aria-hidden="true" />Волжск, рядом со школой № 7</div>
                <div className={styles.mapInfoRow}><IconClock size={19} aria-hidden="true" />Пн–Пт 11:00–20:00, Сб–Вс 10:00–20:00</div>
                <div className={styles.mapInfoRow}><IconUsersGroup size={19} aria-hidden="true" />Дети от 5 лет и взрослые</div>
                <a href={YANDEX_MAPS_LINK} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`} data-button="route">Проложить маршрут<IconArrowRight size={19} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <a href="/">Главная</a><span>/</span><a href="/dimbokids">ДИМБО детям</a><span>/</span><span aria-current="page">Мастер-класс по пицце</span>
          </nav>
          <div className={styles.footerGrid}>
            <div>
              <h2>Dimbo</h2>
              <p>Мастер-классы по приготовлению пиццы в Волжске для групп от 10 человек. Дети от 5 лет и взрослые. 50 минут — и своя пицца готова.</p>
              <a href="#booking" className={`${styles.btn} ${styles.btnDark}`} data-button="booking">Записаться на мастер-класс</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>На этой странице</div>
              <a href="#program" data-button="program">Программа</a>
              <a href="#included" data-button="pricing">Что входит</a>
              <a href="#faq" data-button="faq">Вопросы и ответы</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Полезное</div>
              <a href="/master-klass-po-pitstse-dlya-detey">Мастер-класс по пицце для детей</a>
              <a href="/kulinarnyy-master-klass-dlya-detey">О пользе кулинарных занятий</a>
              <a href="/v1/volzhsk">Детский день рождения в Dimbo</a>
            </div>
          </div>
          <div className={styles.footerBottom}>© {new Date().getFullYear()} ДИМБО Пицца, Волжск · <a href="/privacy">Политика конфиденциальности</a> · Информация не является публичной офертой</div>
        </div>
      </footer>

      <div className={styles.stickyCta}>
        <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnMax}`} data-button="max"><IconMessageCircle size={20} aria-hidden="true" />Написать в MAX</a>
        <a href={`tel:${PHONE_TEL}`} className={`${styles.btn} ${styles.btnYellow}`} data-button="call"><IconPhone size={20} aria-hidden="true" />Позвонить</a>
      </div>
    </div>
  )
}

export default MasterclassPizzaLanding
