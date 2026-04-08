



//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working



import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react'
import { books, categories } from '../data/books'
import BookCard from '../components/BookCard'

const sortOptions = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'reviews',    label: 'Most Reviewed' },
]

export default function Browse() {
  const [query, setQuery]       = useState('')
  const [genre, setGenre]       = useState('all')
  const [sort, setSort]         = useState('featured')
  const [view, setView]         = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [maxPrice, setMaxPrice] = useState(100)

  const filtered = useMemo(() => {
    let result = [...books]
    if (query)       result = result.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
    if (genre !== 'all') result = result.filter(b => b.genre === genre)
    result = result.filter(b => b.price <= maxPrice)
    if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating)
    if (sort === 'reviews')    result.sort((a, b) => b.reviews - a.reviews)
    return result
  }, [query, genre, sort, maxPrice])

  const clearFilters = () => { setQuery(''); setGenre('all'); setSort('featured'); setMaxPrice(100) }
  const hasFilters = query || genre !== 'all' || sort !== 'featured' || maxPrice < 100

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Browse Books</h1>
          <p className="text-white/40 mt-1">{books.length} books available in our collection</p>
        </div>

        {/* Search + toolbar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search books or authors…"
              className="input-field w-full pl-11 pr-10"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>
          {/* fearuting for getting right product */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field min-w-[180px] cursor-pointer"
          >
            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <button
            onClick={() => setFiltersOpen(v => !v)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium
              ${filtersOpen ? 'border-accent-green/60 bg-accent-green/10 text-accent-green' : 'border-white/10 bg-dark-200 text-white/70 hover:border-white/30 hover:text-white'}`}
          >
            {/*   filter applied for getting right product */}
            <SlidersHorizontal size={16} />
            Filters {hasFilters && <span className="bg-accent-green text-dark-400 text-[10px] font-bold px-1.5 rounded-full">!</span>}
          </button>

          <div className="flex rounded-xl overflow-hidden border border-white/10">
            <button
              onClick={() => setView('grid')}
              className={`p-3 transition-colors ${view === 'grid' ? 'bg-accent-green/10 text-accent-green' : 'bg-dark-200 text-white/40 hover:text-white'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-3 transition-colors ${view === 'list' ? 'bg-accent-green/10 text-accent-green' : 'bg-dark-200 text-white/40 hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="card p-5 mb-6 border border-white/10">
            <div className="flex flex-wrap gap-6">
              {/* by genre */}
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs text-white/50 font-semibold uppercase tracking-wide mb-3">Genre</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setGenre(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${genre === cat.id ? 'bg-accent-green text-dark-400' : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'}`}
                    >
                      {cat.label} <span className="opacity-60">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* by Price */}
              <div className="min-w-[200px]">
                <p className="text-xs text-white/50 font-semibold uppercase tracking-wide mb-3">
                  Max Price: <span className="text-accent-green">${maxPrice}</span>
                </p>
                <input
                  type="range"
                  min={10} max={100} step={5}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#4ade80]"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>$10</span><span>$100</span>
                </div>
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="mt-4 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium">
                <X size={13} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results count after filtering */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-white/40">
            Showing <span className="text-white font-semibold">{filtered.length}</span> results
            {hasFilters && ' (filtered)'}
          </p>
        </div>

        {/* Books grid or list */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-white/60 text-lg">No books found</p>
            <button onClick={clearFilters} className="mt-4 btn-primary text-sm">Clear Filters</button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(book => <BookCard key={book.id} book={book} view="grid" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(book => <BookCard key={book.id} book={book} view="list" />)}
          </div>
        )}
      </div>
    </main>
  )
}
