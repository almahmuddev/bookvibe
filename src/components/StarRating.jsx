

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


export default function StarRating({ rating, size = 'sm', showValue = true }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const sz = size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm'

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-0.5 ${sz}`}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className="text-yellow-400">★</span>
        ))}
        {half && <span className="text-yellow-400">⯨</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className="text-white/20">★</span>
        ))}
      </div>
      {showValue && (
        <span className="text-white/60 text-xs ml-0.5">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
