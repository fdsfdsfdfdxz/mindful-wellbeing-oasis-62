
import { useState } from "react";
import { Check, Filter, MoreHorizontal, Plus, Search, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Dummy practitioners data
const practitionersData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D. in Clinical Psychology",
    specializations: ["Anxiety", "Depression", "Trauma"],
    experience: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127,
    status: "active",
    email: "dr.johnson@mindfulcare.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2022-04-15"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Psy.D., Licensed Psychologist",
    specializations: ["Stress Management", "Relationship Issues", "Work-Life Balance"],
    experience: 12,
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviewCount: 205,
    status: "active",
    email: "dr.chen@mindfulcare.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2021-11-12"
  },
  {
    id: 3,
    name: "Dr. Aisha Rahman",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.D., Psychiatrist",
    specializations: ["Bipolar Disorder", "Anxiety", "ADHD"],
    experience: 15,
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    reviewCount: 189,
    status: "active",
    email: "dr.rahman@mindfulcare.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2020-06-23"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.S., Licensed Marriage and Family Therapist",
    specializations: ["Couples Therapy", "Family Conflicts", "Parenting Issues"],
    experience: 10,
    languages: ["English"],
    rating: 4.7,
    reviewCount: 156,
    status: "pending",
    email: "dr.wilson@mindfulcare.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-01-08"
  },
  {
    id: 5,
    name: "Dr. Emily Martinez",
    photo: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D., Clinical Psychologist",
    specializations: ["Depression", "Grief", "Life Transitions"],
    experience: 7,
    languages: ["English", "Spanish"],
    rating: 4.8,
    reviewCount: 98,
    status: "inactive",
    email: "dr.martinez@mindfulcare.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2022-09-30"
  }
];

// Map status to badge style
const statusStyles = {
  active: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200"
};

// Format date to readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function PractitionersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  
  // Filter practitioners based on search and filters
  const filteredPractitioners = practitionersData.filter(practitioner => {
    // Search filter
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         practitioner.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || practitioner.status === statusFilter;
    
    // Specialty filter (simple version - would need to be more complex in real application)
    const matchesSpecialty = specialtyFilter === "all" || 
                            practitioner.specializations.some(spec => 
                              spec.toLowerCase().includes(specialtyFilter.toLowerCase()));
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Practitioners</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Practitioner
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Practitioners Management</CardTitle>
            <CardDescription>
              View, filter and manage all mental health practitioners on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by name or email..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={specialtyFilter}
                  onValueChange={setSpecialtyFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="trauma">Trauma</SelectItem>
                    <SelectItem value="relationship">Relationship Issues</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Practitioner</TableHead>
                    <TableHead>Specializations</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPractitioners.length > 0 ? (
                    filteredPractitioners.map((practitioner) => (
                      <TableRow key={practitioner.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={practitioner.photo}
                              alt={practitioner.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{practitioner.name}</p>
                              <p className="text-xs text-gray-500">{practitioner.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {practitioner.specializations.slice(0, 2).map((spec, i) => (
                              <span
                                key={i}
                                className="inline-block text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1"
                              >
                                {spec}
                              </span>
                            ))}
                            {practitioner.specializations.length > 2 && (
                              <span className="inline-block text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                                +{practitioner.specializations.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{practitioner.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({practitioner.reviewCount})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[practitioner.status as keyof typeof statusStyles]}`}>
                            {practitioner.status === 'active' && <Check className="w-3 h-3 mr-1" />}
                            {practitioner.status === 'inactive' && <X className="w-3 h-3 mr-1" />}
                            {practitioner.status.charAt(0).toUpperCase() + practitioner.status.slice(1)}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(practitioner.joinDate)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Sessions</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {practitioner.status === 'active' ? (
                                <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                        No practitioners match your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
