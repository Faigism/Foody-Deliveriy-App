import { BarChart } from '@mui/x-charts'

const StackingChart = () => {
  const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: 'Series A',
  }
  const seriesB = {
    data: [3, 1, 4, 2, 1],
    label: 'Series B',
  }
  const seriesC = {
    data: [3, 2, 4, 5, 1],
    label: 'Series C',
  }

  return (
    <div className="mt-10">
      <BarChart
        width={600}
        height={300}
        series={[
          { ...seriesA, stack: 'total' },
          { ...seriesB, stack: 'total' },
          { ...seriesC, stack: 'total' },
        ]}
      />
    </div>
  )
}
export default StackingChart
