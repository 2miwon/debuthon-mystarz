import { Header } from "@/components/header";
import VoteButton from "@/components/vote-button";
import Image from "next/image";
export default function page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* 배경 이미지 */}
        <Image
          src="/vote-board.png"
          alt="vote-board"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 "
        />

        {/* 가로 정렬된 div 3개 */}
        <div className="flex gap-4 justify-center gap-x-20">
          <div className="w-1/5 z-10 rounded-lg">
            <Image src="/jang-vote.png" alt="vote" width={240} height={190} />
            <div className="flex flex-col justify-center">
              <p className="text-white">Jang Wonyoung</p>
              <input type="radio" name="vote" value="jang" />
            </div>
          </div>
          <div className="w-1/5 z-10 rounded-lg">
            <Image src="/han-vote.png" alt="vote" width={240} height={190} />
            <p className="text-white">Han Sohee</p>
          </div>
          <div className="w-1/5 z-10 rounded-lg">
            <Image src="/byun-vote.png" alt="vote" width={240} height={190} />
            <p className="text-white">Byun Wooseok</p>
          </div>
        </div>
      </div>

      <VoteButton />
    </div>
  );
}
