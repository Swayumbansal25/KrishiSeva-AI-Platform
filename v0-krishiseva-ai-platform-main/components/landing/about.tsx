"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
import { useEffect, useState } from "react"

const images = [
  { src: "/images/farmer-field.jpg", alt: "Farmer working in the field" },
  { src: "/images/rural-road.jpg", alt: "Rural countryside road" },
  { src: "/images/green-hills.jpg", alt: "Terraced green farmland" },
  { src: "/images/crop-closeup.jpg", alt: "Close-up of healthy crop leaves" },
]

export function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="))
    setIsLoggedIn(!!cookie)
  }, [])

  return (
    <section className="bg-background px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              About our Model
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Our AI-based crop health analysis system leverages advanced image recognition
                to examine plant leaves and detect early signs of nutrient deficiency, water
                stress, and weather-related damage.
              </p>
              <p>
                By combining real-time soil parameters, temperature, humidity, and rainfall
                data with predictive modeling, Krishiseva delivers precise, actionable
                insights that help farmers optimize their yield and reduce crop loss.
              </p>
              <p>
                Whether you are managing a small farm or overseeing large-scale agricultural
                operations, our platform provides the intelligence you need to make informed
                decisions throughout every growing season.
              </p>
            </div>

            {isLoggedIn ? (
              <Link
                href="/dashboard/upload"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Upload & Analyze
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed">
                <Lock className="h-4 w-4" />
                Login to Upload & Analyze
              </div>
            )}
          </div>

          {/* Image Cards */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div
                key={image.src}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}