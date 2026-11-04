import type { PromptStudioSelection } from '@/features/turkish-culture/types';

export interface PromptStudioBarProps {
  selection: PromptStudioSelection;
  onUpdateSelection: (updates: Partial<PromptStudioSelection>) => void;
  onResetSelection: () => void;
}
