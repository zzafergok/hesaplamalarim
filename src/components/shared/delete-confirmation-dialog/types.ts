export interface DeleteConfirmationDetailItem {
  label: string;
  value: string;
}

export interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityLabel: string;
  itemName: string;
  title?: string;
  description?: string;
  itemLabel?: string;
  details?: DeleteConfirmationDetailItem[];
  warning?: string;
  onConfirm: () => Promise<void> | void;
}

export type DeletePhase =
  | 'idle'
  | 'crumpling'
  | 'tossing'
  | 'waiting'
  | 'error';
