export default async function DetailProject({ params }) {
  const { projectId } = await params;

    return <div>{projectId}</div>;
}
