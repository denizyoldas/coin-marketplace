interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  return <div className="px-6 py-4">{props.children}</div>
}
