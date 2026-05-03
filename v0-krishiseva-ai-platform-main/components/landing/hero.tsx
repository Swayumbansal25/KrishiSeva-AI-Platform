import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src="/images/hero-farm.jpg"
        alt="Lush green farmland stretching to the horizon"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
          Cultivating Intelligence for Every Harvest
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
          AI-powered crop recommendations based on soil, weather, and environmental data.
        </p>
      </div>
    </section>
  )
}
