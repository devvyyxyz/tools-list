const ToolCardSkeleton = () => {
  return (
    <div className="glass-panel flex h-full min-h-[380px] flex-col gap-4 p-5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="skeleton h-5 w-3/5" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
        <div className="skeleton h-3 w-1/2" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-3 w-4/6" />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>

      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  )
}

export default ToolCardSkeleton
