"use client"

import { useState } from "react"

// Mock customers data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    registeredDate: "2023-01-15",
    ordersCount: 5,
    totalSpent: 459.95,
    address: {
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    orders: [
      { id: "ORD-001", date: "2023-05-15", total: 89.99, status: "delivered" },
      { id: "ORD-008", date: "2023-04-22", total: 129.99, status: "delivered" },
      { id: "ORD-015", date: "2023-03-10", total: 79.99, status: "delivered" },
      { id: "ORD-023", date: "2023-02-05", total: 99.99, status: "delivered" },
      { id: "ORD-031", date: "2023-01-18", total: 59.99, status: "delivered" },
    ],
  },
  {
    id: "CUST-002",
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    registeredDate: "2023-02-20",
    ordersCount: 3,
    totalSpent: 249.97,
    address: {
      street: "456 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
    orders: [
      { id: "ORD-002", date: "2023-05-14", total: 149.98, status: "processing" },
      { id: "ORD-012", date: "2023-04-05", total: 49.99, status: "delivered" },
      { id: "ORD-024", date: "2023-03-01", total: 50.0, status: "delivered" },
    ],
  },
  {
    id: "CUST-003",
    name: "Julie Lefebvre",
    email: "julie.lefebvre@example.com",
    registeredDate: "2023-03-05",
    ordersCount: 2,
    totalSpent: 139.98,
    address: {
      street: "789 Boulevard Saint-Michel",
      city: "Paris",
      postalCode: "75005",
      country: "France",
    },
    orders: [
      { id: "ORD-003", date: "2023-05-14", total: 69.99, status: "shipped" },
      { id: "ORD-018", date: "2023-04-10", total: 69.99, status: "delivered" },
    ],
  },
  {
    id: "CUST-004",
    name: "Camille Rousseau",
    email: "camille.rousseau@example.com",
    registeredDate: "2023-03-15",
    ordersCount: 1,
    totalSpent: 129.99,
    address: {
      street: "101 Rue de Rivoli",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    orders: [{ id: "ORD-004", date: "2023-05-13", total: 129.99, status: "processing" }],
  },
  {
    id: "CUST-005",
    name: "Léa Bernard",
    email: "lea.bernard@example.com",
    registeredDate: "2023-04-01",
    ordersCount: 2,
    totalSpent: 104.98,
    address: {
      street: "202 Avenue Montaigne",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
    orders: [
      { id: "ORD-005", date: "2023-05-12", total: 54.99, status: "delivered" },
      { id: "ORD-020", date: "2023-04-20", total: 49.99, status: "delivered" },
    ],
  },
]

export default function AdminCustomers() {
  const [customers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing":
        return "En préparation";
      case "shipped":
        return "Expédié";
    }
  };
}