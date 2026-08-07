export type TeamMember = {
  name: string;
  role: string;
  expertise: string;
  experience: string;
  rating: number;
};

export const team: TeamMember[] = [
  { name: "Priya Nair", role: "Lead Career Strategist", expertise: "Management & Executive Programs", experience: "9 years", rating: 4.9 },
  { name: "Arjun Kapoor", role: "Admissions Specialist", expertise: "Technology & Analytics Programs", experience: "6 years", rating: 4.8 },
  { name: "Meera Iyer", role: "Career Mentor", expertise: "Career Switching & Government Eligibility", experience: "7 years", rating: 4.9 },
  { name: "Karan Shah", role: "Education Advisor", expertise: "Scholarships & Loan Guidance", experience: "5 years", rating: 4.8 },
  { name: "Ritu Desai", role: "Senior Counsellor", expertise: "Executive MBA & Leadership Programs", experience: "8 years", rating: 4.9 },
  { name: "Vivek Malhotra", role: "Student Success Manager", expertise: "Post-Admission Support & Documentation", experience: "4 years", rating: 4.7 },
];
