import EventsPage from '@/components/ecosystem/events/EventsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events - StarHub',
  description: 'Explore upcoming StarHub ecosystem events, investor sessions, startup workshops, and challenge briefings.',
};

export default function Page() {
  return <EventsPage />;
}