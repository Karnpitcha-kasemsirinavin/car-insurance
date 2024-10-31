import React from "react";
import "../../components/layout-wrapper/layout-wrapper.css";
import SectionIntroduce from "../../components/SectionIntroduce/SectionIntroduce";
import Footer from "../../components/footer/footer";
import MySlideshow from "../../components/MySlideshow/MySlideshow";
import Promotion from "../../components/PromotionSlide/MySlideshow";
import CookiePopup from "../../components/CookiePopup/CookiePopup"
function homePage() {
  return (
    <div>
      {/* Intro  */}
      <SectionIntroduce />

      {/*insurance Slideshow */}
      <MySlideshow />
      {/*Promotion Slideshow
         <Promotion />
      */}
   <CookiePopup/>

      <Footer />
    </div>
  );
}

export default homePage;
