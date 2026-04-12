/**
 * @file: App.tsx
 * @description: Главный компонент приложения PizzaNat Web с роутингом
 * @dependencies: Mantine, AuthContext, React Router, страницы
 * @created: 2024-12-19
 */

import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { useAuth } from './contexts/AuthContext'
import { useProducts } from './contexts/ProductsContext'
import { TelegramProvider, useIsTelegram } from './contexts/TelegramContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { YandexMetrikaProvider } from './components/analytics/YandexMetrika'
import { VKPixelProvider } from './components/analytics/VKPixel'
import { TelegramApp } from './components/telegram/TelegramApp'
import { TelegramBottomNav } from './components/telegram/TelegramNavigation'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { CategoryProductsPage } from './pages/CategoryProductsPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import { AuthTestPage } from './pages/AuthTestPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import { DimboKidsPage } from './pages/DimboKidsPage'
// SEO-страницы — lazy loading для code splitting
const PizzaSEOPage = lazy(() => import('./pages/product-seo/PizzaSEOPage').then(m => ({ default: m.PizzaSEOPage })))
const ShashlykSEOPage = lazy(() => import('./pages/product-seo/ShashlykSEOPage').then(m => ({ default: m.ShashlykSEOPage })))
const SushiSEOPage = lazy(() => import('./pages/product-seo/SushiSEOPage').then(m => ({ default: m.SushiSEOPage })))
const BurgerSEOPage = lazy(() => import('./pages/product-seo/BurgerSEOPage').then(m => ({ default: m.BurgerSEOPage })))
const WingsSEOPage = lazy(() => import('./pages/product-seo/WingsSEOPage').then(m => ({ default: m.WingsSEOPage })))
const FriesSEOPage = lazy(() => import('./pages/product-seo/FriesSEOPage').then(m => ({ default: m.FriesSEOPage })))
const FoodSEOPage = lazy(() => import('./pages/product-seo/FoodSEOPage').then(m => ({ default: m.FoodSEOPage })))
const ShortKeywordSEOPage = lazy(() => import('./pages/product-seo/ShortKeywordSEOPage').then(m => ({ default: m.ShortKeywordSEOPage })))
const NuggetsSEOPage = lazy(() => import('./pages/product-seo/NuggetsSEOPage').then(m => ({ default: m.NuggetsSEOPage })))
const PizzaOrderDeliverySEOPage = lazy(() => import('./pages/product-seo/PizzaOrderDeliverySEOPage').then(m => ({ default: m.PizzaOrderDeliverySEOPage })))
const PizzeriaVolzhskSEOPage = lazy(() => import('./pages/product-seo/PizzeriaVolzhskSEOPage').then(m => ({ default: m.PizzeriaVolzhskSEOPage })))
const PizzeriaLeninaSEOPage = lazy(() => import('./pages/product-seo/PizzeriaLeninaSEOPage').then(m => ({ default: m.PizzeriaLeninaSEOPage })))
const WhereOrderPizzaSEOPage = lazy(() => import('./pages/product-seo/WhereOrderPizzaSEOPage').then(m => ({ default: m.WhereOrderPizzaSEOPage })))
const FoodOrderSEOPage = lazy(() => import('./pages/product-seo/FoodOrderSEOPage').then(m => ({ default: m.FoodOrderSEOPage })))
const DodoPizzaComparisonSEOPage = lazy(() => import('./pages/product-seo/DodoPizzaComparisonSEOPage').then(m => ({ default: m.DodoPizzaComparisonSEOPage })))
const PodslushanoVolzhskSEOPage = lazy(() => import('./pages/product-seo/PodslushanoVolzhskSEOPage').then(m => ({ default: m.PodslushanoVolzhskSEOPage })))
const Volzhsk24SEOPage = lazy(() => import('./pages/product-seo/Volzhsk24SEOPage').then(m => ({ default: m.Volzhsk24SEOPage })))
// Индивидуальные товарные SEO-страницы — lazy
const PitstsaMargaritaSEOPage = lazy(() => import('./pages/product-seo/products/PitstsaMargaritaSEOPage').then(m => ({ default: m.PitstsaMargaritaSEOPage })))
const GribnayaPitstsaSEOPage = lazy(() => import('./pages/product-seo/products/GribnayaPitstsaSEOPage').then(m => ({ default: m.GribnayaPitstsaSEOPage })))
const GavayskayaPitstsaSEOPage = lazy(() => import('./pages/product-seo/products/GavayskayaPitstsaSEOPage').then(m => ({ default: m.GavayskayaPitstsaSEOPage })))
const MyasnayaPitstsaSEOPage = lazy(() => import('./pages/product-seo/products/MyasnayaPitstsaSEOPage').then(m => ({ default: m.MyasnayaPitstsaSEOPage })))
const PitstsaMorskayaSEOPage = lazy(() => import('./pages/product-seo/products/PitstsaMorskayaSEOPage').then(m => ({ default: m.PitstsaMorskayaSEOPage })))
const PitstsaSalyamiSEOPage = lazy(() => import('./pages/product-seo/products/PitstsaSalyamiSEOPage').then(m => ({ default: m.PitstsaSalyamiSEOPage })))
const PitstsaPepperoniSEOPage = lazy(() => import('./pages/product-seo/products/PitstsaPepperoniSEOPage').then(m => ({ default: m.PitstsaPepperoniSEOPage })))
const PitstsaTsezarSEOPage = lazy(() => import('./pages/product-seo/products/PitstsaTsezarSEOPage').then(m => ({ default: m.PitstsaTsezarSEOPage })))
const DomashnyayaPitstsaSEOPage = lazy(() => import('./pages/product-seo/products/DomashnyayaPitstsaSEOPage').then(m => ({ default: m.DomashnyayaPitstsaSEOPage })))
const SyrnayaPitstsaSEOPage = lazy(() => import('./pages/product-seo/products/SyrnayaPitstsaSEOPage').then(m => ({ default: m.SyrnayaPitstsaSEOPage })))
const BurgerDimburgerSEOPage = lazy(() => import('./pages/product-seo/products/BurgerDimburgerSEOPage').then(m => ({ default: m.BurgerDimburgerSEOPage })))
const BurgerChikenburgerSEOPage = lazy(() => import('./pages/product-seo/products/BurgerChikenburgerSEOPage').then(m => ({ default: m.BurgerChikenburgerSEOPage })))
const BurgerChizburgerSEOPage = lazy(() => import('./pages/product-seo/products/BurgerChizburgerSEOPage').then(m => ({ default: m.BurgerChizburgerSEOPage })))
const BurgerDzhuniorSEOPage = lazy(() => import('./pages/product-seo/products/BurgerDzhuniorSEOPage').then(m => ({ default: m.BurgerDzhuniorSEOPage })))
const KartofelFri100GrSEOPage = lazy(() => import('./pages/product-seo/products/KartofelFri100GrSEOPage').then(m => ({ default: m.KartofelFri100GrSEOPage })))
const KartofelFri150GrSEOPage = lazy(() => import('./pages/product-seo/products/KartofelFri150GrSEOPage').then(m => ({ default: m.KartofelFri150GrSEOPage })))
const Nagetsy6ShtukSEOPage = lazy(() => import('./pages/product-seo/products/Nagetsy6ShtukSEOPage').then(m => ({ default: m.Nagetsy6ShtukSEOPage })))
const Nagetsy9ShtukSEOPage = lazy(() => import('./pages/product-seo/products/Nagetsy9ShtukSEOPage').then(m => ({ default: m.Nagetsy9ShtukSEOPage })))
const Nagetsy12ShtukSEOPage = lazy(() => import('./pages/product-seo/products/Nagetsy12ShtukSEOPage').then(m => ({ default: m.Nagetsy12ShtukSEOPage })))
const Krylya6ShtukSEOPage = lazy(() => import('./pages/product-seo/products/Krylya6ShtukSEOPage').then(m => ({ default: m.Krylya6ShtukSEOPage })))
const Krylya9ShtukSEOPage = lazy(() => import('./pages/product-seo/products/Krylya9ShtukSEOPage').then(m => ({ default: m.Krylya9ShtukSEOPage })))
const ZakrytayaPitstsaKlassicheskayaSEOPage = lazy(() => import('./pages/product-seo/products/ZakrytayaPitstsaKlassicheskayaSEOPage').then(m => ({ default: m.ZakrytayaPitstsaKlassicheskayaSEOPage })))
const ZakrytayaPitstsaOkhotnichyaSEOPage = lazy(() => import('./pages/product-seo/products/ZakrytayaPitstsaOkhotnichyaSEOPage').then(m => ({ default: m.ZakrytayaPitstsaOkhotnichyaSEOPage })))
const ZakrytayaPitstsaKurinayaSEOPage = lazy(() => import('./pages/product-seo/products/ZakrytayaPitstsaKurinayaSEOPage').then(m => ({ default: m.ZakrytayaPitstsaKurinayaSEOPage })))
const ZakrytayaPitstsaSyrnayaSEOPage = lazy(() => import('./pages/product-seo/products/ZakrytayaPitstsaSyrnayaSEOPage').then(m => ({ default: m.ZakrytayaPitstsaSyrnayaSEOPage })))
const ZakrytayaPitstsaGavayskayaSEOPage = lazy(() => import('./pages/product-seo/products/ZakrytayaPitstsaGavayskayaSEOPage').then(m => ({ default: m.ZakrytayaPitstsaGavayskayaSEOPage })))
// Детские SEO-страницы Волжск — lazy
const DetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaKidsPage })))
const DetskiyDenRozhdeniyaGdeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaGdeKidsPage })))
const GdeOtmetitDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.GdeOtmetitDetskiyDenRozhdeniyaKidsPage })))
const DetskieAnimatoryNaDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskieAnimatoryNaDenRozhdeniyaKidsPage })))
const MenyuNaDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.MenyuNaDetskiyDenRozhdeniyaKidsPage })))
const DetskiyPodarokNaDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyPodarokNaDenRozhdeniyaKidsPage })))
const OtprazdnovatDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.OtprazdnovatDetskiyDenRozhdeniyaKidsPage })))
const GdeOtprazdnovatDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.GdeOtprazdnovatDetskiyDenRozhdeniyaKidsPage })))
const GdeProvestiDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.GdeProvestiDetskiyDenRozhdeniyaKidsPage })))
const DetskiyKvestNaDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyKvestNaDenRozhdeniyaKidsPage })))
const DetskiyDenRozhdeniyaLetKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaLetKidsPage })))
const PrazdnovanieDetskogoDnyaRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PrazdnovanieDetskogoDnyaRozhdeniyaKidsPage })))
const OtmetitDetskiyDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.OtmetitDetskiyDenRozhdeniyaKidsPage })))
const EdaNaDetskomDneRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.EdaNaDetskomDneRozhdeniyaKidsPage })))
const DetskiyDenRozhdeniyaGodKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaGodKidsPage })))
const PrazdnikDlyaDeteyKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PrazdnikDlyaDeteyKidsPage })))
const GdeOtmetitDrRebenkaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.GdeOtmetitDrRebenkaKidsPage })))
const PozdravlenieSRozhdeniemRebenkaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PozdravlenieSRozhdeniemRebenkaKidsPage })))
const DetskiePodarkiKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiePodarkiKidsPage })))
const ChtoPodaritRebenkuKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.ChtoPodaritRebenkuKidsPage })))
const PodarokMalChikuKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PodarokMalChikuKidsPage })))
const PodarokDevochkeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PodarokDevochkeKidsPage })))
const PodarokDochkeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PodarokDochkeKidsPage })))
const PodarokPodrostkuKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PodarokPodrostkuKidsPage })))
const AnimatoryNaDenRozhdeniyaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.AnimatoryNaDenRozhdeniyaKidsPage })))
const DetskiyPrazdnikKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskiyPrazdnikKidsPage })))
const PrazdnikiVDetskomSaduKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.PrazdnikiVDetskomSaduKidsPage })))
const StsenariyDetskogoPrazdnikaKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.StsenariyDetskogoPrazdnikaKidsPage })))
const OrganizatsiyaDetskihPrazdnikovKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.OrganizatsiyaDetskihPrazdnikovKidsPage })))
const ProvedenieDetskihPrazdnikovKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.ProvedenieDetskihPrazdnikovKidsPage })))
const OrganizatsiyaDetskihPrazdnikovVVolzhskeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.OrganizatsiyaDetskihPrazdnikovVVolzhskeKidsPage })))
const OrganizatsiyaPrazdnikovIMeropriyatiyVVolzhskeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.OrganizatsiyaPrazdnikovIMeropriyatiyVVolzhskeKidsPage })))
const DetskieAnimatoryVVolzhskeKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskieAnimatoryVVolzhskeKidsPage })))
const DetskieAnimatoryNaPrazdnikVolzhskKidsPage = lazy(() => import('./pages/kids-seo').then(m => ({ default: m.DetskieAnimatoryNaPrazdnikVolzhskKidsPage })))

// Зеленодольские детские SEO-страницы — lazy
const DetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaZelenodolskKidsPage })))
const DetskiyDenRozhdeniyaGdeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaGdeZelenodolskKidsPage })))
const GdeOtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.GdeOtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const OtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.OtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const GdeOtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.GdeOtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const GdeProvestiDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.GdeProvestiDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const PrazdnovanieDetskogoDnyaRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PrazdnovanieDetskogoDnyaRozhdeniyaZelenodolskKidsPage })))
const OtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.OtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const DetskieAnimatoryNaDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskieAnimatoryNaDenRozhdeniyaZelenodolskKidsPage })))
const AnimatoryNaDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.AnimatoryNaDenRozhdeniyaZelenodolskKidsPage })))
const DetskieAnimatoryVeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskieAnimatoryVeZelenodolskKidsPage })))
const DetskieAnimatoryNaPrazdnikZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskieAnimatoryNaPrazdnikZelenodolskKidsPage })))
const MenyuNaDetskiyDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.MenyuNaDetskiyDenRozhdeniyaZelenodolskKidsPage })))
const EdaNaDetskomDneRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.EdaNaDetskomDneRozhdeniyaZelenodolskKidsPage })))
const DetskiyPodarokNaDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyPodarokNaDenRozhdeniyaZelenodolskKidsPage })))
const DetskiePodarkiZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiePodarkiZelenodolskKidsPage })))
const ChtoPodaritRebenkuZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.ChtoPodaritRebenkuZelenodolskKidsPage })))
const PodarokMalChikuZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PodarokMalChikuZelenodolskKidsPage })))
const PodarokDevochkeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PodarokDevochkeZelenodolskKidsPage })))
const PodarokDochkeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PodarokDochkeZelenodolskKidsPage })))
const PodarokPodrostkuZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PodarokPodrostkuZelenodolskKidsPage })))
const DetskiyKvestNaDenRozhdeniyaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyKvestNaDenRozhdeniyaZelenodolskKidsPage })))
const PrazdnikDlyaDeteyZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PrazdnikDlyaDeteyZelenodolskKidsPage })))
const DetskiyPrazdnikZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyPrazdnikZelenodolskKidsPage })))
const DetskiyDenRozhdeniyaLetZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaLetZelenodolskKidsPage })))
const DetskiyDenRozhdeniyaGodZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.DetskiyDenRozhdeniyaGodZelenodolskKidsPage })))
const GdeOtmetitDrRebenkaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.GdeOtmetitDrRebenkaZelenodolskKidsPage })))
const OrganizatsiyaDetskikhPrazdnikovZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.OrganizatsiyaDetskikhPrazdnikovZelenodolskKidsPage })))
const ProvedenieDetskikhPrazdnikovZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.ProvedenieDetskikhPrazdnikovZelenodolskKidsPage })))
const OrganizatsiyaDetskikhPrazdnikovVeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.OrganizatsiyaDetskikhPrazdnikovVeZelenodolskKidsPage })))
const OrganizatsiyaPrazdnikovIMeropriyatiyVeZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.OrganizatsiyaPrazdnikovIMeropriyatiyVeZelenodolskKidsPage })))
const PrazdnikiVDetskomSaduZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PrazdnikiVDetskomSaduZelenodolskKidsPage })))
const StsenariyDetskogoPrazdnikaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.StsenariyDetskogoPrazdnikaZelenodolskKidsPage })))
const PozdravlenieSRozhdeniemRebenkaZelenodolskKidsPage = lazy(() => import('./pages/zelenodolsk-kids-seo').then(m => ({ default: m.PozdravlenieSRozhdeniemRebenkaZelenodolskKidsPage })))

// Зеленодольские SEO-страницы доставки — lazy
const DostavkaPizzyZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaPizzyZelenodolskPage').then(m => ({ default: m.DostavkaPizzyZelenodolskPage })))
const ZakazatPizzuZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatPizzuZelenodolskPage').then(m => ({ default: m.ZakazatPizzuZelenodolskPage })))
const DostavkaShashlykaZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaShashlykaZelenodolskPage').then(m => ({ default: m.DostavkaShashlykaZelenodolskPage })))
const ZakazatShashlykZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatShashlykZelenodolskPage').then(m => ({ default: m.ZakazatShashlykZelenodolskPage })))
const DostavkaSushiZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaSushiZelenodolskPage').then(m => ({ default: m.DostavkaSushiZelenodolskPage })))
const ZakazatSushiZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatSushiZelenodolskPage').then(m => ({ default: m.ZakazatSushiZelenodolskPage })))
const DostavkaBurgerovZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaBurgerovZelenodolskPage').then(m => ({ default: m.DostavkaBurgerovZelenodolskPage })))
const ZakazatBurgeryZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatBurgeryZelenodolskPage').then(m => ({ default: m.ZakazatBurgeryZelenodolskPage })))
const DostavkaKrylyshekZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaKrylyshekZelenodolskPage').then(m => ({ default: m.DostavkaKrylyshekZelenodolskPage })))
const ZakazatKrylyshkiZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatKrylyshkiZelenodolskPage').then(m => ({ default: m.ZakazatKrylyshkiZelenodolskPage })))
const DostavkaKartoshkiFriZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaKartoshkiFriZelenodolskPage').then(m => ({ default: m.DostavkaKartoshkiFriZelenodolskPage })))
const ZakazatKartoshkuFriZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatKartoshkuFriZelenodolskPage').then(m => ({ default: m.ZakazatKartoshkuFriZelenodolskPage })))
const DostavkaEdyZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaEdyZelenodolskPage').then(m => ({ default: m.DostavkaEdyZelenodolskPage })))
const ZakazatEduZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatEduZelenodolskPage').then(m => ({ default: m.ZakazatEduZelenodolskPage })))
const DostavkaNagetsovZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/DostavkaNagetsovZelenodolskPage').then(m => ({ default: m.DostavkaNagetsovZelenodolskPage })))
const ZakazatNagetsyZelenodolskPage = lazy(() => import('./pages/zelenodolsk-delivery-seo/ZakazatNagetsyZelenodolskPage').then(m => ({ default: m.ZakazatNagetsyZelenodolskPage })))

// Новые SEO-маршруты через генератор
import { generateSEORoutes } from './utils/routeGenerator'
import { blogRoutes } from './routes/blogRoutes'
import { seasonalRoutes } from './routes/seasonalRoutes'
import { productCityRoutes } from './routes/productCityRoutes'
import { cateringRoutes } from './routes/cateringRoutes'
import { reviewRoutes } from './routes/reviewRoutes'
import { masterclassRoutes } from './routes/masterclassRoutes'

// Suspense fallback для lazy-компонентов
function SEOLoadingFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <p style={{ color: '#888' }}>Загрузка...</p>
    </div>
  )
}

// Компонент для определения платформы (внутри Router и TelegramProvider)
function PlatformRouter() {
  const isInTelegram = useIsTelegram()
  
  // Если мы в Telegram, рендерим Telegram версию
  if (isInTelegram) {
    return <TelegramApp />
  }
  
  // Иначе рендерим обычную веб версию
  return <WebApp />
}

// Роутер для страницы меню - показывает категории или продукты категории
function MenuPageRouter() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  // Если есть параметр category, показываем продукты категории
  if (categoryParam) {
    return <CategoryProductsPage />
  }
  
  // Иначе показываем список категорий
  return <MenuPage />
}

// Веб-версия приложения (переименованная из AppWithRouter)
function WebApp() {
  const { user } = useAuth()
  const { loadCategories, loadCart } = useProducts()

  // Загружаем категории только один раз
  useEffect(() => {
    console.log('🔄 Загружаем категории...')
    loadCategories()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Загружаем корзину при появлении пользователя
  useEffect(() => {
    if (user && user.id) {
      console.log('🔄 Пользователь аутентифицирован, загружаем корзину...', user.username, 'ID:', user.id)
      loadCart()
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <Suspense fallback={<SEOLoadingFallback />}>
    <Routes>
      {/* Публичные маршруты */}
      <Route 
        path="/auth" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/privacy" 
        element={
          <ProtectedRoute requireAuth={false}>
            <PrivacyPolicyPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dimbokids" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <DimboKidsPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* SEO-страницы для продвижения по высокочастотным запросам */}
      <Route 
        path="/dostavka-pizzy" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-pizzu" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-shashlyka" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShashlykSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-shashlyk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShashlykSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-sushi" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <SushiSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-sushi" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <SushiSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-burgerov" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <BurgerSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-burgery" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <BurgerSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-krylyshek" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <WingsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-krylyshki" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <WingsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-kartoshki-fri" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FriesSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-kartoshku-fri" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FriesSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-edy-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FoodSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-edu-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FoodSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Короткие высокочастотные запросы */}
      <Route 
        path="/пицца" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="пицца" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/суши" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="суши" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/роллы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="роллы" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/бургеры" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="бургеры" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/шашлык" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="шашлык" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/картошка-фри" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="картошка-фри" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/закрытая-пицца" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="закрытая-пицца" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Нагетсы */}
      <Route 
        path="/доставка-нагетсов" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/заказать-нагетсы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/нагетсы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />

      {/* Специфические SEO страницы для конкретных запросов */}
      <Route 
        path="/pitstsa-zakazat-s-dostavkoy" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzaOrderDeliverySEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pizzeriya-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzeriaVolzhskSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pizzeriya-lenina" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzeriaLeninaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/gde-zakazat-pitstsu" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <WhereOrderPizzaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/eda-na-zakaz" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FoodOrderSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dodo-pizza-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <DodoPizzaComparisonSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/podslushano-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PodslushanoVolzhskSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/volzhsk-24" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <Volzhsk24SEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />

      {/* Детские SEO страницы */}
      <Route path="/detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-denь-rozhdeniya-gde" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaGdeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otmetitь-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtmetitDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-na-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryNaDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/menyu-na-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><MenyuNaDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-podarok-na-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyPodarokNaDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/otprazdnovatь-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OtprazdnovatDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otprazdnovatь-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtprazdnovatDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-provesti-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeProvestiDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-kvest-na-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyKvestNaDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-denь-rozhdeniya-let" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaLetKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdnovanie-detskogo-dnya-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnovanieDetskogoDnyaRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/otmetitь-detskiy-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OtmetitDetskiyDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/eda-na-detskom-dne-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><EdaNaDetskomDneRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-denь-rozhdeniya-god" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaGodKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdnik-dlya-detey" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnikDlyaDeteyKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otmetitь-dr-rebenka" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtmetitDrRebenkaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pozdravlenie-s-rozhdeniem-rebenka" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PozdravlenieSRozhdeniemRebenkaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-podarki" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiePodarkiKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/chto-podaritь-rebenku" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ChtoPodaritRebenkuKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-malьchiku" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokMalChikuKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-devochke" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokDevochkeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-dochke" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokDochkeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-podrostku" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokPodrostkuKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/animatory-na-denь-rozhdeniya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><AnimatoryNaDenRozhdeniyaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-prazdnik" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyPrazdnikKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdniki-v-detskom-sadu" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnikiVDetskomSaduKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/stsenariy-detskogo-prazdnika" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><StsenariyDetskogoPrazdnikaKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-detskih-prazdnikov" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaDetskihPrazdnikovKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/provedenie-detskih-prazdnikov" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ProvedenieDetskihPrazdnikovKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-detskih-prazdnikov-v-volzhske" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaDetskihPrazdnikovVVolzhskeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-prazdnikov-i-meropriyatiy-v-volzhske" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaPrazdnikovIMeropriyatiyVVolzhskeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-v-volzhske" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryVVolzhskeKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-na-prazdnik-volzhsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryNaPrazdnikVolzhskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />

      {/* Зеленодольские детские SEO страницы */}
      <Route path="/detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-den-rozhdeniya-gde-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaGdeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otmetit-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/otprazdnovat-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otprazdnovat-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtprazdnovatDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-provesti-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeProvestiDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdnovanie-detskogo-dnya-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnovanieDetskogoDnyaRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/otmetit-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OtmetitDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-na-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryNaDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/animatory-na-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><AnimatoryNaDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-ve-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryVeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-animatory-na-prazdnik-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskieAnimatoryNaPrazdnikZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/menyu-na-detskiy-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><MenyuNaDetskiyDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/eda-na-detskom-dne-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><EdaNaDetskomDneRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-podarok-na-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyPodarokNaDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskie-podarki-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiePodarkiZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/chto-podarit-rebenku-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ChtoPodaritRebenkuZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-malchiku-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokMalChikuZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-devochke-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokDevochkeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-dochke-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokDochkeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/podarok-podrostku-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PodarokPodrostkuZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-kvest-na-den-rozhdeniya-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyKvestNaDenRozhdeniyaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdnik-dlya-detey-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnikDlyaDeteyZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-prazdnik-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyPrazdnikZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-den-rozhdeniya-let-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaLetZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/detskiy-den-rozhdeniya-god-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DetskiyDenRozhdeniyaGodZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gde-otmetit-dr-rebenka-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GdeOtmetitDrRebenkaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-detskikh-prazdnikov-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaDetskikhPrazdnikovZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/provedenie-detskikh-prazdnikov-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ProvedenieDetskikhPrazdnikovZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-detskikh-prazdnikov-ve-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaDetskikhPrazdnikovVeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/organizatsiya-prazdnikov-i-meropriyatiy-ve-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><OrganizatsiyaPrazdnikovIMeropriyatiyVeZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/prazdniki-v-detskom-sadu-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PrazdnikiVDetskomSaduZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/stsenariy-detskogo-prazdnika-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><StsenariyDetskogoPrazdnikaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pozdravlenie-s-rozhdeniem-rebenka-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PozdravlenieSRozhdeniemRebenkaZelenodolskKidsPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />

      {/* Зеленодольск — доставка еды */}
      <Route path="/dostavka-pizzy-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaPizzyZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-pizzu-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatPizzuZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-shashlyka-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaShashlykaZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-shashlyk-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatShashlykZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-sushi-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaSushiZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-sushi-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatSushiZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-burgerov-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaBurgerovZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-burgery-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatBurgeryZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-krylyshek-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaKrylyshekZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-krylyshki-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatKrylyshkiZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-kartoshki-fri-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaKartoshkiFriZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-kartoshku-fri-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatKartoshkuFriZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-edy-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaEdyZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-edu-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatEduZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/dostavka-nagetsov-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DostavkaNagetsovZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakazat-nagetsy-zelenodolsk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakazatNagetsyZelenodolskPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />

      {/* === НОВЫЕ SEO-СТРАНИЦЫ (113+ страниц) === */}
      {...generateSEORoutes(blogRoutes)}
      {...generateSEORoutes(seasonalRoutes)}
      {...generateSEORoutes(productCityRoutes)}
      {...generateSEORoutes(cateringRoutes)}
      {...generateSEORoutes(reviewRoutes)}
      {...generateSEORoutes(masterclassRoutes)}

      {/* Индивидуальные товарные SEO страницы */}
      <Route path="/pitstsa-margarita" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PitstsaMargaritaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gribnaya-pitstsa" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GribnayaPitstsaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/gavayskaya-pitstsa" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><GavayskayaPitstsaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/myasnaya-pitstsa" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><MyasnayaPitstsaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pitstsa-morskaya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PitstsaMorskayaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pitstsa-salyami" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PitstsaSalyamiSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pitstsa-pepperoni" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PitstsaPepperoniSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/pitstsa-tsezar" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><PitstsaTsezarSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/domashnyaya-pitstsa" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><DomashnyayaPitstsaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/syrnaya-pitstsa" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><SyrnayaPitstsaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/burger-dimburger" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><BurgerDimburgerSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/burger-chikenburger" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><BurgerChikenburgerSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/burger-chizburger" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><BurgerChizburgerSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/burger-dzhunior" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><BurgerDzhuniorSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/kartofel-fri-100-gr" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><KartofelFri100GrSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/kartofel-fri-150-gr" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><KartofelFri150GrSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/nagetsy-6-shtuk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><Nagetsy6ShtukSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/nagetsy-9-shtuk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><Nagetsy9ShtukSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/nagetsy-12-shtuk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><Nagetsy12ShtukSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/krylya-6-shtuk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><Krylya6ShtukSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/krylya-9-shtuk" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><Krylya9ShtukSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakrytaya-pitstsa-klassicheskaya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakrytayaPitstsaKlassicheskayaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakrytaya-pitstsa-okhotnichya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakrytayaPitstsaOkhotnichyaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakrytaya-pitstsa-kurinaya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakrytayaPitstsaKurinayaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakrytaya-pitstsa-syrnaya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakrytayaPitstsaSyrnayaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      <Route path="/zakrytaya-pitstsa-gavayskaya" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><ZakrytayaPitstsaGavayskayaSEOPage /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />
      
      {/* Главная страница БЕЗ авторизации для SEO */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <HomePage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Защищенные маршруты */}
      <Route 
        path="/*" 
        element={
          <ProtectedRoute requireAuth={true}>
            <AppShell
              padding="md"
            >
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <Routes>
                  <Route path="/menu" element={<MenuPageRouter />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                  <Route path="/auth-test" element={<AuthTestPage />} />
                </Routes>
              </AppShell.Main>
              
              {/* Bottom Navigation для веба */}
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
    </Routes>
    </Suspense>
  )
}

const App: React.FC = () => {
  // ID счетчика Яндекс.Метрики
  const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || '103585127'
  
  // ID VK Пикселя (Top.Mail.Ru)
  const VK_PIXEL_ID = import.meta.env.VITE_VK_PIXEL_ID || '3695469'
  
  return (
    <YandexMetrikaProvider counterId={YANDEX_METRIKA_ID}>
      <VKPixelProvider pixelId={VK_PIXEL_ID} enableEcommerce={true}>
        <Router>
          <TelegramProvider>
            <PlatformRouter />
          </TelegramProvider>
        </Router>
      </VKPixelProvider>
    </YandexMetrikaProvider>
  )
}

export default App
