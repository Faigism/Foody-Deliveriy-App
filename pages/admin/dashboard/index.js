import AdminAside from '../../../shared/components/admin/adminAside'
import LineChart from '../../../shared/components/admin/lineChart'
import Navbar from '../../../shared/components/admin/Navbar'
import OrdersChart from '../../../shared/components/admin/ordersChart'
import AdminLayout from '../../../shared/components/layout/admin'

const Dashboard = () => {
  return (
    <AdminLayout>
      <div>
        <main className=" w-full flex flex-col  mmd:flex-row xl:ml-4  justify-between lg:justify-around">
          <OrdersChart />
          <LineChart />
        </main>
      </div>
    </AdminLayout>
  )
}
export default Dashboard
