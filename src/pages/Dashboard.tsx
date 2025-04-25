
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-cyber">
      <Navbar />
      <div className="w-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
