import React from 'react'

function StatsCard({title, value, gradient}) {
  return (
    <div>
      <div className={`shadow-lg ${gradient} text-white rounded-lg p-6 text-center`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
    </div>
  )
}

export default StatsCard
