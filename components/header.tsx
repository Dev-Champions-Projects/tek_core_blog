// export default function Header({ about }: { about?: string }) {
//   return (
//     <div
//       className="w-full flex flex-col p-16 justify-center text-white container mx-auto
//     rounded-md items-center gap-1 text-center bg-linear-to-r from-blue-500 to-purple-500 shadow-lg
//     "
//     >
//       <h1 className="text-xl md:text-2xl font-semibold">
//         Latest news, tips, and insights <br />
//         {about ? `about ${about}` : "from our team of tech experts"}
//       </h1>
//       <p className="text-sx">
//         Here, you will always find latest news, more information about <br />
//         tech, AI trneds and software. Stay informed!
//       </p>
//     </div>
//   );
// }

export default function Header({ about }: { about?: string }) {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col justify-center text-white rounded-md items-center gap-3 text-center bg-black shadow-lg"
    >
      <h1 className="text-2xl md:text-3xl font-semibold  leading-snug">
        Explore Insights, Research, and Innovations
        <br />
       <span className="text-yellow-400">
  {about
          ? `in ${about}`
          : "in Artificial Intelligence, Technology, and Software Development"}

       </span>
             </h1>

      <p className="text-sm md:text-base text-gray-300 max-w-2xl">
        A community-driven platform where students, developers, and tech enthusiasts
        share ideas, publish projects, discuss innovations, and explore the future of
        AI and modern technology.
      </p>
    </div>
  );
}
