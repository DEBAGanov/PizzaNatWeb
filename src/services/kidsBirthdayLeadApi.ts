/**
 * @file: kidsBirthdayLeadApi.ts
 * @description: Отправка лидов "детский день рождения" с SEO-страниц и лендинга на backend,
 *   полностью отдельно от заказов пиццы
 * @dependencies: apiClient (services/api.ts)
 * @created: 2026-10-23
 */

import apiClient from './api'

export interface KidsBirthdayLeadPayload {
  name?: string
  phone: string
  city?: string
  quizAge?: string
  sourcePage?: string
  comment?: string
}

export async function sendKidsBirthdayLead(payload: KidsBirthdayLeadPayload): Promise<boolean> {
  try {
    await apiClient.post('/public/leads/kids-birthday', payload)
    return true
  } catch (error) {
    console.error('❌ Не удалось отправить заявку "детский день рождения":', error)
    return false
  }
}
