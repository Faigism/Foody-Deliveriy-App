import AuthCheck from '../../../shared/components/admin/authCheck'
import LineChart from '../../../shared/components/admin/lineChart'
import OrdersChart from '../../../shared/components/admin/ordersChart'
import StackingChart from '../../../shared/components/admin/stackingChart'
import AdminLayout from '../../../shared/components/layout/admin'

const Dashboard = () => {
  return (
    <AuthCheck>
      <AdminLayout>
        <div>
          <main className=" w-full flex flex-col  mmd:flex-row xl:ml-4  justify-between lg:justify-around flex-wrap">
            <OrdersChart />
            <LineChart />
            <StackingChart />
          </main>
        </div>
      </AdminLayout>
    </AuthCheck>
  )
}
export default Dashboard
