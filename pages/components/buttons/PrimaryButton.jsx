import Link from 'next/link'
import { Children } from 'react'

function PrimaryButton({children}) {
  return (
    <div class="relative inline-block group focus:outline-none focus:ring cursor-pointer" href="/download">
    <span class="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
    <span class="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
    <Link href="/">{children}</Link>
    </span>
    </div>
  )
}

export default PrimaryButton
