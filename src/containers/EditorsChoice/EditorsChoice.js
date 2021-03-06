import React, { Component } from 'react';
import axios from '../../axios-gallery';
import classes from '../../assets/css/pagination.module.scss';

//component imports
import Gallery from '../../components/Gallery/Gallery';
import Pagination from "react-js-pagination";
import Modal from '../../components/UI/Modal/Modal';
import SingleImage from '../../components/Gallery/SingleImage/SingleImage';


class EditorsChoice extends Component {
  state = {
    galleryType: null,
    gallery: null,
    totalHits: 0,
    activePage: 1,
    imageID: null,
    showModal: false
  }


  getGalleryHandler(type) {
    // retrieve the images from the API
    const apiKey = "136304-b12526e3e307af45bcca2c3ea";
    let galleryType = type;
    let pageNumber = this.state.activePage;

    // create query string
    let req = galleryType !== "videos" ?
    `/?key=${apiKey}&lang=nl&image_type=${galleryType}&page=${pageNumber}&per_page=24` :
    `/videos/?key=${apiKey}&lang=nl&video_type=all&page=${pageNumber}&per_page=24`;

    axios.get(req)
    .then(response => {
        let gallery = response.data.hits;
        let totalHits = response.data.total;
        this.setState({
            gallery: gallery,
            totalHits: totalHits
        }, () => window.scrollTo(0, 0));
    })
    .catch(error => error);
  }

  componentDidMount() {
    this.getGalleryHandler("photo");
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.activePage !== this.state.activePage || prevState.galleryType !== this.state.galleryType) {
      this.getGalleryHandler(this.state.galleryType);
    }
  }

  switchGalleryHandler = (type) => {
    this.setState({
        galleryType: type,
        activePage: 1
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  }

  showSingleImageHandler = (id) => {
    this.setState({imageID: id, showModal: true});
 }

 closeImageHandler = () => {
   this.setState({imageID: null, showModal: false});
 }


  
  render() {
    const { galleryType, gallery, activePage, totalHits, imageID, showModal} = this.state;
    let singleImage = null;
    if(gallery && imageID) {
      let image = [...gallery].find(img => img.id === imageID);
      let imgSource = galleryType !== "videos" ? image.webformatURL : image.videos.tiny.url;
      singleImage = <SingleImage 
                      title={image.tags}
                      source={imgSource}
                      author={image.user}
                      authorID={image.user_id}
                      galleryType={galleryType}
                      closeImage={this.closeImageHandler}/> 
    }

    return (
      <section>
        <Modal showModal={showModal} closeImage={this.closeImageHandler}>
            {singleImage}
        </Modal>
        <Gallery
          galleryCollection={gallery}
          galleryName={galleryType}
          switchGallery={this.switchGalleryHandler} 
          showImage={this.showSingleImageHandler}/>
        <Pagination
          activePage={activePage}
          totalItemsCount={totalHits}
          pageRangeDisplayed={5}
          hideFirstLastPages={true}
          innerClass={classes.pagination}
          linkClass={classes.pagination_item_link}
          activeClass={classes.pagination_item_active}
          activeLinkClass={classes.pagination_item_active}
          onChange={this.handlePageChange}/>
      </section>
    );
  }
}

export default EditorsChoice;