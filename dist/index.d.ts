interface ReactDatePickerProps {
    value?: Date | null;
    onChange?: (date: Date, hijri: HijriDate, gregorian: Date) => void;
    defaultCalendar?: 'hijri' | 'gregorian';
    format?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'D MMMM YYYY' | 'MMMM D, YYYY' | 'D MMM YYYY' | 'MMM D, YYYY' | 'dddd, D MMMM YYYY' | 'ddd, D MMM YYYY' | 'DD.MM.YYYY' | 'D/M/YYYY' | 'YYYY/MM/DD';
    placeholder?: string;
    locale?: 'en' | 'ar';
    disabled?: boolean;
    showBothCalendars?: boolean;
    syncCalendars?: boolean;
    allowCalendarSwitch?: boolean;
    theme?: 'light' | 'dark' | 'gradient' | 'modern' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outlined' | 'filled' | 'borderless';
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    animation?: 'none' | 'fade' | 'slide' | 'scale' | 'bounce';
    customColors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
        background?: string;
        surface?: string;
        text?: string;
        textSecondary?: string;
        border?: string;
        hover?: string;
        selected?: string;
        disabled?: string;
        todayBg?: string;
        todayText?: string;
    };
    showTodayButton?: boolean;
    showClearButton?: boolean;
    closeOnSelect?: boolean;
    highlightToday?: boolean;
    highlightWeekends?: boolean;
    firstDayOfWeek?: 0 | 1;
    minDate?: Date;
    maxDate?: Date;
    hijriYearRange?: {
        start: number;
        end: number;
    };
    gregorianYearRange?: {
        start: number;
        end: number;
    };
    className?: string;
}
interface HijriDate {
    year: number;
    month: number;
    day: number;
}
declare function ReactDatePicker({ value, onChange, defaultCalendar, format, placeholder, locale, disabled, showBothCalendars, syncCalendars, allowCalendarSwitch, theme, size, variant, borderRadius, shadow, animation, customColors, showTodayButton, showClearButton, closeOnSelect, highlightToday, highlightWeekends, firstDayOfWeek, minDate, maxDate, hijriYearRange, gregorianYearRange, className }: ReactDatePickerProps): any;

export { type HijriDate, type ReactDatePickerProps, ReactDatePicker as default };
