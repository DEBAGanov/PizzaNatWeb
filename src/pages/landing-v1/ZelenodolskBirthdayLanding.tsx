/**
 * @file: ZelenodolskBirthdayLanding.tsx
 * @description: Самостоятельный лендинг "Детский день рождения в Dimbo" (Зеленодольск, ул. Татарстан 9).
 *   Собственный дизайн (не Mantine), переносной шаблон — при повторном использовании под другой
 *   город/площадку копировать с заменой контента/медиа-префикса S3, а не переиспользовать напрямую.
 * @dependencies: SEOHead, schemaOrg, s3.twcstorage.ru/f9c8e17a-pizzanat-products/v1-zelenodolsk
 * @created: 2026-10-19
 */

import React, { useEffect, useRef, useState } from 'react'
import { SEOHead } from '../../components/SEOHead'
import { generateServiceSchema, generateFAQSchema, insertSchemaMarkup } from '../../utils/schemaOrg'
import { sendKidsBirthdayLead } from '../../services/kidsBirthdayLeadApi'
import styles from './ZelenodolskBirthdayLanding.module.css'

const MEDIA_BASE = 'https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/v1-zelenodolsk/images'
const PHONE_DISPLAY = '8-906-138-28-68'
const PHONE_TEL = '+79061382868'
const PHONE_DIGITS = '79061382868'
const MAX_LINK = 'https://max.ru/u/f9LHodD0cOKxpjw07EONyTZbGCq46uFIkZ3n57GttGEis2FFLNig0E_6gxA'

const WHATSAPP_TEXT = encodeURIComponent('Здравствуйте! Хочу узнать подробности и забронировать детский день рождения в Dimbo Зеленодольск.')
const whatsappLink = (extra?: string) =>
  `https://wa.me/${PHONE_DIGITS}?text=${extra ? encodeURIComponent(extra) : WHATSAPP_TEXT}`

function trackGoal(goal: string) {
  try {
    window.ym?.(103585127, 'reachGoal', goal)
  } catch {
    // Яндекс.Метрика может быть заблокирована — не прерываем сценарий заявки
  }
}

function formatPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (!digits.startsWith('7')) digits = `7${digits}`
  digits = digits.slice(0, 11)
  return `+${digits}`
}

function isPhoneComplete(phone: string): boolean {
  return phone.replace(/\D/g, '').length === 11
}

const AGE_OPTIONS = ['1–3 года', '4–6 лет', '7–10 лет', '10+ лет']

const FAQ_ITEMS = [
  {
    q: 'Можно привести своего аниматора?',
    a: 'Да, конечно. Можно привести своего аниматора или заказать нашего — уточните на этапе брони.'
  },
  {
    q: 'Можно принести свою еду и торт?',
    a: 'Да, можно принести свой торт и угощения — в комнате именинника есть всё для сервировки стола.'
  },
  {
    q: 'Сколько взрослых может прийти?',
    a: 'Родители и гости-взрослые приходят бесплатно и могут находиться в зале всё время праздника.'
  },
  {
    q: 'Что если гостей будет больше 12 детей?',
    a: 'Не проблема — каждый ребёнок сверх 12 человек оплачивается отдельно, 300 ₽.'
  },
  {
    q: 'С какого возраста можно в VR-шлем и на батуты?',
    a: 'Подбираем активности под возраст ребёнка индивидуально — администратор поможет определиться при бронировании.'
  },
  {
    q: 'Нужна ли предоплата?',
    a: 'Да, бронирование даты подтверждается небольшой предоплатой — расскажем детали при оформлении заявки.'
  }
]

export const ZelenodolskBirthdayLanding: React.FC = () => {
  const [isWeekend, setIsWeekend] = useState(true)
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [quizAge, setQuizAge] = useState<string>(AGE_OPTIONS[0])
  const [quizStep, setQuizStep] = useState<'age' | 'date' | 'contacts'>('age')
  const [quizDate, setQuizDate] = useState('')
  const [quizName, setQuizName] = useState('')
  const [quizPhone, setQuizPhone] = useState('+7')
  const [modalAge, setModalAge] = useState<string>(AGE_OPTIONS[0])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalPhone, setModalPhone] = useState('+7')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const shownRef = useRef(false)

  useEffect(() => {
    const linkId = 'v1-zelenodolsk-manrope-font'
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    const schema = generateServiceSchema({
      serviceType: 'Организация детских праздников',
      name: 'Детский день рождения в Dimbo Зеленодольск',
      description:
        'Детский день рождения под ключ в игровом клубе Dimbo (Зеленодольск, ул. Татарстан 9): VR-шлем, жираф-бассейн с шариками, батуты, интерактивная стена-кидалка, отдельная комната именинника.',
      areaServed: ['Зеленодольск']
    })
    const faqSchema = generateFAQSchema(FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a })))
    insertSchemaMarkup({ '@context': 'https://schema.org', '@graph': [schema, faqSchema] })
  }, [])

  useEffect(() => {
    if (shownRef.current) return
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) showExitModal()
    }
    const timer = setTimeout(showExitModal, 60000)
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(timer)
    }
  }, [])

  function showExitModal() {
    if (shownRef.current) return
    shownRef.current = true
    setModalOpen(true)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isPhoneComplete(phone)) return
    trackGoal('v1_zelenodolsk_form_submit')
    trackGoal('Lead_igrovaya')
    sendKidsBirthdayLead({
      name,
      phone,
      city: 'Зеленодольск',
      quizAge,
      sourcePage: 'v1/zelenodolsk',
      comment: 'Форма заявки лендинга'
    })
    window.open(MAX_LINK, '_blank')
  }

  function handleQuizNext() {
    if (!isPhoneComplete(quizPhone)) return
    trackGoal('v1_zelenodolsk_quiz_complete')
    trackGoal('Lead_igrovaya')
    sendKidsBirthdayLead({
      name: quizName,
      phone: quizPhone,
      city: 'Зеленодольск',
      quizAge,
      sourcePage: 'v1/zelenodolsk',
      comment: `Квиз лендинга. Желаемая дата: ${quizDate || '—'}`
    })
    window.open(MAX_LINK, '_blank')
  }

  function handleModalSubmit() {
    if (!isPhoneComplete(modalPhone)) return
    trackGoal('v1_zelenodolsk_exit_modal')
    trackGoal('Lead_igrovaya')
    sendKidsBirthdayLead({
      name: modalName,
      phone: modalPhone,
      city: 'Зеленодольск',
      quizAge: modalAge,
      sourcePage: 'v1/zelenodolsk',
      comment: 'Попап лендинга (exit intent)'
    })
    window.open(MAX_LINK, '_blank')
    setModalOpen(false)
  }

  return (
    <div className={styles.page}>
      <SEOHead
        page="v1-zelenodolsk"
        title="Детский день рождения в Dimbo Зеленодольск под ключ — VR-шлем, батуты, жираф-бассейн"
        description="Детский день рождения в Зеленодольске под ключ от 6 500 ₽: VR-шлем в подарок, жираф-бассейн с шариками, батуты, стена-кидалка. Игровой клуб Dimbo, ул. Татарстан 9. Бронируйте дату онлайн."
        keywords={[
          'детский день рождения зеленодольск',
          'детский день рождения под ключ',
          'детский клуб зеленодольск',
          'где отметить день рождения ребенка зеленодольск',
          'vr квест для детей'
        ]}
        canonical="https://dimbopizza.ru/v1/zelenodolsk"
      />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoGroup}>
            <div className={styles.logoBadge}>🦒</div>
            <div className={styles.logoText}>Dimbo<small>Зеленодольск</small></div>
          </div>
          <div className={styles.headerCta}>
            <a href={`tel:${PHONE_TEL}`} className={styles.phoneLink}>📞 {PHONE_DISPLAY}</a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerMsgBtn}
              aria-label="Написать в WhatsApp"
              title="Написать в WhatsApp"
              onClick={() => trackGoal('v1_zelenodolsk_whatsapp_click')}
            >
              💬
            </a>
            <a href="#quiz" className={`${styles.btn} ${styles.btnDark} ${styles.btnSm}`}>Записаться</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={`${styles.fullBleed} ${styles.heroBlock}`}>
        <div className={styles.wrap} style={{ maxWidth: 1120 }}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1>Детский день рождения в Dimbo под ключ от 6 500 ₽</h1>
              <p className={styles.heroLead}>VR-шлем, жираф-бассейн с шариками, батуты и волшебная стена-кидалка. Вы отдыхаете — мы всё организуем.</p>
              <div><a href="#quiz" className={`${styles.btn} ${styles.btnDark}`}>Связаться с нами</a></div>
            </div>
            <div className={styles.heroImg}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={`${MEDIA_BASE}/video/hero-reel-poster.jpg`}
                aria-label="Дети играют в клубе Dimbo: жираф-бассейн, батуты, стена-кидалка, аэрохоккей"
              >
                <source src={`${MEDIA_BASE}/video/hero-reel.mp4`} type="video/mp4" />
              </video>
              <div className={styles.vrChip}>🥽 VR — в подарок</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-card strip */}
      <div className={styles.wrap}>
        <div className={styles.stripWrap}>
          <div className={styles.stripGrid}>
            <div className={`${styles.stripCard} ${styles.stripPhoto}`}>
              <div className={styles.stripPhotoPh}>
                <img src={`${MEDIA_BASE}/real-giraffe-2.jpg`} alt="Дети на жирафе-бассейне с шариками" />
                <div className={styles.stripPhotoTag}>от 6 500 ₽</div>
              </div>
              <div className={styles.stripPhotoBody}>
                <h4>День рождения под ключ</h4>
                <a href="#pricing">Смотреть пакет →</a>
              </div>
            </div>
            <div className={`${styles.stripCard} ${styles.stripList}`}>
              <h4>О программе праздника</h4>
              <ul>
                <li><span className={styles.dot}></span>Игровая зона на 3 часа</li>
                <li><span className={styles.dot}></span>VR-шлем и стена-кидалка</li>
                <li><span className={styles.dot}></span>Комната именинника</li>
                <li><span className={styles.dot}></span>Администратор и уборка</li>
              </ul>
            </div>
            <div className={`${styles.stripCard} ${styles.stripRating}`}>
              <div className={styles.stripRatingStars}>★★★★★</div>
              <div className={styles.stripRatingNum}>5.0</div>
              <p>«VR-шлем — отдельный восторг! Сын не хотел снимать...»</p>
              <div className={styles.stripRatingWho}>Алина К. · Отзыв клуба</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle}>Что входит в каждый праздник</h2>
          <div className={styles.includeGrid}>
            <div className={styles.includeCard}>
              <div className={styles.includeNum}>1</div>
              <h4>Игровая зона на 3 часа</h4>
              <p>Жираф-бассейн, батуты и мягкие зоны в полном распоряжении</p>
            </div>
            <div className={`${styles.includeCard} ${styles.includeCardAlt1}`}>
              <div className={styles.includeNum}>2</div>
              <h4>VR-шлем в подарок</h4>
              <p>Погружение в игру без доплат — в каждом тарифе</p>
            </div>
            <div className={`${styles.includeCard} ${styles.includeCardAlt2}`}>
              <div className={styles.includeNum}>3</div>
              <h4>Стена-кидалка</h4>
              <p>Интерактивный проектор с играми для всей компании</p>
            </div>
            <div className={`${styles.includeCard} ${styles.includeCardAlt3}`}>
              <div className={styles.includeNum}>4</div>
              <h4>Комната именинника</h4>
              <p>Отдельное место для торта и подарков</p>
            </div>
          </div>
        </div>
      </section>

      {/* VR BANNER */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.wrap}>
          <div className={styles.vrBanner}>
            <div className={styles.vrBannerText}>
              <span className={styles.vrBannerTag}>ГЛАВНЫЙ ХИТ ПРАЗДНИКА</span>
              <h3>Погружение в виртуальную игру — на 100% настоящее приключение</h3>
              <p>Ребёнок надевает VR-шлем — и оказывается внутри сказки: летает, исследует, сражается. Разговоров хватит на неделю вперёд.</p>
            </div>
            <div className={styles.vrBannerImg}>
              <img src={`${MEDIA_BASE}/vr.jpg`} alt="Ребёнок в VR-шлеме радуется" />
            </div>
          </div>
        </div>
      </section>

      {/* RIBBON */}
      <div className={styles.ribbonDivider}>
        <div className={styles.ribbonTrack}>
          <span>ДЕТИ В ВОСТОРГЕ · РОДИТЕЛИ ОТДЫХАЮТ ·</span>
          <span>ДЕТИ В ВОСТОРГЕ · РОДИТЕЛИ ОТДЫХАЮТ ·</span>
          <span>ДЕТИ В ВОСТОРГЕ · РОДИТЕЛИ ОТДЫХАЮТ ·</span>
        </div>
      </div>

      {/* PRICE */}
      <section className={`${styles.fullBleed} ${styles.priceBlock}`} id="pricing">
        <div className={styles.wrap} style={{ maxWidth: 1120 }}>
          <div className={styles.priceHead}>
            <span className={styles.eyebrowPill}>ЧЕСТНАЯ ЦЕНА</span>
            <h2>Один праздник. Всё включено</h2>
            <p>Тариф «День рождения» — без скрытых доплат и сюрпризов</p>
            <div className={styles.toggleRow}>
              <button
                type="button"
                className={`${styles.toggleOpt} ${!isWeekend ? styles.toggleOptActive : ''}`}
                onClick={() => setIsWeekend(false)}
              >
                Будни
              </button>
              <button
                type="button"
                className={`${styles.toggleOpt} ${isWeekend ? styles.toggleOptActive : ''}`}
                onClick={() => setIsWeekend(true)}
              >
                Выходные
              </button>
            </div>
          </div>
          <div className={styles.priceCardSingle}>
            <span className={styles.eyebrowPill} style={{ background: '#FFF3F4', color: '#C73040' }}>🦒 ДЕНЬ РОЖДЕНИЯ</span>
            <div className={styles.priceNum}>{isWeekend ? '7 500 ₽' : '6 500 ₽'}<span> / праздник</span></div>
            <ul className={styles.priceList}>
              <li><span className={styles.check}>✓</span> Закрытая игровая зона на 3 часа</li>
              <li><span className={styles.check}>✓</span> Интерактивная стена-кидалка</li>
              <li><span className={styles.check}>✓</span> Отдельная комната именинника</li>
              <li><span className={styles.check}>✓</span> <strong>VR-шлем — в подарок 🎁</strong></li>
              <li><span className={styles.check}>✓</span> Фотозона</li>
              <li><span className={styles.check}>✓</span> Серебряная или цветная ленточная дискотека (на выбор)</li>
              <li><span className={styles.check}>✓</span> Sony PlayStation</li>
              <li><span className={styles.check}>✓</span> Караоке</li>
              <li><span className={styles.check}>✓</span> Танцы Just Dance</li>
              <li><span className={styles.check}>✓</span> Много игрушек для игр</li>
              <li><span className={styles.check}>✓</span> Музыкальное сопровождение</li>
              <li><span className={styles.check}>✓</span> Микроволновка, термопот, питьевая вода, чай, кофе</li>
              <li><span className={styles.check}>✓</span> Уборка, вынос мусора</li>
            </ul>
            <div className={styles.priceNote}>Тариф рассчитан на 12 детей. Каждый следующий ребёнок — +300 ₽</div>
            <a href="#quiz" className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>Забронировать дату</a>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section className={styles.section} id="quiz" style={{ paddingTop: 0 }}>
        <div className={styles.wrap}>
          <div className={styles.quizSplit}>
            <div className={styles.quizLeft}>
              <h3>Ответьте на 3 вопроса и получите <span className={styles.hl}>подбор праздника</span></h3>
              <ul>
                <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Рекомендация программы под возраст</li>
                <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Свободные даты на удобную неделю</li>
                <li><span className={`${styles.dot} ${styles.dotCoral}`}></span>Расчёт стоимости в мессенджер</li>
              </ul>
            </div>
            <div className={styles.quizRight}>
              {quizStep === 'age' ? (
                <>
                  <div className={styles.quizStepLabel}>Вопрос 1 из 3</div>
                  <div className={styles.quizQ}>Сколько лет имениннику?</div>
                  <div className={styles.quizOpts}>
                    {AGE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`${styles.quizOpt} ${quizAge === opt ? styles.quizOptSelected : ''}`}
                        onClick={() => setQuizAge(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button type="button" onClick={() => setQuizStep('date')} className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>
                      Далее →
                    </button>
                  </div>
                </>
              ) : quizStep === 'date' ? (
                <>
                  <div className={styles.quizStepLabel}>Вопрос 2 из 3</div>
                  <div className={styles.quizQ}>Когда планируете праздник?</div>
                  <div className={styles.formField}>
                    <label htmlFor="quiz-date">Желаемая дата</label>
                    <input
                      id="quiz-date"
                      type="date"
                      value={quizDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setQuizDate(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button type="button" onClick={() => setQuizStep('contacts')} className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>
                      Далее →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.quizStepLabel}>Вопрос 3 из 3</div>
                  <div className={styles.quizQ}>Забронировать дату</div>
                  <div className={styles.formField}>
                    <label htmlFor="quiz-name">Имя</label>
                    <input id="quiz-name" type="text" placeholder="Как к вам обращаться" value={quizName} onChange={e => setQuizName(e.target.value)} />
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="quiz-phone">Телефон</label>
                    <input
                      id="quiz-phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="+7 (___) ___-__-__"
                      value={quizPhone}
                      maxLength={12}
                      onChange={e => setQuizPhone(formatPhoneInput(e.target.value))}
                      required
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button type="button" onClick={handleQuizNext} className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>
                      Отправить заявку →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle}>Фото с настоящих праздников</h2>
          <div className={styles.galleryGrid}>
            <img src={`${MEDIA_BASE}/real-giraffe-1.jpg`} alt="Дети играют с жирафом-бассейном" />
            <img src={`${MEDIA_BASE}/real-trampoline-1.jpg`} alt="Прыжки на батуте" />
            <img src={`${MEDIA_BASE}/real-wall-1.jpg`} alt="Интерактивная стена-кидалка с игрой" />
            <img src={`${MEDIA_BASE}/real-animator.jpg`} alt="Аниматор поздравляет именинника с тортом" />
            <img src={`${MEDIA_BASE}/real-giraffe-3.jpg`} alt="Дети на жирафе-бассейне" />
            <img src={`${MEDIA_BASE}/real-trampoline-3.jpg`} alt="Дети прыгают на батутах втроём" />
            <img src={`${MEDIA_BASE}/real-wall-2.jpg`} alt="Дети играют у интерактивной стены" />
            <img src={`${MEDIA_BASE}/real-hockey.jpg`} alt="Аэрохоккей в игровой зоне" />
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle}>Посмотрите, как это выглядит вживую</h2>
          <div className={styles.videoGrid}>
            <div className={styles.videoCard}>
              <video controls preload="none" poster={`${MEDIA_BASE}/video/giraffe-poster.jpg`} playsInline>
                <source src={`${MEDIA_BASE}/video/giraffe.mp4`} type="video/mp4" />
              </video>
              <div className={styles.videoLabel}>🦒 Жираф-бассейн</div>
            </div>
            <div className={styles.videoCard}>
              <video controls preload="none" poster={`${MEDIA_BASE}/video/trampoline-poster.jpg`} playsInline>
                <source src={`${MEDIA_BASE}/video/trampoline.mp4`} type="video/mp4" />
              </video>
              <div className={styles.videoLabel}>🤸 Батуты</div>
            </div>
            <div className={styles.videoCard}>
              <video controls preload="none" poster={`${MEDIA_BASE}/video/wall-poster.jpg`} playsInline>
                <source src={`${MEDIA_BASE}/video/wall.mp4`} type="video/mp4" />
              </video>
              <div className={styles.videoLabel}>🧱 Стена-кидалка</div>
            </div>
            <div className={styles.videoCard}>
              <video controls preload="none" poster={`${MEDIA_BASE}/video/hockey-poster.jpg`} playsInline>
                <source src={`${MEDIA_BASE}/video/hockey.mp4`} type="video/mp4" />
              </video>
              <div className={styles.videoLabel}>🏒 Аэрохоккей</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.reviewsHead}>
            <div>
              <span className={styles.eyebrowPill} style={{ background: '#EDE5FB' }}>ОТЗЫВЫ РОДИТЕЛЕЙ</span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left', margin: '14px 0 0' }}>Что говорят мамы</h2>
            </div>
            <div className={styles.reviewsScore}>
              <div className={styles.reviewStars} style={{ color: '#FFC627', fontSize: 20 }}>★★★★★</div>
              <div className={styles.reviewsScoreNum}>5.0</div>
              <div style={{ fontSize: 13, color: '#635749', fontWeight: 700 }}>19 отзывов<br />Яндекс.Карты</div>
            </div>
          </div>
          <div className={styles.reviewGrid}>
            <div className={`${styles.card} ${styles.reviewCard}`}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>«Сын был в VR-шлеме минут 40, не хотел снимать! Жираф с шариками — отдельный восторг для младшей. Организовано супер чётко.»</p>
              <div className={styles.reviewWho}>
                <div className={styles.reviewAvatar} style={{ background: '#FFC627', color: '#4A3F38' }}>АК</div>
                <div><div className={styles.reviewName}>Алина К.</div><div className={styles.reviewMeta}>дочке 6 лет</div></div>
              </div>
            </div>
            <div className={`${styles.card} ${styles.reviewCard}`}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>«Привели 14 детей, доплатили символически. Администратор сама предложила удобный слот. Будем праздновать здесь и дальше.»</p>
              <div className={styles.reviewWho}>
                <div className={styles.reviewAvatar} style={{ background: '#6B47C2' }}>МС</div>
                <div><div className={styles.reviewName}>Марина С.</div><div className={styles.reviewMeta}>Яндекс.Карты</div></div>
              </div>
            </div>
            <div className={`${styles.card} ${styles.reviewCard}`}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>«Стена-кидалка взорвала мозг не только детям, но и папам на празднике 😄 Фотозона классная, все фото живые.»</p>
              <div className={styles.reviewWho}>
                <div className={styles.reviewAvatar} style={{ background: '#1A8574' }}>РВ</div>
                <div><div className={styles.reviewName}>Регина В.</div><div className={styles.reviewMeta}>Яндекс.Карты</div></div>
              </div>
            </div>
            <div className={`${styles.card} ${styles.reviewCard}`}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>«Чисто, светло, просторно. Всё новое. Разделены игровая зона и комната именинника — очень удобно для родителей.»</p>
              <div className={styles.reviewWho}>
                <div className={styles.reviewAvatar} style={{ background: '#C73040' }}>ГМ</div>
                <div><div className={styles.reviewName}>Гулия М.</div><div className={styles.reviewMeta}>2ГИС</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle}>Вопросы, которые чаще всего задают мамы</h2>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.q} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className={styles.faqNum}>{i + 1}</span>
                  <span className={styles.faqLabel}>{item.q}</span>
                  <span className={styles.faqIcon}>+</span>
                </button>
                <div className={styles.faqA}><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.formBlock}>
            <div>
              <h2>Оставьте заявку</h2>
              <p className={styles.formLead}>Напишите в мессенджер или оставьте контакты. Подтвердим дату за 2 минуты.</p>
              <div className={styles.contactRow}>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactPill}
                  style={{ background: '#136832' }}
                  onClick={() => trackGoal('v1_zelenodolsk_whatsapp_click')}
                >
                  WhatsApp
                </a>
                <a href={`tel:${PHONE_TEL}`} className={styles.contactPill} style={{ background: '#4A3F38' }}>
                  📞 {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <form className={styles.formCard} onSubmit={handleFormSubmit}>
              <div className={styles.formField}>
                <label htmlFor="landing-name">Имя</label>
                <input id="landing-name" type="text" placeholder="Как к вам обращаться" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="landing-phone">Телефон</label>
                <input
                  id="landing-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  maxLength={12}
                  onChange={e => setPhone(formatPhoneInput(e.target.value))}
                  required
                />
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>Отправить заявку</button>
              <p className={styles.formNote}>Заявка будет отправлена нам, а вы перейдёте в MAX для связи с администратором.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <div>
              <h4>Dimbo</h4>
              <p>Детский день рождения в Зеленодольске под ключ — VR-шлем, батуты, жираф-бассейн и игровая зона.</p>
              <a href="#quiz" className={`${styles.btn} ${styles.btnDark}`}>Забронировать дату</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Разделы</div>
              <a href="#pricing">Цены</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Клуб</div>
              <div>г. Зеленодольск, ул. Татарстан, 9</div>
              <div>{PHONE_DISPLAY}</div>
              <div>Пн–Вс без выходных</div>
            </div>
          </div>
          <div className={styles.footerBottom}>© 2026 Детский клуб Dimbo, Зеленодольск · Информация не является публичной офертой</div>
        </div>
      </footer>

      <div className={styles.stickyCta}>
        <a
          href={MAX_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
          style={{ background: '#136832', color: '#fff' }}
          onClick={() => trackGoal('v1_zelenodolsk_max_click')}
        >
          💬 Написать в MAX
        </a>
        <a href={`tel:${PHONE_TEL}`} className={`${styles.btn} ${styles.btnYellow}`} onClick={() => trackGoal('v1_zelenodolsk_call_click')}>
          📞 Позвонить
        </a>
      </div>

      {modalOpen && (
        <div className={`${styles.modalOverlay} ${styles.modalOverlayActive}`} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false) }}>
          <div className={styles.modalBox}>
            <button className={styles.modalClose} onClick={() => setModalOpen(false)}>✕</button>
            <div className={styles.modalTimer}>⏱ Подарок ждёт 10 минут</div>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>Погодите! 🎁</h3>
            <p style={{ color: '#635749', marginBottom: 20, fontSize: 15, fontWeight: 600 }}>Оставьте заявку сейчас — подарим фотосессию на празднике бесплатно.</p>
            <div className={styles.quizOpts} style={{ marginBottom: 16 }}>
              {AGE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`${styles.quizOpt} ${modalAge === opt ? styles.quizOptSelected : ''}`}
                  onClick={() => setModalAge(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className={styles.formField}>
              <label htmlFor="modal-name">Имя</label>
              <input id="modal-name" type="text" placeholder="Как к вам обращаться" value={modalName} onChange={e => setModalName(e.target.value)} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="modal-phone">Телефон</label>
              <input
                id="modal-phone"
                type="tel"
                inputMode="numeric"
                placeholder="+7 (___) ___-__-__"
                value={modalPhone}
                maxLength={12}
                onChange={e => setModalPhone(formatPhoneInput(e.target.value))}
                required
              />
            </div>
            <button type="button" onClick={handleModalSubmit} className={`${styles.btn} ${styles.btnDark} ${styles.btnBlock}`}>
              Получить подарок
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ZelenodolskBirthdayLanding
