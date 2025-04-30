import { OrgSwitcher } from '@/components/org-switcher';

export default function HeadersDetailProject({ projects }) {
  return (
    <div>
      <OrgSwitcher projects={projects} />
    </div>
  );
}
