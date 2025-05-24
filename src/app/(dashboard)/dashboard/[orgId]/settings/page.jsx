import SettingsDashboardPage from '@/features/settings/settings-view-page';

export default async function SettingsDashboard({ params }) {
  const { orgId } = await params;
  return <SettingsDashboardPage orgId={orgId} />;
}
