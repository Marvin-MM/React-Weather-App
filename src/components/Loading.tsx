import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary z-50">
      <div className="lg:block hidden animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
      <Loader className="animate-spin h-10 w-10 md:hidden" />
    </div>
  );
};

export default Loading;