
import { BarChart3, Calendar, FileText, MessageSquare, TrendingUp, TrendingDown, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

// Dummy data for the dashboard
const stats = [
  { 
    title: "Total Clients",
    value: 2457,
    change: "+12.5%",
    trend: "up",
    icon: <Users className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  { 
    title: "Active Practitioners",
    value: 124,
    change: "+4.3%",
    trend: "up",
    icon: <Users className="h-6 w-6 text-green-600" />,
    color: "bg-green-50 text-green-600 border-green-100"
  },
  { 
    title: "Sessions This Month",
    value: 1240,
    change: "+18.2%",
    trend: "up",
    icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  { 
    title: "Assessments Completed",
    value: 846,
    change: "-2.1%",
    trend: "down",
    icon: <FileText className="h-6 w-6 text-amber-600" />,
    color: "bg-amber-50 text-amber-600 border-amber-100"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Last updated:</span>
          <span className="font-medium">Today, 2:30 PM</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Platform usage for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-500 space-y-3">
              <BarChart3 className="h-10 w-10" />
              <p>Analytics chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="rounded-full bg-gray-100 p-2 flex-shrink-0">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Dr. Sarah Johnson with Client #{1000 + i}</p>
                    <p className="text-xs text-gray-500 mt-1">{`${10 + i}:00 AM - ${11 + i}:00 AM`}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>New users that joined recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Jane Smith", role: "Client", time: "2 hours ago" },
                { name: "Dr. Michael Chen", role: "Practitioner", time: "5 hours ago" },
                { name: "Alex Rodriguez", role: "Client", time: "Yesterday" },
                { name: "Dr. Lisa Wong", role: "Practitioner", time: "2 days ago" }
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-sm">{user.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === "Practitioner" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-gray-500">{user.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Most active services on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { name: "Private Consultations", percentage: 85 },
                { name: "Psychological Assessments", percentage: 70 },
                { name: "Video Consultations", percentage: 65 },
                { name: "Anonymous Consultations", percentage: 45 }
              ].map((service, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-sm font-medium">{service.percentage}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        i === 0 ? "bg-blue-500" : 
                        i === 1 ? "bg-green-500" : 
                        i === 2 ? "bg-purple-500" : 
                        "bg-amber-500"
                      }`} 
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
