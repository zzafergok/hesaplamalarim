import { LoadingSpinner } from '@/components/core/spinner';

export default function PublicLoading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <LoadingSpinner size="lg" className="text-tulpar-blue" />
        <div className="space-y-1">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-titanium">
            İçerik Yükleniyor...
          </p>
          <p className="font-mono text-[10px] text-ash">
            Lütfen bekleyiniz • Loading public content
          </p>
        </div>
      </div>
    </div>
  );
}
