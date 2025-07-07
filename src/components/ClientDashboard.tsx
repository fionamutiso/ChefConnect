import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Search, 
  Heart, 
  LogOut,
  ChefHat,
  Filter,
  BookOpen,
  MessageCircle
} from 'lucide-react';

interface Chef {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  experience: string;
  location: string;
  priceRange: string;
  image: string;
  isAvailable: boolean;
}

interface Booking {
  id: string;
  chefName: string;
  date: string;
  time: string;
  guests: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  total: number;
}

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'search' | 'bookings' | 'favorites'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [chefs] = useState<Chef[]>([
    {
      id: '1',
      name: 'Chef Maria Rodriguez',
      cuisine: 'Italian & Mediterranean',
      rating: 4.9,
      experience: '15+ years',
      location: 'Downtown',
      priceRange: '$50-100 per person',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Chef James Chen',
      cuisine: 'Asian Fusion',
      rating: 4.8,
      experience: '12+ years',
      location: 'Midtown',
      priceRange: '$60-120 per person',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Chef Sarah Johnson',
      cuisine: 'French & European',
      rating: 4.7,
      experience: '18+ years',
      location: 'Uptown',
      priceRange: '$80-150 per person',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isAvailable: false,
    },
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      chefName: 'Chef Maria Rodriguez',
      date: '2024-01-20',
      time: '19:00',
      guests: 4,
      status: 'upcoming',
      total: 280,
    },
    {
      id: '2',
      chefName: 'Chef James Chen',
      date: '2024-01-15',
      time: '18:30',
      guests: 2,
      status: 'completed',
      total: 180,
    },
  ]);

  const stats = {
    totalBookings: 8,
    completedBookings: 6,
    favoriteChefs: 3,
    totalSpent: 1240,
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredChefs = chefs.filter(chef =>
    chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chef.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-500">Food Enthusiast</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'search', label: 'Find Chefs', icon: Search },
              { id: 'bookings', label: 'My Bookings', icon: Calendar },
              { id: 'favorites', label: 'Favorites', icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Heart className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Favorite Chefs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.favoriteChefs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalSpent}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.chefName}</p>
                        <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                        <p className="text-sm text-gray-500">{booking.guests} guests</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <p className="text-sm font-medium text-gray-900">${booking.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Chef</h2>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by cuisine or chef name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Chef Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChefs.map((chef) => (
                <div key={chef.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-48 object-cover"
                    />
                    {!chef.isAvailable && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Unavailable
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{chef.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{chef.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{chef.cuisine}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {chef.location}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{chef.experience} experience</p>
                    <p className="text-sm font-medium text-gray-900 mb-4">{chef.priceRange}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                        Book Now
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Bookings</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div key={booking.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{booking.chefName}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{booking.date} at {booking.time}</p>
                        <p className="text-sm text-gray-500">{booking.guests} guests</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium text-gray-900">${booking.total}</p>
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Favorite Chefs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chefs.slice(0, 3).map((chef) => (
                <div key={chef.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                      <Heart className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{chef.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{chef.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{chef.cuisine}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {chef.location}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{chef.experience} experience</p>
                    <p className="text-sm font-medium text-gray-900 mb-4">{chef.priceRange}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                        Book Now
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 