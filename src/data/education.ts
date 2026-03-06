export interface Education {
  id: string;
  school: string;
  schoolVi: string;
  degree: string;
  degreeVi: string;
  field: string;
  fieldVi: string;
  startDate: string;
  endDate: string;
  grade?: string;
  gradeVi?: string;
  description?: string;
  descriptionVi?: string;
}

export const educations: Education[] = [
  {
    id: 'uit',
    school: 'University of Information Technology (UIT)',
    schoolVi: 'Trường Đại học Công nghệ Thông tin (UIT)',
    degree: "Bachelor's Degree",
    degreeVi: 'Cử nhân',
    field: 'Data Science',
    fieldVi: 'Khoa học Dữ liệu',
    startDate: '2021',
    endDate: '2025',
    grade: 'Classification: Good',
    gradeVi: 'Xếp loại: Giỏi',
    description: 'Vietnam National University Ho Chi Minh City (VNU-HCM)',
    descriptionVi: 'Đại học Quốc gia TP. Hồ Chí Minh (VNU-HCM)',
  },
];
