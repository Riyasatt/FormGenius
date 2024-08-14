import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (

<section className="bg-slate-950 ">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt="background"
        src="/sign-bg.jpg"
        width={2000}
        height={2000}
        className="absolute inset-0 h-full w-full opacity-30 object-cover "
      />

      <div className="hidden lg:relative lg:block lg:p-12">
      <Link
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
            href={'/'}
          >
            <span className="sr-only">Home</span>
            <Image src={'/logo.svg'} height={30} width={30} alt="logo" />
          </Link>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to FormGenius🦑
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
          quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      className="flex  items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <Link
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
            href={'/'}
          >
            <Image src={'/logo.svg'} height={30} width={30} alt="logo" />
          </Link>

          <h1 className="mt-2 text-2xl font-bold mb-5 text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
            Welcome to FormGenius 🦑
          </h1>

          
        </div>
        <SignIn />
      </div>
    </main>
  </div>
</section>
  
  );
  }