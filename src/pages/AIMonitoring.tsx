
import Navbar from "@/components/Navbar";
import AIResponseViewer from "@/components/AIResponseViewer";

const AIMonitoringPage = () => {
  return (
    <div className="min-h-screen w-full bg-cyber">
      <Navbar />
      <div className="w-full">
        <AIResponseViewer />
      </div>
    </div>
  );
};

export default AIMonitoringPage;
