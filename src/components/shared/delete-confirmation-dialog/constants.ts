export function wait(duration: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

export const defaultCopy = {
  tr: {
    titleConfirm: '{label} Silme Onayı',
    description:
      'Bu {label} kalıcı olarak silinecektir. Bu işlem geri alınamaz.',
    errorDescription:
      'Silme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    itemLabel: 'Silinecek {label}',
    cancel: 'Vazgeç',
    confirm: 'Silmeyi Onayla',
    deleting: 'Siliniyor...',
    deletingStatus: 'SİLİNİYOR',
    movingToTrashText: 'Kayıt çöp kutusuna taşınıyor...',
    completingText: 'Silme işlemi tamamlanıyor...',
  },
  en: {
    titleConfirm: 'Confirm {label} Deletion',
    description:
      'This {label} will be permanently deleted. This action cannot be undone.',
    errorDescription: 'An error occurred during deletion. Please try again.',
    itemLabel: '{label} to delete',
    cancel: 'Cancel',
    confirm: 'Confirm Delete',
    deleting: 'Deleting...',
    deletingStatus: 'DELETING',
    movingToTrashText: 'Moving record to trash...',
    completingText: 'Completing deletion...',
  },
};
