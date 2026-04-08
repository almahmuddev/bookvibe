

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working

const colorMap = {
  green:  'bg-accent-green/20 text-accent-green border-accent-green/30',
  blue:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  red:    'bg-red-500/20 text-red-400 border-red-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  gold:   'bg-yellow-600/20 text-yellow-300 border-yellow-600/30',
}

export default function Badge({ label, color = 'green', className = '' }) {
  if (!label) return null
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${colorMap[color] ?? colorMap.green} ${className}`}>
      {label}
    </span>
  )
}
