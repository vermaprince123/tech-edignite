// Exam Papers Data for SVNIT Students

export interface ExamPaper {
  id: number;
  title: string;
  branch: string;
  subject: string;
  semester: string;
  year: string;
  examType: "Midterm" | "Endterm" | "Quiz" | "Assignment";
  images: string[];
  description?: string;
  uploadedDate: string;
}

export const examPapers: ExamPaper[] = [
  // Add exam papers here
  // Example structure:
  {
    id: 1,
    title: "Physics of Material - Nuclei - Semester End Sem",
    branch: "ME",
    subject: "Physics of Material",
    semester: "8th",
    year: "2025",
    examType: "Endterm",
    images: ["/exam-papers/me/physics-of-material-nuclei-semester-end-sem.png"],
    description: "Endterm exam paper for Physics of Material course",
    uploadedDate: "2025-03-03",
  },
];

export const examPaperCategories = [
  { id: "all", name: "All Papers", icon: "📄" },
  { id: "CSE", name: "Computer Science", icon: "💻" },
  { id: "ECE", name: "Electronics", icon: "📡" },
  { id: "EE", name: "Electrical", icon: "⚡" },
  { id: "ME", name: "Mechanical", icon: "⚙️" },
  { id: "CE", name: "Civil", icon: "🏗️" },
  { id: "CHE", name: "Chemical", icon: "🧪" },
  { id: "IT", name: "Information Technology", icon: "🌐" },
];

export const examTypes = [
  { id: "all", name: "All Types" },
  { id: "Midterm", name: "Midterm Exams" },
  { id: "Endterm", name: "Endterm Exams" },
  { id: "Quiz", name: "Quizzes" },
  { id: "Assignment", name: "Assignments" },
];
