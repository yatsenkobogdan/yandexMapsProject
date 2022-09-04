import { feedbackForm } from "../templates/feedbackForm"

ymaps.ready(init)

async function openBallon (map, coords, geoObjects){
  await map.ballon.open(coords, {
    content: `${feedbackForm}`
    })
}

function init(){
  const map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 12
  })

  map.events.add('click', e => {
    openBallon(map, e.get('coords'), [])
  })
}

