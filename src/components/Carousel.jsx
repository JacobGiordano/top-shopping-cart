import { Swiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Carousel({ children }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        {children}
      </Swiper>
    </>
  );
}
export default Carousel;
