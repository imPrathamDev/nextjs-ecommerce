import Link from 'next/link'

function SecondaryButton({children}) {
  return (
    <div class="relative inline-block group focus:outline-none focus:ring cursor-pointer">
    <span class="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-primary-semi-light group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>
    <span class="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current">
      <Link href="/">{children}</Link>
    </span>
    </div>
  )
}

export default SecondaryButton
