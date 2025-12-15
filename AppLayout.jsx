// AppLayout.jsx
import Sidebar from "../frontend/src/Component/Sidebar";

function AppLayout() {
  const user = JSON.parse(localStorage.getItem("user")); // Example
  return (
    <div className="flex">
      <Sidebar role={user?.role} />
      <div className="flex-1">
        {/* Main content here */}
      </div>
    </div>
  );
}
export default AppLayout