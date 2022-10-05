import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from '@emotion/styled';
import stadium from '../../../images/stadium.png';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFiZXNoYWxvYWRlciIsImEiOiJja3lldGJtdHQweWdvMm91cjZrM3hkbDNmIn0.CW64OVxNUB2VMX9V0algqg';

const StyledMapContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledMapFixProd = styled.div`
  .mapboxgl-map {
    height: calc(100vh - 175px);
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

const Map = ({
  setLatitude,
  setLongitude,
  initialLat = 8.997924351506697,
  initialLong = 38.75632421923288,
}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(initialLong);
  const [lat, setLat] = useState(initialLat);
  const [zoom, setZoom] = useState(13);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${stadium})`;
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.backgroundSize = '100%';

    const marker = new mapboxgl.Marker(el, { draggable: true })
      .setLngLat([initialLong, initialLat])
      .addTo(map);

    const addMarker = (event) => {
      let coordinates = event.lngLat;
      setLongitude(coordinates.lng);
      setLatitude(coordinates.lat);
      marker.setLngLat(coordinates).addTo(map);
    };

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      setLongitude(lngLat.lng);
      setLatitude(lngLat.lat);
    });

    map.on('click', addMarker);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledMapFixProd>
      <StyledSideBar>
        <div>Find your pitch on the map and click!</div>
      </StyledSideBar>
      <StyledMapContainer ref={mapContainerRef} />
    </StyledMapFixProd>
  );
};

export default Map;
