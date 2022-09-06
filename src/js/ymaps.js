import { feedbackForm } from "../templates/templates"
import { getReviewList } from '../templates/reviews'

let cluster
document.addEventListener('DOMContentLoaded', ()=>ymaps.ready(init))

function init(){
  cluster = new ymaps.Clusterer({clusterDisableClickZoom: true})

  const newMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 15
  })
  
  newMap.events.add('click', e => {
    openBallon(newMap, e.get('coords'), [])
  })
  cluster.options.set('hasBalloon', false)
  cluster.events.add('click', function(e){
    let clusterObjects = e.get('target').getGeoObjects()
    openBallon(newMap, e.get('coords'), clusterObjects)
  })
  renderGeoObj(newMap)
}

function renderGeoObj(map) {
  const geoObject = []
  cluster.removeAll()
  map.geoObjects.remove(cluster)

  for(let review of getAllReviews()){
    const placeMark = new ymaps.Placemark(review.coords)
    placeMark.events.add('click', function(e){
      e.stopPropagation();
      openBallon(map, e.get('coords'), [e.get('target')])
    })
    geoObject.push(placeMark)
  }

  cluster.add(geoObject)
  map.geoObjects.add(cluster)
}



function getAllReviews() {
  return JSON.parse(localStorage.reviews || "[]")
}

async function openBallon (map, coords, geoObjects){
  await map.balloon.open(coords, {
    content: `<div class='reviews'> ${getReviewList(geoObjects)}` + feedbackForm
  })

  document.querySelector('#add-feedback').addEventListener('submit', function(e) {
    e.preventDefault();
    const review = {
      coords,
      author: this.elements.userName.value,
      place: this.elements.placeName.value,
      text: this.elements.feedback.value
    }
    localStorage.reviews = JSON.stringify([...getAllReviews(), review])

    renderGeoObj(map)

  map.balloon.close();
  })

  
}

