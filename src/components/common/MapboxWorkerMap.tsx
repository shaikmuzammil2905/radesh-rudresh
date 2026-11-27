'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Worker } from '@/types';
import { MapPin, Navigation, Layers, ShieldCheck, Star } from 'lucide-react';

interface MapboxWorkerMapProps {
  workers: Worker[];
  selectedWorker: Worker | null;
  onSelectWorker: (worker: Worker) => void;
  userCoordinates?: [number, number]; // [lng, lat]
}

// Hyderabad Locality Coordinates for Realistic Worker Geocoding
const HYDERABAD_LOCALITIES: [number, number][] = [
  [78.4068, 17.4319], // Jubilee Hills
  [78.4357, 17.4156], // Banjara Hills
  [78.3845, 17.4483], // Madhapur / Hitec City
  [78.3610, 17.4401], // Gachibowli
  [78.4682, 17.4448], // Begumpet
  [78.4983, 17.4399], // Secunderabad
  [78.3578, 17.4699], // Kondapur
  [78.3986, 17.4875], // Kukatpally
  [78.4744, 17.3616], // Charminar / Old City
  [78.4312, 17.3984], // Mehdipatnam
];

export const MapboxWorkerMap: React.FC<MapboxWorkerMapProps> = ({
  workers,
  selectedWorker,
  onSelectWorker,
  userCoordinates = [78.4215, 17.4237], // Banjara/Jubilee central construction hub
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!token) {
      setMapError('Mapbox access token is missing');
      return;
    }

    try {
      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userCoordinates,
        zoom: 12.8,
        pitch: 25,
      });

      // Add navigation controls
      map.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          visualizePitch: true,
        }),
        'top-right'
      );

      map.on('load', () => {
        setMapLoaded(true);
        map.resize();
      });

      map.on('error', (e) => {
        console.warn('Mapbox event error:', e);
      });

      mapRef.current = map;

      return () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        if (userMarkerRef.current) userMarkerRef.current.remove();
        map.remove();
      };
    } catch (err: any) {
      console.error('Mapbox init error:', err);
      setMapError(err?.message || 'Failed to initialize Mapbox');
    }
  }, [token]);

  // Render User Site Location Marker
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const el = document.createElement('div');
    el.className = 'user-site-marker flex flex-col items-center cursor-pointer pointer-events-auto';
    el.innerHTML = `
      <div class="relative flex items-center justify-center">
        <div class="w-10 h-10 rounded-full bg-pink-500/25 animate-ping absolute inset-0"></div>
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#FF4081] border-2 border-white shadow-xl flex items-center justify-center text-white relative z-10">
          <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
        </div>
      </div>
      <div class="bg-gray-900/90 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-md mt-1 border border-white/20 whitespace-nowrap">
        Your Site Location
      </div>
    `;

    userMarkerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat(userCoordinates)
      .addTo(mapRef.current);
  }, [mapLoaded, userCoordinates]);

  // Render Worker Markers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    workers.forEach((worker, idx) => {
      const coords = HYDERABAD_LOCALITIES[idx % HYDERABAD_LOCALITIES.length];
      const isSelected = selectedWorker?.id === worker.id;

      const el = document.createElement('div');
      el.className = 'worker-mapbox-marker cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95';

      el.innerHTML = `
        <div class="relative flex items-center gap-1.5 p-1 rounded-full shadow-lg border-2 transition-all ${
          isSelected
            ? 'bg-[#E91E63] border-white ring-4 ring-pink-300 scale-105'
            : 'bg-white border-[#E91E63]'
        }">
          <div class="relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-gray-200">
            <img src="${worker.photo}" alt="${worker.name}" class="w-full h-full object-cover" />
          </div>
          <span class="text-[9.5px] font-black pr-1.5 ${isSelected ? 'text-white' : 'text-gray-900'}">
            ₹${worker.ratePerDay}
          </span>
          ${
            worker.isOnline
              ? '<span class="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 border border-white"></span>'
              : ''
          }
        </div>
      `;

      el.addEventListener('click', () => {
        onSelectWorker(worker);
        mapRef.current?.flyTo({
          center: coords,
          zoom: 14.5,
          speed: 1.2,
          curve: 1.4,
          essential: true,
        });
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(coords)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [workers, selectedWorker, mapLoaded, onSelectWorker]);

  return (
    <div className="relative h-[650px] w-full bg-slate-100 overflow-hidden select-none">
      {/* Mapbox Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Mapbox Live Badge */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-200 shadow-xs flex items-center gap-1.5 text-[10px] text-gray-700 font-semibold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Mapbox GL Live GPS</span>
        <span className="text-[9px] text-gray-400">| Hyderabad</span>
      </div>

      {/* Recenter Button */}
      <button
        onClick={() => {
          mapRef.current?.flyTo({
            center: userCoordinates,
            zoom: 12.8,
            speed: 1.2,
          });
        }}
        className="absolute bottom-24 right-3 z-10 p-2.5 bg-white text-gray-700 hover:text-brand-500 rounded-xl shadow-md border border-gray-200 transition active:scale-90"
        title="Recenter Site Location"
      >
        <Navigation className="w-4 h-4" />
      </button>

      {/* Fallback if map fails or token issue */}
      {mapError && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex items-center justify-center p-6 text-center z-20">
          <div className="max-w-xs space-y-2">
            <p className="text-xs font-bold text-red-500">Map Loading Error</p>
            <p className="text-[11px] text-gray-500">{mapError}</p>
          </div>
        </div>
      )}
    </div>
  );
};
