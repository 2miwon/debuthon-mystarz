"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Star {
  id: string
  name: string
  image: string
}

export default function StarVoting() {
  const [selectedStar, setSelectedStar] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const stars: Star[] = [
    {
      id: "jang-wonyoung",
      name: "Jang Wonyoung",
      image: "/placeholder.svg?height=380&width=300",
    },
    {
      id: "han-sohee",
      name: "Han Sohee",
      image: "/placeholder.svg?height=380&width=300",
    },
    {
      id: "byun-wooseok",
      name: "Byun Wooseok",
      image: "/placeholder.svg?height=380&width=300",
    },
  ]

  const handleSubmit = () => {
    if (selectedStar) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-500 p-4">
      <h1 className="text-4xl font-bold text-white text-center mb-12">Pick Your Star for the Next Initiative!</h1>

      <div className="w-full max-w-6xl">
        <RadioGroup
          value={selectedStar}
          onValueChange={setSelectedStar}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stars.map((star) => (
            <div key={star.id} className="flex flex-col items-center">
              <div className="bg-white rounded-3xl p-2 mb-4 w-full max-w-[300px] overflow-hidden">
                <img src={star.image || "/placeholder.svg"} alt={star.name} className="w-full h-auto rounded-2xl" />
              </div>
              <p className="text-white text-2xl font-medium mb-2">{star.name}</p>
              <Label htmlFor={star.id} className="cursor-pointer flex items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center ${selectedStar === star.id ? "bg-white" : "bg-transparent"}`}
                >
                  <RadioGroupItem value={star.id} id={star.id} className="sr-only" />
                  {selectedStar === star.id && <div className="w-6 h-6 rounded-full bg-pink-500" />}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-12">
        <Button
          onClick={handleSubmit}
          disabled={!selectedStar || isSubmitted}
          className={`px-8 py-6 text-xl font-semibold rounded-full ${
            isSubmitted ? "bg-pink-600 hover:bg-pink-600" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {isSubmitted ? "Vote Submitted" : "Submit Vote"}
        </Button>
      </div>
    </div>
  )
}

