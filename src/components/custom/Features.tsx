import { Atom, Blocks, Flower2, SquarePen } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section className="bg-gray-960 text-white container my-5">
  <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold sm:text-4xl">What makes us <span className=' text-blue-500'>special</span></h2>

      <p className="mt-4 text-gray-300/60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
        iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
        quibusdam, quos fuga minima.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
      <div className="sm:flex items-start border p-5 rounded-lg cursor-default hover:shadow-blue-500/10 shadow-xl transition gap-4">
        <div className="shrink-0 rounded-lg  w-fit mb-3 sm:mb-0 bg-gray-800 p-4">
          <Atom size={29}  />
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-500">The Power of Gemini AI</h2>

          <p className="mt-1 text-sm text-gray-300/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
            possimus quisquam reiciendis tempora animi! Quaerat, saepe?
          </p>
        </div>
      </div>

      <div className="sm:flex items-start border p-5 rounded-lg cursor-default hover:shadow-blue-500/10 shadow-xl transition gap-4">
        <div className="shrink-0 rounded-lg  w-fit mb-3 sm:mb-0 bg-gray-800 p-4">
          <SquarePen size={29}  />
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-500">Edit the Forms on the Go</h2>

          <p className="mt-1 text-sm text-gray-300/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
            possimus quisquam reiciendis tempora animi! Quaerat, saepe?
          </p>
        </div>
      </div>

      <div className="sm:flex items-start border p-5 rounded-lg cursor-default hover:shadow-blue-500/10 shadow-xl transition gap-4">
        <div className="shrink-0 rounded-lg w-fit mb-3 sm:mb-0 bg-gray-800 p-4">
          <Blocks size={29}  />
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-500">Integrate with Google Form</h2>

          <p className="mt-1 text-sm text-gray-300/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
            possimus quisquam reiciendis tempora animi! Quaerat, saepe?
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
  )
}

export default Features