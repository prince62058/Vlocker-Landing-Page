import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src={getImagePath("/images/logo/VLocker_logo5.png")}
        alt="VLocker Logo"
        width={160}
        height={50}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
