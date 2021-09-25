export default function Footer() {
  return (
    <footer className="bg-white mt-4">
      <ul className="flex items-center justify-between lg:container px-3 py-3 mx-auto text-sm text-gray-600 md:px-6">
        <li>
          Created by{" "}
          <a
            href="https://taylorbryant.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Taylor Bryant
          </a>
        </li>

        <li>
          <a
            href="https://github.com/oddstronaut/next-starter-tailwind"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  )
}