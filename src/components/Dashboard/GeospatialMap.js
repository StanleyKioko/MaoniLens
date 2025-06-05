import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG, KENYA_COUNTIES, CHART_COLORS } from '../../utils/constants';

// Component to fit bounds to Kenya
const FitBoundsToKenya = () => {
  const map = useMap();
  
  useEffect(() => {
    const bounds = KENYA_COUNTIES.map(county => county.coords);
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map]);
  
  return null;
};

const GeospatialMap = ({ data }) => {
  const mapRef = useRef();

  // Sample sentiment data for counties (replace with real data)
  const countySentimentData = [
    { name: 'Nairobi', coords: [-1.286389, 36.817223], positive: 55, negative: 35, neutral: 10 },
    { name: 'Mombasa', coords: [-4.043477, 39.668206], positive: 30, negative: 60, neutral: 10 },
    { name: 'Kisumu', coords: [-0.091702, 34.767963], positive: 40, negative: 40, neutral: 20 },
    { name: 'Nakuru', coords: [-0.303099, 36.080025], positive: 65, negative: 25, neutral: 10 },
    { name: 'Eldoret', coords: [0.514277, 35.269779], positive: 50, negative: 30, neutral: 20 }
  ];

  // Determine circle color based on dominant sentiment
  const getCircleColor = (countyData) => {
    const { positive, negative, neutral } = countyData;
    if (positive > negative && positive > neutral) return CHART_COLORS.POSITIVE;
    if (negative > positive && negative > neutral) return CHART_COLORS.NEGATIVE;
    return CHART_COLORS.NEUTRAL;
  };

  // Calculate circle radius based on total activity
  const getCircleRadius = (countyData) => {
    const total = countyData.positive + countyData.negative + countyData.neutral;
    return Math.max(15, Math.min(50, total * 0.5));
  };

  // Get dominant sentiment label
  const getDominantSentiment = (countyData) => {
    const { positive, negative, neutral } = countyData;
    if (positive > negative && positive > neutral) return 'Positive';
    if (negative > positive && negative > neutral) return 'Negative';
    return 'Neutral';
  };

  return (
    <div className="w-full">
      {/* Map Legend */}
      <div className="mb-4 p-3 bg-gray-50 rounded flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
            <span className="text-sm">Positive Sentiment</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
            <span className="text-sm">Negative Sentiment</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
            <span className="text-sm">Neutral Sentiment</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Circle size indicates activity level
        </div>
      </div>

      {/* Map Container */}
      <div className="map-container h-80 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={MAP_CONFIG.CENTER}
          zoom={MAP_CONFIG.ZOOM}
          scrollWheelZoom={true}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution={MAP_CONFIG.ATTRIBUTION}
            url={MAP_CONFIG.TILE_URL}
          />
          
          <FitBoundsToKenya />
          
          {countySentimentData.map((county, index) => (
            <CircleMarker
              key={index}
              center={county.coords}
              radius={getCircleRadius(county)}
              pathOptions={{
                color: getCircleColor(county),
                fillColor: getCircleColor(county),
                fillOpacity: 0.6,
                weight: 2
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">{county.name}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600">Positive:</span>
                      <span className="font-semibold">{county.positive}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Negative:</span>
                      <span className="font-semibold">{county.negative}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Neutral:</span>
                      <span className="font-semibold">{county.neutral}%</span>
                    </div>
                    <hr className="my-2" />
                    <div className="text-sm">
                      <span className="font-medium">Dominant: </span>
                      <span className={`font-bold ${
                        getDominantSentiment(county) === 'Positive' ? 'text-green-600' :
                        getDominantSentiment(county) === 'Negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {getDominantSentiment(county)}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* County Summary Cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {countySentimentData.map((county, index) => (
          <div key={index} className="bg-white p-3 rounded shadow border-l-4" 
               style={{ borderLeftColor: getCircleColor(county) }}>
            <h4 className="font-semibold text-sm">{county.name}</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>👍 {county.positive}%</div>
              <div>👎 {county.negative}%</div>
              <div>😐 {county.neutral}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeospatialMap;