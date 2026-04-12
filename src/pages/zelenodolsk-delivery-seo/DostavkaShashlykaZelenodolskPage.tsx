import { CityDeliverySEOTemplate } from '../../components/seo/CityDeliverySEOTemplate'
import { ZELENODOLSK_PAGES } from '../../data/zelenodolskDeliveryData'

const page = ZELENODOLSK_PAGES[2]

export function DostavkaShashlykaZelenodolskPage() {
  return (
    <CityDeliverySEOTemplate
      config={page}
      city="Зеленодольск"
      fromCity="Волжск"
      fromCityAddress="г. Волжск, ул. Шестакова, д.1Б"
      phone="+7(902)105-34-34"
      phoneHref="+79021053434"
      deliveryTime="60-90 минут"
      freeDeliveryFrom={1200}
    />
  )
}
