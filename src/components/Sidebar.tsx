import { 
  HomeIcon,
  UsersIcon,
  DocumentReportIcon  // Raporlar için yeni icon eklendi
} from '@heroicons/react/outline'

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: HomeIcon },
  { name: 'Kullanıcılar', href: '/users', icon: UsersIcon },
  { name: 'Raporlar', href: '/reports', icon: DocumentReportIcon }, // Yeni menü öğesi eklendi
  {
    title: 'Hizmet Listesi',
    path: '/services'
  }
]

{
  title: 'Hizmetler',
  icon: <ServiceIcon />,
  children: navigation
}, 