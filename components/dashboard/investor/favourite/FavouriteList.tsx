"use client";

import CompanyCard from "../company/CompanyCard";
import Pagination from "../company/Pagination";
import FavouriteSortBar from "./FavouriteSortBar";

const favouriteCompanies = [
  {
    id: 1,
    name: "TechNova",
    logo: "",
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
    logo: "",
    budgetMin: 250000,
    budgetMax: 700000,
    joinedDate: "Mar 10, 2024",
    minEmployees: 20,
    maxEmployees: 80,
    founderName: "Sara Ali",
    founderEmail: "sara@healthplus.com",
    isFavorite: true,
  },
  {
    id: 3,
    name: "EduSpark",
    logo: "",
    budgetMin: 50000,
    budgetMax: 250000,
    joinedDate: "Jun 05, 2023",
    minEmployees: 8,
    maxEmployees: 35,
    founderName: "Mohamed Hassan",
    founderEmail: "mohamed@eduspark.com",
    isFavorite: true,
  },
];

export default function FavouriteList() {
  return (
    <section className="space-y-6">
      <FavouriteSortBar totalCompanies={favouriteCompanies.length} />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {favouriteCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}
