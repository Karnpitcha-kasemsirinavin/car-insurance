import React from 'react'
import "./swiper-bundle.min.css"
import "./MySlideshow.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import Buttons from"../Buttons/Buttons"
import Img1 from"../../assets/Social strategy-rafiki.svg"
import Img2 from"../../assets/Online ads-pana.svg"
function MySlideshow() {
  return (
    <section className="insurance-container">
    <div className="insurance__section-heading">
      <h2 className="insurance__title"> <span>โปรโมชั่น แหละกิจกรรม</span> </h2>
    
    </div>

    <Swiper
      spaceBetween={20}       // ระยะห่างระหว่าง slides
      slidesPerView={'auto'}  // ให้แสดงผลอัตโนมัติตามความกว้างของ slide
      loop={true}             // ทำให้ slide วนกลับไปต้น
    >
      <SwiperSlide className="insurance-slide">
        <div className="card-main bg-white">
          <div  className="insurance-box">
            <div className="img-wrapper">
            <img src={Img1} alt="" />
            </div>
 
          </div>
        </div>
      </SwiperSlide>



      {/* ใส่ SwiperSlide อื่น ๆ */}
    </Swiper>
  </section>
  )
}

export default MySlideshow
