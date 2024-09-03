"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserData {
  id: string;
}
interface FetchData {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
interface HallData {
  hall_id: string;
  hall_name: string;
  capacity: string;
  room: string;
  bed: string;
}
interface NoticeData {
  notice_id: string;
  role: string;
  title: string;
  description: string;
}
interface StudentData {
  student_id: string;
  name: string;
  registration_num: string;
  department: string;
  active: number;
}
interface AppContextType {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  fetchData: FetchData[];
  setFetchData: Dispatch<SetStateAction<FetchData[]>>;
  hallData: HallData[];
  setHallData: Dispatch<SetStateAction<HallData[]>>;
  noticeData: NoticeData[];
  setNoticeData: Dispatch<SetStateAction<NoticeData[]>>;
  studentData: StudentData[];
  setStudentData: Dispatch<SetStateAction<StudentData[]>>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>({ id: "" });
  const [fetchData, setFetchData] = useState<FetchData[]>([]);
  const [hallData, setHallData] = useState<HallData[]>([]);
  const [noticeData, setNoticeData] = useState<NoticeData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        fetchData,
        setFetchData,
        hallData,
        setHallData,
        setNoticeData,
        noticeData,
        studentData,
        setStudentData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
