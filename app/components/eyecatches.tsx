import Image from "next/image";
import Link from "next/link";

export default function EyeCatches() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 pb-10">
      {/* 7/10 비율 이미지 */}
      <div className="w-full md:w-[70%] relative h-[300px] md:h-[400px]">
        <Link href="/vote">
          <Image
            src="/njz-album.png"
            alt="njz-album"
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </Link>
      </div>

      {/* 3/10 비율 이미지 */}
      <div className="w-full md:w-[30%] relative h-[300px] md:h-[400px]">
        <Link href="/impact-badge">
          <Image
            src="/impact-fi.png?height=800&width=600"
            alt="impact-fi"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
    </div>
  );
}
