function getReviewList(currentGeoObjects) {
  let reviewsHTML = ''

  for (const review of JSON.parse(localStorage.reviews || "[]")) {
    if(currentGeoObjects.some(geoObject => JSON.stringify(geoObject.geometry._coordinates) === JSON.stringify(review.coords))){
      reviewsHTML += `
      <div class='review'>
        <div><strong>Место: </strong>${review.place}</div>
        <div><strong>Имя: </strong>${review.author}</div>
        <div><strong>Отзыв: </strong>${review.text}</div>
      </div>
      `
    }
  }

  return reviewsHTML
}

export { getReviewList };