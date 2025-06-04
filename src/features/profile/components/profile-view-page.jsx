'use client'

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import ProfileAvatarForm from './profile-avatar-form';
import ProfileEmailForm from './profile-email-form';
import ProfilePasswordForm from './profile-password-form';

export default function ProfileViewPage({user}) {

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 justify-center px-4">
        <div className="w-full max-w-2xl space-y-6">
          <Heading title="Your Profile" description="Update your profile information here." />

          {/* Profile Avatar and Name */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profile Picture & Name</CardTitle>
              <CardDescription>Change your avatar and display name.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileAvatarForm user={user}/>
            </CardContent>
          </Card>

          {/* Email Update */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Update your email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileEmailForm user={user}/>
            </CardContent>
          </Card>

          {/* Password Update */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password securely.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfilePasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
