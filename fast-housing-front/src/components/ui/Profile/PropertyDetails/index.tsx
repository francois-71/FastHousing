"use client";

import React from "react";
import styles from "./property-details.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import ProfileSquare from "../ProfileSquare";
import Link from "next/link";

type PropertyDetailsProps = {
  filename: string;
  url: string;
  propertyName: string;
};

export default function PropertyDetails({
  images,
}: {
  images: PropertyDetailsProps[];
}) {
  return (
    <ProfileSquare>
      {images.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
          keyboard
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className={styles.swiperContainer}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.swiperSlider}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.cardImg}
                  src={image.url}
                  alt={image.filename}
                  fill
                />
                <Link href="" className={styles.textImg}>{image.propertyName} </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </ProfileSquare>
  );
}
