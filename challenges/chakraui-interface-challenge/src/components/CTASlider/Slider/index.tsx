import Link from "next/link"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { Slide } from "./Slide"

export default function Slider() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Link href={`/country/Europe`}>
            <Slide
              src="/images/slider-images/europe.jpg"
              title="Europa"
              subTitle="O continente mais antigo."
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={`/country/Europe`}>
            <Slide
              src="/images/slider-images/europe.jpg"
              title="Europa"
              subTitle="O continente mais antigo."
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={`/country/Europe`}>
            <Slide
              src="/images/slider-images/europe.jpg"
              title="Europa"
              subTitle="O continente mais antigo."
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
