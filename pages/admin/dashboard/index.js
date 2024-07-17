import AdminAside from '../../../shared/components/admin/adminAside'
import LineChart from '../../../shared/components/admin/lineChart'
import Navbar from '../../../shared/components/admin/Navbar'
import OrdersChart from '../../../shared/components/admin/ordersChart'

const Dashboard = () => {
  return (
    <div className=" bg-textBlack min-h-screen px-4">
      <Navbar adminNavbar={true} />
      <div className="flex">
        <AdminAside />
      </div>
      <main className=" w-full flex flex-col  mmd:flex-row xl:ml-4  justify-between lg:justify-around">
        <OrdersChart />
        <LineChart />
      </main>
    </div>
  )
}
export default Dashboard
