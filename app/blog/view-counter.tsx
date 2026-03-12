export default function ViewCounter({
  slug,
  allViews,
}: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  return (
    <p className="text-sm text-neutral-500 dark:text-neutral-500">
      {`${number.toLocaleString()} views`}
    </p>
  );
}
