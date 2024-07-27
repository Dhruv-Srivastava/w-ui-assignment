import HeroGif from "../assets/HeroGif.mp4";
export default function Hero() {
  return (
    <section className="hidden lg:block lg:h-[100dvh] lg:w-full lg:relative">
      <video
        src={HeroGif}
        alt=""
        className="w-full h-full rounded-md object-center object-cover"
        autoPlay
        loop
      />
      <div className="absolute z-40 inset-0 grid place-items-center text-white">
        <h1 className="text-[4rem] font-semibold">Discover Your Inner Peace</h1>
      </div>
    </section>
  );
}
