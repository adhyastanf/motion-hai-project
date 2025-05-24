import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormWorkspace from '@/features/overview/components/area-project/form-workspace';

export default function CreateWorkspcePage() {
  return (
    <PageContainer>
      <Card className="w-full max-w-md p-1 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Create Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormWorkspace />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
