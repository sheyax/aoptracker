import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="md:grid md:grid-cols-5 ">
        <Sidebar />
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
