"use client";
import Pagination from "./Pagination";
import CompanyCard from "./CompanyCard";
import CompanySortBar from "./CompanySortBar";
const companies = [
  {
    id: 1,
    name: "TechNova",
    logo: "/images/company1.png",
    budgetMin: 100000,
    budgetMax: 500000,
    joinedDate: "Jan 15, 2024",
    minEmployees: 10,
    maxEmployees: 50,
    founderName: "Ahmed Mohamed",
    founderEmail: "ahmed@technova.com",
    isFavorite: true,
  },
  {
    id: 2,
    name: "HealthPlus",
    logo: "/images/company2.png",
    budgetMin: 250000,
    budgetMax: 750000,
    joinedDate: "Mar 8, 2024",
    minEmployees: 20,
    maxEmployees: 80,
    founderName: "Sara Ali",
    founderEmail: "sara@healthplus.com",
    isFavorite: false,
  },
  {
    id: 3,
    name: "EduSpark",
    logo: "/images/company3.png",
    budgetMin: 50000,
    budgetMax: 300000,
    joinedDate: "Jun 2, 2023",
    minEmployees: 5,
    maxEmployees: 30,
    founderName: "Mohamed Hassan",
    founderEmail: "mohamed@eduspark.com",
    isFavorite: true,
  },
  {
    id: 4,
    name: "FinEdge",
    logo: "/images/company4.png",
    budgetMin: 400000,
    budgetMax: 1200000,
    joinedDate: "Feb 20, 2024",
    minEmployees: 25,
    maxEmployees: 120,
    founderName: "Omar Khaled",
    founderEmail: "omar@finedge.com",
    isFavorite: false,
  },
];

export default function CompanyList() {
  return (
    <section className="space-y-6">
      <CompanySortBar totalCompanies={companies.length} />

      {/* Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={5} />
    </section>
  );
}
