import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const primaryLinks = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/reminders', label: 'Plan', icon: 'calendar' },
  { to: '/journal', label: 'Journal', icon: 'note' },
  { to: '/appointment-prep', label: 'Prepare', icon: 'clipboard' },
  { to: '/learn', label: 'Learn', icon: 'book' },
]

function Icon({ name }) {
  const paths = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    note: <><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8l-5 0V5a2 2 0 0 1 2-2Z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><path d="M9 4a3 3 0 0 1 6 0v2H9V4Zm0 7h6m-6 4h6" /></>,
    book: <><path d="M4 5a3 3 0 0 1 3-3h13v18H7a3 3 0 0 0-3 2V5Z" /><path d="M7 2v18m4-13h5m-5 4h5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.08 15a1.7 1.7 0 0 0-1.55-1H5.4v-3h.13a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.55 1h.13v3h-.13a1.7 1.7 0 0 0-1.55 1Z" /></>,
  }

  return <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function NavigationLink({ item, compact = false }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `inline-flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-bold motion-safe:transition-[background-color,color,transform] ${compact ? 'flex-col justify-center gap-1 px-2 text-xs' : ''} ${isActive ? 'bg-brand-100 text-brand-900 shadow-sm' : 'text-surface-700 hover:bg-lavender-100 hover:text-surface-950'}`}
    >
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  )
}

export default function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-surface-200/80 bg-white/90 p-5 backdrop-blur md:flex" aria-label="Primary navigation">
        <NavLink className="inline-flex min-h-11 items-center gap-2 px-3 font-display text-2xl font-bold tracking-tight text-brand-900" to="/dashboard"><span className="grid size-8 place-items-center rounded-xl bg-brand-600 font-sans text-sm text-white">P</span>PinkPath</NavLink>
        <p className="px-3 pt-5 text-sm text-surface-600 break-all">{user?.email}</p>
        <nav className="mt-6 grid gap-1" aria-label="Main">
          {primaryLinks.map((item) => <NavigationLink key={item.to} item={item} />)}
        </nav>
        <div className="mt-auto grid gap-1 border-t border-surface-200 pt-4">
          <NavigationLink item={{ to: '/settings', label: 'Settings', icon: 'settings' }} />
          <button className="inline-flex min-h-11 items-center gap-3 rounded-2xl px-3 text-left text-sm font-bold text-surface-700 hover:bg-lavender-100 hover:text-surface-950" type="button" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-surface-200/80 bg-white/95 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_24px_rgb(66_35_47/0.08)] backdrop-blur md:hidden" aria-label="Main">
        {primaryLinks.map((item) => <NavigationLink key={item.to} item={item} compact />)}
      </nav>
    </>
  )
}
