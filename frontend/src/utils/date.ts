import { startOfWeek, subWeeks, addDays } from "date-fns";

export const getWeekDays = (inputDate: Date): Date[] => {
  const dayOfWeek = inputDate.getDay();

  const startDate = new Date(inputDate);
  startDate.setDate(inputDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startDate.setHours(0, 0, 0, 0);

  const weekDays: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    weekDays.push(currentDate);
  }

  return weekDays;
};

export const getMessageDiffrenceTime = (timeString: string) => {
  const time = new Date(timeString);
  const currentTime = new Date();

  if (time.getDate() === currentTime.getDate()) return time.toLocaleTimeString("vi-VN");

  return time.toLocaleString("vi-VN");
};

const getLastMonday = (currentDate: Date): Date => {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  return subWeeks(startOfCurrentWeek, 1);
};
