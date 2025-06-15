import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentSales = [
  {
    name: "John Kamau",
    email: "john@example.com",
    amount: "+KSh 1,999",
  },
  {
    name: "Mary Wanjiku",
    email: "mary@example.com",
    amount: "+KSh 850",
  },
  {
    name: "Peter Ochieng",
    email: "peter@example.com",
    amount: "+KSh 2,500",
  },
  {
    name: "Grace Akinyi",
    email: "grace@example.com",
    amount: "+KSh 1,200",
  },
  {
    name: "David Mwangi",
    email: "david@example.com",
    amount: "+KSh 750",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
