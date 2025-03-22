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
            <div className="flex flex-col pt-5 justify-center text-center items-center gap-y-4">
              <p className="text-white font-bold">Jang Wonyoung</p>
              <input
                type="radio"
                name="vote"
                value="jang"
                className="w-6 h-6 appearance-none border-2 border-white rounded-full 
             checked:border-white relative 
             checked:after:content-[''] checked:after:w-3 checked:after:h-3 
             checked:after:bg-white checked:after:rounded-full 
             checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
             checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
              />
            </div>
          </div>
          <div className="w-1/5 z-10 rounded-lg">
            <Image src="/han-vote.png" alt="vote" width={240} height={190} />
            <div className="flex flex-col pt-5 justify-center items-center text-center gap-y-4">
              <p className="text-white font-bold">Han Sohee</p>
              <input
                type="radio"
                name="vote"
                value="jang"
                className="w-6 h-6 appearance-none border-2 border-white rounded-full 
             checked:border-white relative 
             checked:after:content-[''] checked:after:w-3 checked:after:h-3 
             checked:after:bg-white checked:after:rounded-full 
             checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
             checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
              />
            </div>
          </div>
          <div className="w-1/5 z-10 rounded-lg">
            <Image src="/byun-vote.png" alt="vote" width={240} height={190} />

            <div className="flex flex-col pt-5 justify-center items-center text-center gap-y-4">
              <p className="text-white font-bold">Byun Wooseok</p>
              <input
                type="radio"
                name="vote"
                value="jang"
                className="w-6 h-6 appearance-none border-2 border-white rounded-full 
             checked:border-white relative 
             checked:after:content-[''] checked:after:w-3 checked:after:h-3 
             checked:after:bg-white checked:after:rounded-full 
             checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
             checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      <VoteButton />
    </div>
  );
}
