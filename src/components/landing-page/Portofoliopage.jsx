'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import footer from '../assets/footer.png';

const projects = [
  {
    title: 'HALODOC - Rumah Sakit Terapung 2021',
    src: require('../assets/halodoc.png'),
    videoId: 'UPKm3q24C-w',
    description: `Sebuah perjalanan kemanusiaan di Pulau Bawean. Kami dipercaya Halodoc untuk mendokumentasikan inisiatif sosial berupa Rumah Sakit Terapung menggunakan kapal Penisi tradisional yang menjangkau wilayah terpencil tanpa akses kesehatan. Melalui video dokumentasi ini, kami menyampaikan pesan kuat tentang harapan dan dedikasi pelayanan medis.`,
  },
  {
    title: 'LOLICA - Colorful Fashion Commercial 2019',
    src: require('../assets/lolica.png'),
    videoId: '6rrxsneWCkM',
    description: `LOLICA mempercayakan kami untuk merancang video iklan penuh warna yang menampilkan keunikan fashion wanita dengan sentuhan trend Korea. Kami merasakan ekspresi diri dan gaya hidup muda dengan konsep visual yang segar dan menarik.`,
  },
  {
    title: 'MOMFEST - Mothers on Mission Festival 2021',
    src: require('../assets/momfest.png'),
    videoId: 'tyoASAvKEMU',
    description: `Siaran langsung penuh makna untuk para ibu. Dalam event seminar ini, kami menangani produksi live Stream profesional. Menghadirkan koneksi yang intim dan nyata antara pembicara dan para peserta, baik secara luring maupun daring.`,
  },
  {
    title: 'PEMKOT AMBON - Hari Kesaktian Pancasila 2020',
    src: require('../assets/pemkotambon.png'),
    description: `Merayakan nilai kebangsaan lewat layar. Kami mendokumentasikan dan menyiarkan secara langsung peringatan Hari Kesaktian Pancasila bersama pemerintah Kota Ambon. Suatu kehormatan bagi kami untuk menjadi bagian dari peristiwa istimewa yang penuh makna.`,
  },
  {
    title: 'SHARP - Social Experiment Documentation 2021',
    src: require('../assets/sharp.png'),
    videoId: 'qgsEQXtAeyg',
    description: `Berbagi kebahagiaan, menjangkau yang terlupakan. Sharp mempercayakan kami untuk mengabadikan momen spesial dalam aksi sosial mereka bersama anak - anak panti asuhan. Video dokumentasi ini menangkap kehangatan interaksi, kebahagiaan, dan kepedulian dalam sebuah kisah yang menginspirasi.`,
  },
  {
    title: 'SUMMARECON SERPONG - Annual Awards Documentation 2020',
    src: require('../assets/sms.jpg'),
    videoId: 'T0DHUnyVsMY',
    description: `Prestasi dalam kemegahan. Kami memproduksi dokumentasi resmi acara penghargaan tahunan Summarecon Serpong di Royal Ballrom, The Springs Club. Menghadirkan kesan elegan dan profesional dalam setiap frame yang kami rekam.`,
  },
];

const Portfoliopage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!swiperInstance) return;
    const updateSlidesStyle = () => {
      swiperInstance.slides.forEach((slideEl) => {
        slideEl.style.opacity = '0.3';
        slideEl.style.transition = 'filter 0.4s ease, transform 0.4s ease';
        slideEl.style.zIndex = '0';
        slideEl.style.transform = 'scale(0.8)';
      });
      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      if (activeSlide) {
        activeSlide.style.opacity = '1';
        activeSlide.style.zIndex = '10';
        activeSlide.style.transform = 'scale(1)';
      }
    };
    updateSlidesStyle();
    swiperInstance.on('slideChange', updateSlidesStyle);
    return () => swiperInstance.off('slideChange', updateSlidesStyle);
  }, [swiperInstance]);

  useEffect(() => {
    if (!selectedProject || !modalRef.current) return;
    const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const handleTouchEnd = (e) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) < 50) return;
      diff > 0 ? handleNext() : handlePrevious();
    };
    const modalElement = modalRef.current;
    modalElement.addEventListener('touchstart', handleTouchStart);
    modalElement.addEventListener('touchend', handleTouchEnd);
    return () => {
      modalElement.removeEventListener('touchstart', handleTouchStart);
      modalElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedProject, swiperInstance]);

  const handlePrevious = () => {
    if (!swiperInstance) return;
    swiperInstance.slidePrev();
    const index = projects.findIndex((p) => p === selectedProject);
    const prevIndex = index === 0 ? projects.length - 1 : index - 1;
    setSelectedProject(projects[prevIndex]);
  };

  const handleNext = () => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
    const index = projects.findIndex((p) => p === selectedProject);
    const nextIndex = index === projects.length - 1 ? 0 : index + 1;
    setSelectedProject(projects[nextIndex]);
  };

  return (
    <div className='text-black pt-20 relative overflow-hidden' style={{ background: 'linear-gradient(to right, #603111, #000000, #7098C0)' }}>
      {/* Decorative Spinners */}
      <div className='absolute top-[100px] left-[50px] w-[150px] h-[150px] opacity-10 animate-spin-slow pointer-events-none z-10'>
        <Image src={footer} alt='Background spinner' fill className='object-contain blur-sm' unoptimized />
      </div>
      <div className='absolute bottom-[100px] right-[50px] w-[200px] h-[200px] opacity-10 animate-spin-slow pointer-events-none z-10'>
        <Image src={footer} alt='Background spinner flipped' fill className='object-contain blur-sm scale-x-[-1] scale-y-[-1]' unoptimized />
      </div>

      <div className='relative z-20'>
        <h1 className='text-white text-5xl sm:text-6xl w-[320px] mx-auto font-semibold mb-16 text-center'>
          Our <span className='text-orange-600'>Portofolio</span>
        </h1>

        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          onSwiper={setSwiperInstance}
          effect='coverflow'
          grabCursor
          centeredSlides
          slidesPerView='auto'
          loop
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 2.5,
            slideShadows: false,
          }}
          className='max-w-7xl mx-auto custom-swiper'
          style={{ paddingBottom: '2rem' }}
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx} style={{ width: '320px', borderRadius: '1rem', cursor: 'pointer' }} onClick={() => setSelectedProject(project)}>
              <Image src={project.src} alt={project.title} width={320} height={200} className='rounded-xl object-cover' draggable={false} unoptimized />
              <p className='text-center mt-3 font-medium text-xs sm:text-sm text-white px-2'>{project.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div className='fixed inset-0 flex items-center justify-center bg-black/70 z-[100] p-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
              <motion.div
                ref={modalRef}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className='bg-black w-full max-w-full sm:max-w-2xl md:max-w-4xl max-h-[95vh] p-5 sm:p-6 md:p-8 rounded-2xl overflow-y-auto shadow-2xl relative'
                onClick={(e) => e.stopPropagation()}
              >
                <button className='absolute top-4 right-5 text-white text-2xl hover:text-red-400 z-30' onClick={() => setSelectedProject(null)}>
                  &times;
                </button>

                <h2 className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center'>{selectedProject.title}</h2>

                {selectedProject.videoId ? (
                  <iframe
                    className='w-full aspect-video rounded-lg'
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&rel=0`}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    referrerPolicy='strict-origin-when-cross-origin'
                  />
                ) : (
                  <Image src={selectedProject.src} alt={selectedProject.title} className='w-full max-h-[400px] object-contain mx-auto rounded-lg border border-gray-300' unoptimized />
                )}

                <div className='mt-4 max-h-[200px] overflow-y-auto pr-2 text-center'>
                  <p className='text-gray-300 text-sm sm:text-base whitespace-pre-line'>{selectedProject.description}</p>
                </div>

                <div className='mt-6 flex justify-center gap-6'>
                  <button className='text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors pointer-events-auto' onClick={handlePrevious}>
                    Previous
                  </button>
                  <button className='text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors pointer-events-auto' onClick={handleNext}>
                    Next
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-10' />
      </div>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #f97316;
          top: 45%;
        }
        .swiper-button-next {
          color: #3b82f6;
        }
        .swiper-button-prev:hover {
          color: #fb923c;
        }
        .swiper-button-next:hover {
          color: #60a5fa;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 24px;
          font-weight: bold;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfoliopage;
