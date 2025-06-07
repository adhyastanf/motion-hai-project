import SettingsDashboardPage from '@/features/settings/settings-view-page';

export const metadata = {
  title: 'Hai Motion | Settings',
  description: 'Manage your workspace settings, preferences, and configurations in Hai Motion dashboard.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function SettingsDashboard() {
  return <SettingsDashboardPage />;
}
