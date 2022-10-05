import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from '@emotion/styled';
import { convertToGeoJson, createMarker } from './SearchResultLogic';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFiZXNoYWxvYWRlciIsImEiOiJja3lldGJtdHQweWdvMm91cjZrM3hkbDNmIn0.CW64OVxNUB2VMX9V0algqg';

const StyledMapContainer = styled.div``;

export const StyledAnswersWrapper = styled.div`
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  display: flex !important;
  flex-direction: column !important;
  height: calc(100vh - 146px);
  margin: 8px;
  overflow: scroll;
`;
const StyledMapFixProd = styled.div`
  .mapboxgl-map {
    height: calc(100vh - 150px);
    width: 100% !important;
    //height: 150px;
  }

  /* Marker tweaks */
  .mapboxgl-popup-close-button {
    display: none;
  }

  .mapboxgl-popup-content {
    font: 400 15px/22px 'Source Sans Pro', 'Helvetica Neue', sans-serif;
    padding: 0;
    width: 180px;
  }

  .mapboxgl-popup-content h3 {
    background: #91c949;
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-weight: 700;
    margin-top: -15px;
  }

  .mapboxgl-popup-content h4 {
    margin: 0;
    padding: 10px;
    font-weight: 400;
  }

  .mapboxgl-popup-content div {
    padding: 10px;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
    margin-top: 15px;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
    border-bottom-color: #91c949;
  }
`;

const StyledSideBar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  background-color: #404040;
  color: #ffffff;
  z-index: 1 !important;
  padding: 6px;
  font-weight: bold;
`;

const SearchMap = ({ locations, visited = false }) => {
  const mapContainerRef = useRef(null);

  let geoJson = convertToGeoJson(locations?.fields);

  const [lng, setLng] = useState(38.75632421923288);
  const [lat, setLat] = useState(8.997924351506697);
  const [zoom, setZoom] = useState(13);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    locations?.fields.map((point) => {
      // only add it to the map if lat and long values are present
      console.log('Point ', point);
      if (point.longitude && point.latitude) {
        let el = createMarker(point.pitch_id);
        return new mapboxgl.Marker(el)
          .setLngLat([Number(point.longitude), Number(point.latitude)])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>${point.name}</h3><p>${point.description}</p>`)
          )
          .addTo(map);
      }
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <StyledAnswersWrapper>
      <StyledMapFixProd>
        <StyledMapContainer ref={mapContainerRef} />
      </StyledMapFixProd>
    </StyledAnswersWrapper>
  );
};

export default SearchMap;
