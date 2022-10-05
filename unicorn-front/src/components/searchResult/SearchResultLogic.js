import markerDefault from '../../images/MarkerDefault.png';

export const convertToGeoJson = (searchData) => {
  let locations = {
    type: 'FeatureCollection',
  };

  let features = [];

  if (!searchData) {
    locations.features = [];
    return locations;
  }

  searchData.forEach((pitch) => {
    let t = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [Number(pitch.longitude), Number(pitch.latitude)],
      },
      //   "properties": {
      //   "phoneFormatted": "(202) 234-7336",
      //     "phone": "2022347336",
      //     "address": "1471 P St NW",
      //     "city": "Washington DC",
      //     "country": "United States",
      //     "crossStreet": "at 15th St NW",
      //     "postalCode": "20005",
      //     "state": "D.C."
      // }
    };
    features.push(t);
  });
  locations.features = features;
  return locations;
};

export const createMarker = (id) => {
  const el = document.createElement('div');
  el.id = `marker-id-${id}`;
  el.className = 'marker';
  el.style.backgroundImage = `url(${markerDefault})`;
  el.style.backgroundColor = `#ffffff00`;
  el.style.width = '50px';
  el.style.height = '65px';
  el.style.backgroundSize = '100%';

  return el;
};
