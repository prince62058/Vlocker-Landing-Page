import Link from "next/link";
import { BreadcrumbProps } from "../../types/breadcrumb"; // Adjust the import path based on your project structure

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  pageName,
  pageDescription,
}) => {
  return (
    <div className="relative z-10 overflow-hidden pb-[40px] pt-[140px] md:pt-[150px] lg:pt-[180px] bg-body-bg">
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent opacity-30"></div>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 text-center">
            <h1 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl tracking-tight text-white capitalize">
              {pageName}
            </h1>
            <p className="mb-6 text-base text-lightblue opacity-70 max-w-[600px] mx-auto">
              {pageDescription}
            </p>

            <ul className="flex items-center justify-center gap-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm font-bold text-lightblue hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-lightblue/30 font-bold"> / </li>
              <li>
                <p className="text-sm font-bold text-white tracking-wide">
                  {pageName}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
