
import { useState } from "react";
import { Check, Edit, Filter, MoreHorizontal, Package, Plus, Power, Search, Toggle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy services data
const servicesData = [
  {
    id: 1,
    name: "Private Consultations",
    description: "One-on-one therapy sessions with licensed professionals",
    category: "Therapy",
    price: "$60 per session",
    status: "active",
    clients: 1243,
    icon: "MessageSquare",
    featured: true,
    createdAt: "2022-03-15"
  },
  {
    id: 2,
    name: "Anonymous Consultations",
    description: "Seek help without revealing your identity",
    category: "Therapy",
    price: "$50 per session",
    status: "active",
    clients: 876,
    icon: "Lock",
    featured: true,
    createdAt: "2022-03-20"
  },
  {
    id: 3,
    name: "Psychological Assessments",
    description: "Comprehensive mental health evaluations",
    category: "Assessment",
    price: "$120 per assessment",
    status: "active",
    clients: 562,
    icon: "FileText",
    featured: false,
    createdAt: "2022-04-10"
  },
  {
    id: 4,
    name: "Audio Consultations",
    description: "Voice-only therapy sessions",
    category: "Therapy",
    price: "$45 per session",
    status: "active",
    clients: 421,
    icon: "PhoneCall",
    featured: false,
    createdAt: "2022-05-05"
  },
  {
    id: 5,
    name: "Video Consultations",
    description: "Face-to-face virtual therapy sessions",
    category: "Therapy",
    price: "$75 per session",
    status: "active",
    clients: 598,
    icon: "Video",
    featured: true,
    createdAt: "2022-04-22"
  },
  {
    id: 6,
    name: "Marriage Counseling",
    description: "Expert guidance for couples",
    category: "Specialized",
    price: "$90 per session",
    status: "inactive",
    clients: 243,
    icon: "Heart",
    featured: false,
    createdAt: "2022-06-18"
  },
  {
    id: 7,
    name: "Support Groups",
    description: "Moderated group therapy sessions",
    category: "Group",
    price: "$30 per session",
    status: "inactive",
    clients: 187,
    icon: "Users",
    featured: false,
    createdAt: "2022-07-02"
  }
];

// Status badge styles
const statusStyles = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200"
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter services
  const filteredServices = servicesData.filter(service => {
    // Search filter
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Toggle service status
  const toggleServiceStatus = (id: number) => {
    // In a real application, this would update the backend
    console.log(`Toggling status for service ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Services</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{servicesData.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-green-700">Active</p>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {servicesData.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-700">Inactive</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {servicesData.filter(s => s.status === 'inactive').length}
                </p>
              </div>
              <div className="bg-gray-200 p-3 rounded-lg">
                <X className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-purple-700">Featured</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {servicesData.filter(s => s.featured).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Toggle className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Services Management</CardTitle>
          <CardDescription>
            Manage all mental health services offered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Therapy">Therapy</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Specialized">Specialized</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-100 p-2 rounded-md">
                            <Package className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-block text-xs bg-gray-100 text-gray-800 rounded-full px-2.5 py-1">
                          {service.category}
                        </span>
                      </TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.clients}</TableCell>
                      <TableCell>
                        <Switch checked={service.featured} />
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[service.status as keyof typeof statusStyles]}`}>
                          {service.status === 'active' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(service.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleServiceStatus(service.id)}>
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Service</DropdownMenuItem>
                              <DropdownMenuItem>Manage Pricing</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {service.featured ? (
                                <DropdownMenuItem>Remove from Featured</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>Add to Featured</DropdownMenuItem>
                              )}
                              {service.status === 'active' ? (
                                <DropdownMenuItem className="text-amber-600">Deactivate Service</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">Activate Service</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">Delete Service</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24 text-gray-500">
                      No services match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
