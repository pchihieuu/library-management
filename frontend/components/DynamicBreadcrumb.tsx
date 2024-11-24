'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { breadcrumbNameMap } from 'app/utils/breadcrumbMap';

export function DynamicBreadcrumb() {
  const pathname = usePathname(); 

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      label: breadcrumbNameMap[path] || segment,
      href: path,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:underline">
        Dashboard
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={index} className="flex items-center space-x-2">
          <span>/</span>
          {index < breadcrumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
          ) : (
            <span>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
