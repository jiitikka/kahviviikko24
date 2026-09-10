'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Cafe } from '@/app/data/cafes';

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

// Popups take an HTML string, so anything interpolated has to be escaped —
// an ampersand in a name or URL would otherwise break the markup.
const esc = (value: string) => value.replace(/[&<>"']/g, (c) => ESCAPES[c]);

const popupHtml = (cafe: Cafe) =>
  [
    `<strong>${esc(cafe.name)}</strong>`,
    esc(cafe.area),
    cafe.site
      ? `<a href="${esc(cafe.site)}" target="_blank" rel="noopener">Kahvilan sivut →</a>`
      : '',
  ]
    .filter(Boolean)
    .join('<br>');

const CafeMap = ({ cafes }: { cafes: Cafe[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      if (!mapRef.current) {
        mapRef.current = L.map(containerRef.current, {
          scrollWheelZoom: false,
        }).setView([61.498, 23.761], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
          maxZoom: 18,
        }).addTo(mapRef.current);
        markersRef.current = L.layerGroup().addTo(mapRef.current);
      }

      const map = mapRef.current;
      const markers = markersRef.current;
      if (!map || !markers) return;

      markers.clearLayers();
      const points: [number, number][] = [];

      cafes.forEach((cafe) => {
        points.push([cafe.lat, cafe.lng]);
        L.circleMarker([cafe.lat, cafe.lng], {
          radius: 9,
          color: '#1A1614',
          weight: 1.5,
          fillColor: '#E47174',
          fillOpacity: 1,
        })
          .addTo(markers)
          .bindPopup(popupHtml(cafe));
      });

      if (points.length) {
        map.fitBounds(points, { padding: [40, 40], maxZoom: 14 });
      }
      map.invalidateSize();
    })();

    return () => {
      cancelled = true;
    };
  }, [cafes]);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = null;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Kahvilat kartalla. Ruudukkonäkymässä sama lista linkkeinä."
      className="relative z-0 h-full w-full rounded-md border-rule border-coffee"
      style={{ isolation: 'isolate' }}
    />
  );
};

export default CafeMap;
