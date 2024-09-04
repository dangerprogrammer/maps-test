'use client';

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Home() {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: '',
        version: 'weekly'
      });

      const { Map } = await loader.importLibrary('maps');
      
      const position = {
        lat: 45,
        lng: -79
      };

      // const mapOptions: google.maps.MapOptions = {
      //   center: position,
      //   zoom: 16,
      //   mapId: 'NEXTJS_MAPID'
      // };
    };
  });

  return (
    <h1>Hello, World!</h1>
  );
}

export default Home;