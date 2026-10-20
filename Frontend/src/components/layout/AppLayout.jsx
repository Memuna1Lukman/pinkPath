import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function AppLayout() {
  return (
    <div className="min-h-svh bg-surface-50 text-surface-900 md:pl-72">
      <a className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-white px-4 py-2 font-semibold text-brand-900 shadow-card focus:not-sr-only" href="#main-content">Skip to content</a>
      <Navbar />
      <div id="main-content" className="min-h-[calc(100svh-5.5rem)] pb-24 outline-none md:min-h-[calc(100svh-4rem)] md:pb-0" tabIndex="-1">
        <Outlet />
      </div>
      <div className="hidden md:block"><Footer /></div>
    </div>
  )
}
