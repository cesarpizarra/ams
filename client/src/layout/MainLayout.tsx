import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
interface LayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Sidebar />
      <div className="px-5">{children}</div>
    </div>
  );
};

export default MainLayout;
