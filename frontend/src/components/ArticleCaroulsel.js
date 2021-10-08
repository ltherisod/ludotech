import React from 'react'
import{ Swiper, SwiperSlide} from "swiper/React"
import SwiperCore, {EffectFlip,Pagination,Navigation, Autoplay} from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

SwiperCore.use([EffectFlip,Pagination,Navigation, Autoplay])

const ArticleCaroulsel = () => {
    
    return (
        <div className="swiperBox">
            <Swiper effect={'flip'} grabCursor={true} pagination={true} navigation={true} className="swiper"autoplay={true}>
                <SwiperSlide>
                    <div className="swiperSlide"style={{backgroundImage:"url('https://i.postimg.cc/vTZ2khjn/attackontitans-Photo1.png')"}}></div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiperSlide"style={{backgroundImage:"url('https://i.postimg.cc/x8jj7rnP/attackontitans-Photo2.png')"}}></div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiperSlide"style={{backgroundImage:"url('https://i.postimg.cc/NFRV1FWJ/attackontitans-Photo3.png')"}}></div>
                </SwiperSlide> 
            </Swiper>
        </div>
    )
}

export default ArticleCaroulsel
