export interface SkeletonProps {}

export default function Skeleton(props: SkeletonProps) {
  return (
    <div className="border border-primary shadow rounded-md p-4 max-w-5xl w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
            <div className="h-2 bg-slate-600 rounded col-span-2"></div>
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
            <div className="h-2 bg-slate-600 rounded col-span-2"></div>
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
            <div className="h-2 bg-slate-600 rounded col-span-2"></div>
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
            <div className="h-2 bg-slate-600 rounded col-span-2"></div>
            <div className="h-2 bg-slate-600 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
