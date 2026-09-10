'use client';

import Button from './ui/Button';
import { DAYS, type Event } from '@/app/data/events';

const PinIcon = () => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M11 5.6c0 3.3-4.5 6.6-4.5 6.6S2 8.9 2 5.6a4.5 4.5 0 0 1 9 0Z" />
    <circle cx="6.5" cy="5.5" r="1.6" />
  </svg>
);

const EventCard = ({ event }: { event: Event }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.place
  )}`;

  return (
    <div className="flex max-w-[320px] flex-1 basis-[280px] flex-col gap-2 overflow-hidden rounded-md border-rule border-coffee bg-cream p-[18px] font-body text-coffee">
      <span className="self-start font-display text-[11px] font-medium uppercase tracking-[0.16em] text-coral-text">
        {event.time}
      </span>
      <h3 className="m-0 font-display text-[21px] font-extrabold tracking-[-0.01em]">
        {event.title}
      </h3>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener"
        className="tkv-link-plain flex items-center gap-[6px] font-display text-[14px] font-bold leading-[1.4]"
      >
        <PinIcon />
        {event.place}
      </a>
      <p className="m-0 text-[15px] leading-[1.6]">{event.desc}</p>
      {event.badge && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border-rule border-coffee px-[10px] py-[3px] font-display text-[11px] font-medium uppercase tracking-[0.16em] text-coffee">
            {event.badge}
          </span>
        </div>
      )}
      {event.signupUrl && (
        <div className="mt-[2px] self-start">
          <Button variant="coral" href={event.signupUrl}>
            {event.signupLabel ?? 'Ilmoittaudu'}
          </Button>
        </div>
      )}
    </div>
  );
};

const Schedule = () => {
  // Every day's events in one row while the programme is small. The day
  // grouping stays in the data so a tabbed view can come back when there is
  // more to split — until then each card carries its own date.
  const events = Object.values(DAYS).flatMap((day) => day.events);

  return (
    <section
      id="ohjelma"
      className="tkv-gutter tkv-section-y flex flex-col gap-6 bg-white"
    >
      <span className="tkv-label">Kahviviikon ohjelma</span>
      <h2 className="tkv-h2 text-coffee">1.–11.10. kaupungilla tapahtuu</h2>

      <div className="flex flex-wrap gap-5">
        {events.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>

      <p className="m-0 font-body text-[16px] leading-[1.6] text-coffee opacity-75">
        Lisää tapahtumia julkaistaan lähempänä kahviviikkoa.
      </p>
    </section>
  );
};

export default Schedule;
