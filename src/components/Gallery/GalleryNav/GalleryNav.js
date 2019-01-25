import React from 'react';
import classes from './GalleryNav.module.scss';

const galleryNav = (props) => (
  <section className={classes.GalleryNav}>
    <nav className={classes.GalleryNav__tab_menu}>
      <ul className={classes.GalleryNav__tab_items}>

        <li
          className={[classes.GalleryNav__tab_item, 
                      props.galleryTab === "photo" ? classes.GalleryNav__active : ''].join(" ")}
          onClick={() => props.switchHandler("photo")}>
          Foto's
          </li>

        <li
          className={[classes.GalleryNav__tab_item, 
                      classes["hideItem--tablet"],
                      props.galleryTab === "illustration" ? classes.GalleryNav__active : ''].join(" ")}
          onClick={() => props.switchHandler("illustration")}>
          Illustraties
          </li>

        <li
          className={[classes.GalleryNav__tab_item, 
                      classes["hideItem--desktop"],
                      props.galleryTab === "vector" ? classes.GalleryNav__active : ''].join(" ")}
          onClick={() => props.switchHandler("vector")}>
          Vectors
          </li>

        <li
          className={[classes.GalleryNav__tab_item,
                      props.galleryTab === "videos" ? classes.GalleryNav__active : ''].join(" ")}
          onClick={() => props.switchHandler("videos")}>
          Video's
          </li>

        <li className={classes.GalleryNav__tab_item}>
          Meer {String.fromCharCode(8594)}
        </li>

      </ul>
    </nav>
  </section>
);


export default galleryNav;