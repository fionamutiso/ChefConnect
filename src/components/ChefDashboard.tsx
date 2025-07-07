import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChef, type MenuItem } from '../contexts/ChefContext';
import { 
  ChefHat, 
  Calendar, 
  Clock, 
  Star, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Loader2,
  AlertCircle,
  X,
  Save
} from 'lucide-react';



interface Order {
  id: string;
  clientName: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  date: string;
  time: string;
}

interface ClientBooking {
  id: string;
  clientName: string;
  date: string;
  time: string;
  guests: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  total: number;
  cuisine: string;
}

export default function ChefDashboard() {
  const { user, logout } = useAuth();
  const { updateChefMenu, getChefById } = useChef();
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'schedule' | 'clients'>('overview');
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Main Course',
    isAvailable: true,
  });

  // Get current chef's menu items
  const currentChef = getChefById('1'); // Assuming current user is chef with ID '1'
  const menuItems = currentChef?.menuItems || [];

  const [orders] = useState<Order[]>([]);

  // Connected client bookings from ClientDashboard
  const [clientBookings] = useState<ClientBooking[]>([]);

  // Empty stats - waiting for data
  const stats = {
    totalOrders: 0,
    completedOrders: 0,
    averageRating: 0,
    monthlyEarnings: 0,
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: ClientBooking['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.description && newMenuItem.price > 0) {
      const menuItem: MenuItem = {
        id: Date.now().toString(),
        ...newMenuItem,
        chefId: '1',
        chefName: user?.firstName + ' ' + user?.lastName || 'Chef',
      };
      
      const updatedMenuItems = [...menuItems, menuItem];
      updateChefMenu('1', updatedMenuItems);
      
      setNewMenuItem({
        name: '',
        description: '',
        price: 0,
        category: 'Main Course',
        isAvailable: true,
      });
      setShowAddMenuModal(false);
    }
  };

  const handleToggleMenuItemAvailability = (itemId: string) => {
    const updatedMenuItems = menuItems.map(item =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    updateChefMenu('1', updatedMenuItems);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    const updatedMenuItems = menuItems.filter(item => item.id !== itemId);
    updateChefMenu('1', updatedMenuItems);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Chef Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-500">Professional Chef</p>
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
              { id: 'overview', label: 'Overview', icon: ChefHat },
              { id: 'menu', label: 'Menu Management', icon: Edit },
              { id: 'orders', label: 'Orders', icon: Clock },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'clients', label: 'Client Bookings', icon: Users },
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
            {/* Stats Cards - Waiting on Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    {isLoadingStats ? (
                      <div className="flex items-center mt-1">
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">Waiting on stats...</span>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    {isLoadingStats ? (
                      <div className="flex items-center mt-1">
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">Waiting on stats...</span>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    {isLoadingStats ? (
                      <div className="flex items-center mt-1">
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">Waiting on stats...</span>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                    {isLoadingStats ? (
                      <div className="flex items-center mt-1">
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">Waiting on stats...</span>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">${stats.monthlyEarnings}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>



            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow border-l-4 border-orange-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No orders yet</p>
              </div>
            </div>
          </div>
        )}

                {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
              <button 
                onClick={() => setShowAddMenuModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-orange-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Current Menu</h3>
                <p className="text-sm text-gray-500 mt-1">Your menu items will appear in client searches</p>
              </div>
              <div className="divide-y divide-gray-200">
                {menuItems.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">No menu items yet. Add your first dish!</p>
                  </div>
                ) : (
                  menuItems.map((item) => (
                    <div key={item.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <button
                              onClick={() => handleToggleMenuItemAvailability(item.id)}
                              className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                                item.isAvailable ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {item.isAvailable ? 'Available' : 'Unavailable'}
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm font-medium text-gray-900">${item.price}</p>
                          <button 
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Menu Item Modal */}
            {showAddMenuModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Add Menu Item</h3>
                    <button
                      onClick={() => setShowAddMenuModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dish Name
                      </label>
                      <input
                        type="text"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Grilled Salmon"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows={3}
                        placeholder="Describe your dish..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={newMenuItem.price}
                          onChange={(e) => setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={newMenuItem.category}
                          onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="Appetizer">Appetizer</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Dessert">Dessert</option>
                          <option value="Beverage">Beverage</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isAvailable"
                        checked={newMenuItem.isAvailable}
                        onChange={(e) => setNewMenuItem({...newMenuItem, isAvailable: e.target.checked})}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                        Available for ordering
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddMenuModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMenuItem}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-orange-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Active Orders</h3>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No active orders</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
            
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">This Week</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', time: '10:00 AM - 8:00 PM', status: 'Available' },
                    { day: 'Tuesday', time: '10:00 AM - 8:00 PM', status: 'Available' },
                    { day: 'Wednesday', time: '10:00 AM - 8:00 PM', status: 'Available' },
                    { day: 'Thursday', time: '10:00 AM - 8:00 PM', status: 'Available' },
                    { day: 'Friday', time: '10:00 AM - 9:00 PM', status: 'Available' },
                    { day: 'Saturday', time: '11:00 AM - 9:00 PM', status: 'Available' },
                    { day: 'Sunday', time: 'Closed', status: 'Unavailable' },
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{schedule.day}</p>
                        <p className="text-sm text-gray-500">{schedule.time}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        schedule.status === 'Available' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Client Bookings</h2>
            <p className="text-gray-600">Connected bookings from client dashboard</p>
            
            <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-orange-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Client Bookings</h3>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No client bookings yet</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 