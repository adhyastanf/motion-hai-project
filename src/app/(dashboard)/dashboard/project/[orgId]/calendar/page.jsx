import DataCalendar from './data-calendar';

export default async function CalendarPage({ params }) {
  const { orgId } = await params;
  return <DataCalendar orgId={orgId} />;
}
