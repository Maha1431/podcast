import Link from "next/link";

function SidebarItem({ index, name, isActive, to }) {
  return (
    <Link
      href={to}
      className={`flex gap-2 text-sm items-center p-2 rounded-full ${
        isActive ? "bg-violet-700 text-white" : ""
      }`}
    >
      <span
        className={` px-2 py-0.5 rounded-full ${
          isActive ? "bg-violet-900 text-white" : "bg-gray-300"
        }`}
      >
        {index}
      </span>
      <span>{name}</span>
    </Link>
  );
}

export default SidebarItem;
