import AdminAside from '../../admin/adminAside'
import Navbar from '../../admin/Navbar'

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-[#1E1E30] min-h-screen px-4">
      <Navbar adminNavbar={true} />
      <AdminAside />
      <div className="pt-[100px] ps-[240px]">{children}</div>
    </div>
  )
}
export default AdminLayout
