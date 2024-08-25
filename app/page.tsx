import Image from "next/image";
import { PatientForm } from "@/components/forms/PatientForm";
import { logo } from "@/constants";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Left Fixed Image */}
      <div className="fixed left-0 top-0 h-full w-[50%]">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Scrollable Section */}
      <div className="ml-[50%] w-[50%] h-full overflow-y-auto">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px] px-6 mx-auto">
          <Image
          src={logo}
          alt="logo"
          height={32}
          width={162}
          className="h-10 mb-2 max-w-md object-cover cursor-pointer"
        />

            <PatientForm />

            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 CarePluse
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
