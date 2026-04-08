

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working



import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, BookOpen } from 'lucide-react'
import { monthlyStats, genreStats, books } from '../data/books'

const performanceIndicators = [
  {
    label: 'Total Revenue',
    value: '$186,430',
    change: '+18.4%',
    up: true,
    icon: DollarSign,
    color: 'text-accent-green',
    bg: 'bg-accent-green/10',
  },
  {
    label: 'Books Sold',
    value: '10,500',
    change: '+12.1%',
    up: true,
    icon: ShoppingBag,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Active Readers',
    value: '7,425',
    change: '+9.7%',
    up: true,
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    label: 'Avg. Order Value',
    value: '$17.75',
    change: '-2.3%',
    up: false,
    icon: BookOpen,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-200 border border-white/15 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white/60 text-xs mb-2 font-semibold">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} className="text-sm font-bold" style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.dataKey === 'revenue' ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const topBooks = [...books].sort((a, b) => b.sold - a.sold).slice(0, 5)

export default function Dashboard() {
  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white">Analytics Dashboard</h1>
          <p className="text-white/40 mt-1">Your BookVibe store performance overview</p>
        </div>

        {/* Performance Indicator cart */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {performanceIndicators.map(({ label, value, change, up, icon: Icon, color, bg }) => (
            <div key={label} className="card p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-accent-green' : 'text-red-400'}`}>
                  {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {change}
                </span>
              </div>
              <div className={`text-2xl font-extrabold ${color} mb-1`}>{value}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">

          {/* Monthly Revenue Line Chart */}
          <div className="card p-6 lg:col-span-2">
            <h2 className="text-white font-bold text-base mb-1">Monthly Revenue</h2>
            <p className="text-white/40 text-xs mb-6">2024 full year overview</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyStats} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4ade80" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#4ade80' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Pie Chart */}
          <div className="card p-6">
            <h2 className="text-white font-bold text-base mb-1">Sales by Genre</h2>
            <p className="text-white/40 text-xs mb-4">Distribution breakdown</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={genreStats} dataKey="value" nameKey="genre" cx="50%" cy="50%" outerRadius={75} innerRadius={42} paddingAngle={3}>
                  {genreStats.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#272727', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {genreStats.map(({ genre, value, color }) => (
                <div key={genre} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-white/60">{genre}</span>
                  </div>
                  <span className="text-white/80 font-semibold">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Monthly Sales Bar Chart */}
          <div className="card p-6">
            <h2 className="text-white font-bold text-base mb-1">Monthly Sales Volume</h2>
            <p className="text-white/40 text-xs mb-6">Books sold per month</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyStats} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Readers Bar Chart */}
          <div className="card p-6">
            <h2 className="text-white font-bold text-base mb-1">Active Readers</h2>
            <p className="text-white/40 text-xs mb-6">Monthly reader count</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyStats} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="readers" name="Readers" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top selling Books Table */}
        <div className="card p-6">
          <h2 className="text-white font-bold text-base mb-1">Top Selling Books</h2>
          <p className="text-white/40 text-xs mb-6">All-time bestsellers in your store</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-wide border-b border-white/5">
                  <th className="text-left pb-3 pr-4">#</th>
                  <th className="text-left pb-3 pr-4">Book</th>
                  <th className="text-left pb-3 pr-4 hidden sm:table-cell">Genre</th>
                  <th className="text-right pb-3 pr-4">Sold</th>
                  <th className="text-right pb-3 pr-4">Price</th>
                  <th className="text-right pb-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topBooks.map((book, i) => (
                  <tr key={book.id} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 text-white/30 font-bold">{i + 1}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={book.coverSm} alt={book.title} className="w-9 h-12 object-cover rounded-lg shadow flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium leading-snug line-clamp-1">{book.title}</p>
                          <p className="text-white/40 text-xs">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className="bg-accent-green/10 text-accent-green text-xs px-2 py-0.5 rounded-full font-medium">{book.genre}</span>
                    </td>
                    <td className="py-3 pr-4 text-right text-white font-semibold">{book.sold.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-right text-white/60">${book.price}</td>
                    <td className="py-3 text-right text-accent-green font-bold">${(book.sold * book.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  )
}
