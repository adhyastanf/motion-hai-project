import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormWorkspace from '@/features/overview/components/area-project/form-workspace';

export const metadata = {
  title: 'Hai Motion | Create Workspace',
  description: 'Create your first workspace to start managing projects and collaborating.',
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

export default function CreateWorkspcePage() {
  return (
    <PageContainer scrollable={false}>
      <div className='space-y-4 w-full max-w-md mx-auto'>
        <Card className='p-1 shadow-md'>
          <CardHeader className='pb-1'>
            <CardTitle className='text-xl'>Create Your First Workspace</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormWorkspace />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
