import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-500 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2">/</span>}
            <Link href={item.href}>
              <span className="hover:text-blue-600">{item.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
