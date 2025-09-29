'use client';

import { useEffect, useRef, useState } from 'react';

interface ArgoFloat {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
  temperature?: number;
  salinity?: number;
  depth?: number;
}

interface GoogleMapProps {
  floats?: ArgoFloat[];
  onFloatSelect?: (float: ArgoFloat) => void;
  selectedRegion?: 'indian' | 'global';
}

export default function GoogleMap({ floats, onFloatSelect, selectedRegion = 'indian' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Dummy ARGO float data
  const dummyFloats: ArgoFloat[] = [
    {
      id: '2901234',
      lat: 15.5,
      lng: 73.8,
      name: 'ARGO Float 2901234',
      status: 'active',
      lastUpdate: '2024-01-15T10:30:00Z',
      temperature: 28.5,
      salinity: 35.2,
      depth: 1000
    },
    {
      id: '2901235',
      lat: 12.3,
      lng: 80.2,
      name: 'ARGO Float 2901235',
      status: 'active',
      lastUpdate: '2024-01-14T14:45:00Z',
      temperature: 29.1,
      salinity: 34.8,
      depth: 1200
    },
    {
      id: '2901236',
      lat: 8.7,
      lng: 76.9,
      name: 'ARGO Float 2901236',
      status: 'active',
      lastUpdate: '2024-01-13T08:15:00Z',
      temperature: 27.8,
      salinity: 35.5,
      depth: 800
    },
    {
      id: '2901237',
      lat: 20.1,
      lng: 65.4,
      name: 'ARGO Float 2901237',
      status: 'inactive',
      lastUpdate: '2024-01-10T16:20:00Z',
      temperature: 26.2,
      salinity: 36.1,
      depth: 1500
    },
    {
      id: '2901238',
      lat: 18.9,
      lng: 72.1,
      name: 'ARGO Float 2901238',
      status: 'active',
      lastUpdate: '2024-01-12T12:00:00Z',
      temperature: 28.9,
      salinity: 34.9,
      depth: 900
    }
  ];

  const floatsToShow = floats || dummyFloats;

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const center = selectedRegion === 'indian' 
        ? { lat: 15.0, lng: 75.0 } // Indian Ocean
        : { lat: 0, lng: 0 }; // Global

      const mapInstance = new google.maps.Map(mapRef.current, {
        zoom: selectedRegion === 'indian' ? 6 : 2,
        center: center,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#1e3a8a' }]
          },
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: [{ color: '#1f2937' }]
          }
        ]
      });

      setMap(mapInstance);
    };

    if (typeof window !== 'undefined' && window.google) {
      initMap();
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = floatsToShow.map(float => {
      const marker = new google.maps.Marker({
        position: { lat: float.lat, lng: float.lng },
        map: map,
        title: float.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: float.status === 'active' ? 8 : 6,
          fillColor: float.status === 'active' ? '#ef4444' : '#6b7280',
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-lg">${float.name}</h3>
            <p class="text-sm"><strong>Status:</strong> ${float.status}</p>
            <p class="text-sm"><strong>Last Update:</strong> ${new Date(float.lastUpdate).toLocaleString()}</p>
            ${float.temperature ? `<p class="text-sm"><strong>Temperature:</strong> ${float.temperature}°C</p>` : ''}
            ${float.salinity ? `<p class="text-sm"><strong>Salinity:</strong> ${float.salinity} PSU</p>` : ''}
            ${float.depth ? `<p class="text-sm"><strong>Depth:</strong> ${float.depth}m</p>` : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onFloatSelect) {
          onFloatSelect(float);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Add trajectory lines for active floats
    const trajectory = new google.maps.Polyline({
      path: floatsToShow
        .filter(float => float.status === 'active')
        .map(float => ({ lat: float.lat, lng: float.lng })),
      geodesic: true,
      strokeColor: '#3b82f6',
      strokeOpacity: 0.6,
      strokeWeight: 3
    });

    trajectory.setMap(map);

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
      trajectory.setMap(null);
    };
  }, [map, floatsToShow, onFloatSelect]);

  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}


