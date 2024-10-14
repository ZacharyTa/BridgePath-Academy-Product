const SkeletonHome = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-6">
      {/* Skeleton loaders */}
      <div className="skeleton h-16 w-full"></div>
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
      <div className="skeleton h-64 w-full"></div>
      <div className="skeleton h-64 w-full"></div>
    </div>
  );
};

export default SkeletonHome;
