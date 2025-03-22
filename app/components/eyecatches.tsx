import Image from "next/image";

export default function EyeCatches() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 pb-10">
      {/* 7/10 비율 이미지 */}
      <div className="w-full md:w-[70%] relative h-[300px] md:h-[400px]">
        <Image
          src="/njz-album.png"
          alt="njz-album"
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* 3/10 비율 이미지 */}
      <div className="w-full md:w-[30%] relative h-[300px] md:h-[400px]">
        <Image
          src="/impact-fi.png?height=800&width=600"
          alt="impact-fi"
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

{
  /* <div className="flex gap-x-2 w-full"> */
}
{
  /*    <div className="flex-7 max-w-full"> */
}
{
  /*      <Image */
}
{
  /*        src="/njz-album.png" */
}
{
  /*        alt="njz-album" */
}
{
  /*        width={780} */
}
{
  /*        height={380} */
}
{
  /*        objectFit="cover" */
}
{
  /*        layout="responseive" */
}
{
  /*      /> */
}
{
  /*    </div> */
}
{
  /**/
}
{
  /*    <div className="flex-3 max-w-full"> */
}
{
  /*      <Image */
}
{
  /*        src="/impact-fi.png" */
}
{
  /*        alt="impact-fi" */
}
{
  /*        width={380} */
}
{
  /*        height={380} */
}
{
  /*        objectFit="cover" */
}
{
  /*        layout="responseive" */
}
{
  /*      /> */
}
{
  /*    </div> */
}
{
  /*  </div> */
}
