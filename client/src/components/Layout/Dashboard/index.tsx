import { Link } from "react-router-dom";
import { IoLibrary, IoBusiness } from "react-icons/io5";

const dashboardRoutes = [
  {
    path: "/dashboard/companies",
    name: "Companies",
    icon: (
      <IoBusiness className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
    ),
  },
  {
    path: "/dashboard/wastes",
    name: "Wastes",
    icon: (
      <IoLibrary className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
    ),
  },
];

const DashboardLayout = () => {
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal"
    >
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 ">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1 divide-y divide-gray-200 ">
            <ul className="py-10 space-y-2">
              {dashboardRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    {route.icon}
                    <span className="ml-3">{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardLayout;
