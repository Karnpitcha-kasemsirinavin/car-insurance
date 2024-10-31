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
      <h2 className="insurance__title"> <span>เต็มที่กับ</span> ทุกช่วงชีวิต ด้วยแผนประกัน</h2>
      <a href="app-transactions.html" className="insurance__link">ครอบคลุมทุกความต้องการ ตอบโจทย์ทุกไลฟ์สไตล์</a>
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
            <div className='text'>
            <div className="title">พ.ร.บ</div>
            <p className='content'>คุ้นครองทันที</p>
            </div>
     <div className='insurance-button'> < Buttons  onClick={() => window.location.href = '/'} width="132px" label="เช็กเบี้ยประกัน" variant="primary"/></div>
         
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="insurance-slide">
        <div className="card-main bg-white">
          <div className="insurance-box">
            <div className="img-wrapper">
            <img src={Img2} alt="" />
            </div>
            <div className='text'>
            <div className="title">ต่อภาษี</div>
            <p className='content'>จ่ายทันที</p>
            </div>
     
            <div className='insurance-button'> < Buttons  onClick={() => window.location.href = '/'}  width="132px" label="เช็กเบี้ยประกัน" variant="primary"/></div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="insurance-slide">
        <div className="card-main bg-white">
          <div className="insurance-box">
            <div className="img-wrapper">
            <img src={Img1} alt="" />
            </div>
            <div className='text'>
            <div className="title">ต่อ พ.ร.บ เเละ ภาษี</div>
            <p className='content'>คุ้นครองทันที</p>
            </div>
     
            <div className='insurance-button'> < Buttons width="132px" label="เช็กเบี้ยประกัน" variant="primary"/></div>
          </div>
        </div>
      </SwiperSlide>
   



      {/* ใส่ SwiperSlide อื่น ๆ */}
    </Swiper>
  </section>
  )
}

export default MySlideshow
