import { AuthWorkspaceScreen } from '@/features/routes/auth/workspace';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('authWorkspace');

export default function WorkspacePage() {
  return <AuthWorkspaceScreen />;
}
