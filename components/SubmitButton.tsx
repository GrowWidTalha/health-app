import Image from "next/image";

import { Button } from "./ui/button";
import Loader from "@/app/loading";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Loader size="small" isWhite/>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
