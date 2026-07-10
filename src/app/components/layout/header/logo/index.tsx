// import { getImagePath } from "@/lib/utils/imagePath";

import Image from "next/image";
import Link from "next/link";
import LogoVLocker from '../../../../../../public/images/logo/VLocker_logo5.png'

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        // src={getImagePath("/images/logo/logo.svg")}
        src={LogoVLocker}
        alt="logo"
        width={160}
        height={50}
        quality={100}
        // style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
