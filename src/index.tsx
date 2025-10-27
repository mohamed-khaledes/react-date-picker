import React, { useState, useEffect, useRef } from 'react'

const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', "Rabi' al-awwal", "Rabi' al-thani",
  'Jumada al-awwal', 'Jumada al-thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhu al-Qa'dah", 'Dhu al-Hijjah'
]

const HIJRI_MONTHS_AR = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
]

const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const GREGORIAN_MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
]

const GREGORIAN_MONTHS_SHORT_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const GREGORIAN_MONTHS_SHORT_AR = [
  'ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون',
  'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'
]

const HIJRI_MONTHS_SHORT_EN = [
  'Muh', 'Saf', "Rab1", "Rab2",
  'Jum1', 'Jum2', 'Raj', "Sha",
  'Ram', 'Shaw', "DhuQ", 'DhuH'
]

const HIJRI_MONTHS_SHORT_AR = [
  'محر', 'صفر', 'رب١', 'رب٢',
  'جم١', 'جم٢', 'رجب', 'شعب',
  'رمض', 'شوا', 'ذقع', 'ذحج'
]

const WEEKDAYS_LONG_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const WEEKDAYS_LONG_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

const WEEKDAYS_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_SHORT_AR = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']

const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const WEEKDAYS_AR = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']

export interface ReactDatePickerProps {
  value?: Date | null
  onChange?: (date: Date, hijri: HijriDate, gregorian: Date) => void
  defaultCalendar?: 'hijri' | 'gregorian'
  format?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'D MMMM YYYY' | 'MMMM D, YYYY' | 'D MMM YYYY' | 'MMM D, YYYY' | 'dddd, D MMMM YYYY' | 'ddd, D MMM YYYY' | 'DD.MM.YYYY' | 'D/M/YYYY' | 'YYYY/MM/DD'
  placeholder?: string
  locale?: 'en' | 'ar'
  disabled?: boolean
  showBothCalendars?: boolean
  syncCalendars?: boolean
  allowCalendarSwitch?: boolean
  theme?: 'light' | 'dark' | 'gradient' | 'modern' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'filled' | 'borderless'
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'bounce'
  customColors?: {
    primary?: string
    secondary?: string
    accent?: string
    background?: string
    surface?: string
    text?: string
    textSecondary?: string
    border?: string
    hover?: string
    selected?: string
    disabled?: string
    todayBg?: string
    todayText?: string
  }
  showTodayButton?: boolean
  showClearButton?: boolean
  closeOnSelect?: boolean
  highlightToday?: boolean
  highlightWeekends?: boolean
  firstDayOfWeek?: 0 | 1
  minDate?: Date
  maxDate?: Date
  hijriYearRange?: { start: number; end: number }
  gregorianYearRange?: { start: number; end: number }
  className?: string
}

export interface HijriDate {
  year: number
  month: number
  day: number
}

export default function ReactDatePicker({
  value,
  onChange,
  defaultCalendar = 'hijri',
  format ="DD-MM-YYYY",
  placeholder = 'Select date',
  locale = 'en',
  disabled = false,
  showBothCalendars = false,
  syncCalendars = true,
  allowCalendarSwitch = true,
  theme = 'gradient',
  size = 'md',
  variant = 'outlined',
  borderRadius = 'lg',
  shadow = 'lg',
  animation = 'scale',
  customColors,
  showTodayButton = true,
  showClearButton = true,
  closeOnSelect = true,
  highlightToday = true,
  highlightWeekends = true,
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  hijriYearRange = { start: 1400, end: 1500 },
  gregorianYearRange = { start: 1970, end: 2100 },
  className = ''
}: ReactDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null)
  const [activeCalendar, setActiveCalendar] = useState<'hijri' | 'gregorian'>(defaultCalendar)
  const [hijriDisplay, setHijriDisplay] = useState<HijriDate>(() => 
    selectedDate ? gregorianToHijri(selectedDate) : gregorianToHijri(new Date())
  )
  const [gregorianDisplay, setGregorianDisplay] = useState<Date>(() => 
    selectedDate || new Date()
  )
  
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const themeColors = getThemeColors(theme, customColors)
  const sizeStyles = getSizeStyles(size)
  const radiusClass = getRadiusClass(borderRadius)
  const shadowClass = getShadowClass(shadow)

  function hijriToGregorian(hy: number, hm: number, hd: number): Date {
    const days = Math.floor((hy - 1) * 354.367 + (hm - 1) * 29.53 + (hd - 1))
    const gDate = new Date(622, 6, 16)
    gDate.setDate(gDate.getDate() + days)
    return gDate
  }

  function gregorianToHijri(date: Date): HijriDate {
    const diffDays = Math.floor(
      (date.getTime() - new Date(622, 6, 16).getTime()) / (1000 * 60 * 60 * 24)
    )
    const year = Math.floor(diffDays / 354.367) + 1
    const remDays = diffDays % 354.367
    const month = Math.floor(remDays / 29.53) + 1
    const day = Math.floor(remDays % 29.53) + 1
    return { year, month, day }
  }

  function formatDate(date: Date, hijri: HijriDate, fmt: string): string {
    const gMonths = locale === 'ar' ? GREGORIAN_MONTHS_AR : GREGORIAN_MONTHS_EN
    const gMonthsShort = locale === 'ar' ? GREGORIAN_MONTHS_SHORT_AR : GREGORIAN_MONTHS_SHORT_EN
    const hMonths = locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN
    const hMonthsShort = locale === 'ar' ? HIJRI_MONTHS_SHORT_AR : HIJRI_MONTHS_SHORT_EN
    const weekdaysLong = locale === 'ar' ? WEEKDAYS_LONG_AR : WEEKDAYS_LONG_EN
    const weekdaysShort = locale === 'ar' ? WEEKDAYS_SHORT_AR : WEEKDAYS_SHORT_EN
    
    if (activeCalendar === 'hijri') {
      const day = hijri.day
      const paddedDay = String(day).padStart(2, '0')
      const paddedMonth = String(hijri.month).padStart(2, '0')
      const month = hMonths[hijri.month - 1]
      const monthShort = hMonthsShort[hijri.month - 1]
      const year = hijri.year
      const weekday = hijriToGregorian(hijri.year, hijri.month, hijri.day).getDay()
      
      switch (fmt) {
        case 'DD/MM/YYYY': return `${paddedDay}/${paddedMonth}/${year}`
        case 'MM/DD/YYYY': return `${paddedMonth}/${paddedDay}/${year}`
        case 'YYYY-MM-DD': return `${year}-${paddedMonth}-${paddedDay}`
        case 'DD-MM-YYYY': return `${paddedDay}-${paddedMonth}-${year}`
        case 'D MMMM YYYY': return `${day} ${month} ${year}`
        case 'MMMM D, YYYY': return `${month} ${day}, ${year}`
        case 'D MMM YYYY': return `${day} ${monthShort} ${year}`
        case 'MMM D, YYYY': return `${monthShort} ${day}, ${year}`
        case 'dddd, D MMMM YYYY': return `${weekdaysLong[weekday]}, ${day} ${month} ${year}`
        case 'ddd, D MMM YYYY': return `${weekdaysShort[weekday]}, ${day} ${monthShort} ${year}`
        case 'DD.MM.YYYY': return `${paddedDay}.${paddedMonth}.${year}`
        case 'D/M/YYYY': return `${day}/${hijri.month}/${year}`
        case 'YYYY/MM/DD': return `${year}/${paddedMonth}/${paddedDay}`
        default: return `${day} ${month} ${year}`
      }
    } else {
      const day = date.getDate()
      const paddedDay = String(day).padStart(2, '0')
      const monthNum = date.getMonth() + 1
      const paddedMonth = String(monthNum).padStart(2, '0')
      const month = gMonths[date.getMonth()]
      const monthShort = gMonthsShort[date.getMonth()]
      const year = date.getFullYear()
      const weekday = date.getDay()
      
      switch (fmt) {
        case 'DD/MM/YYYY': return `${paddedDay}/${paddedMonth}/${year}`
        case 'MM/DD/YYYY': return `${paddedMonth}/${paddedDay}/${year}`
        case 'YYYY-MM-DD': return `${year}-${paddedMonth}-${paddedDay}`
        case 'DD-MM-YYYY': return `${paddedDay}-${paddedMonth}-${year}`
        case 'D MMMM YYYY': return `${day} ${month} ${year}`
        case 'MMMM D, YYYY': return `${month} ${day}, ${year}`
        case 'D MMM YYYY': return `${day} ${monthShort} ${year}`
        case 'MMM D, YYYY': return `${monthShort} ${day}, ${year}`
        case 'dddd, D MMMM YYYY': return `${weekdaysLong[weekday]}, ${day} ${month} ${year}`
        case 'ddd, D MMM YYYY': return `${weekdaysShort[weekday]}, ${day} ${monthShort} ${year}`
        case 'DD.MM.YYYY': return `${paddedDay}.${paddedMonth}.${year}`
        case 'D/M/YYYY': return `${day}/${monthNum}/${year}`
        case 'YYYY/MM/DD': return `${year}/${paddedMonth}/${paddedDay}`
        default: return `${day} ${month} ${year}`
      }
    }
  }

  function getDaysInMonth(year: number, month: number, isHijri: boolean): number {
    if (isHijri) return 30
    return new Date(year, month, 0).getDate()
  }

  function getFirstDayOfMonth(year: number, month: number, isHijri: boolean): number {
    if (isHijri) {
      const firstDay = hijriToGregorian(year, month, 1)
      let offset = firstDay.getDay() - firstDayOfWeek
      if (offset < 0) offset += 7
      return offset
    } else {
      const firstDay = new Date(year, month - 1, 1).getDay()
      let offset = firstDay - firstDayOfWeek
      if (offset < 0) offset += 7
      return offset
    }
  }

  function isToday(date: Date | HijriDate, isHijri: boolean): boolean {
    const today = new Date()
    if (isHijri) {
      const todayHijri = gregorianToHijri(today)
      const d = date as HijriDate
      return d.year === todayHijri.year && d.month === todayHijri.month && d.day === todayHijri.day
    } else {
      const d = date as Date
      return d.toDateString() === today.toDateString()
    }
  }

  function isWeekend(dayIndex: number): boolean {
    return dayIndex === 0 || dayIndex === 6
  }

  function handleDateSelect(year: number, month: number, day: number, isHijri: boolean) {
    let newDate: Date
    
    if (isHijri) {
      newDate = hijriToGregorian(year, month, day)
      const hijri = { year, month, day }
      setSelectedDate(newDate)
      onChange?.(newDate, hijri, newDate)
      
      if (syncCalendars) {
        setGregorianDisplay(newDate)
      }
    } else {
      newDate = new Date(year, month - 1, day)
      const hijri = gregorianToHijri(newDate)
      setSelectedDate(newDate)
      onChange?.(newDate, hijri, newDate)
      
      if (syncCalendars) {
        setHijriDisplay(hijri)
      }
    }
    
    if (closeOnSelect) {
      setOpen(false)
    }
  }

  function handlePrevMonth(isHijri: boolean) {
    if (isHijri) {
      setHijriDisplay(prev => 
        prev.month === 1 
          ? { year: prev.year - 1, month: 12, day: prev.day }
          : { ...prev, month: prev.month - 1 }
      )
    } else {
      setGregorianDisplay(prev => {
        const newDate = new Date(prev)
        newDate.setMonth(newDate.getMonth() - 1)
        return newDate
      })
    }
  }

  function handleNextMonth(isHijri: boolean) {
    if (isHijri) {
      setHijriDisplay(prev => 
        prev.month === 12 
          ? { year: prev.year + 1, month: 1, day: prev.day }
          : { ...prev, month: prev.month + 1 }
      )
    } else {
      setGregorianDisplay(prev => {
        const newDate = new Date(prev)
        newDate.setMonth(newDate.getMonth() + 1)
        return newDate
      })
    }
  }

  function handleToday() {
    const today = new Date()
    const todayHijri = gregorianToHijri(today)
    setSelectedDate(today)
    setHijriDisplay(todayHijri)
    setGregorianDisplay(today)
    onChange?.(today, todayHijri, today)
    if (closeOnSelect) setOpen(false)
  }

  function handleClear() {
    setSelectedDate(null)
    onChange?.(null as any, null as any, null as any)
  }

  function switchCalendar() {
    setActiveCalendar(prev => prev === 'hijri' ? 'gregorian' : 'hijri')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderCalendar = (isHijri: boolean) => {
    const year = isHijri ? hijriDisplay.year : gregorianDisplay.getFullYear()
    const month = isHijri ? hijriDisplay.month : gregorianDisplay.getMonth() + 1
    const daysInMonth = getDaysInMonth(year, month, isHijri)
    const firstDayOffset = getFirstDayOfMonth(year, month, isHijri)
    const monthNames = isHijri 
      ? (locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN)
      : (locale === 'ar' ? GREGORIAN_MONTHS_AR : GREGORIAN_MONTHS_EN)
    const weekdays = locale === 'ar' ? WEEKDAYS_AR : WEEKDAYS_EN

    return (
      <div style={{ 
        background: themeColors.surface,
        borderRadius: radiusClass,
        padding: sizeStyles.calendarPadding,
        minWidth: '280px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          gap: '12px'
        }}>
          <button
            onClick={() => handlePrevMonth(isHijri)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: themeColors.text,
              fontSize: '18px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = themeColors.hover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {locale === 'ar' ? '▶' : '◀'}
          </button>
          
          <div style={{
            display: 'flex',
            gap: '8px',
            flex: 1
          }}>
            <select
              value={month}
              onChange={(e) => {
                if (isHijri) {
                  setHijriDisplay({ ...hijriDisplay, month: Number(e.target.value) })
                } else {
                  const newDate = new Date(gregorianDisplay)
                  newDate.setMonth(Number(e.target.value) - 1)
                  setGregorianDisplay(newDate)
                }
              }}
              style={{
                flex: 1,
                padding: '6px 8px',
                fontSize: sizeStyles.headerText,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '8px',
                background: themeColors.background,
                color: themeColors.text,
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600
              }}
            >
              {monthNames.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            
            <select
              value={year}
              onChange={(e) => {
                if (isHijri) {
                  setHijriDisplay({ ...hijriDisplay, year: Number(e.target.value) })
                } else {
                  const newDate = new Date(gregorianDisplay)
                  newDate.setFullYear(Number(e.target.value))
                  setGregorianDisplay(newDate)
                }
              }}
              style={{
                flex: 1,
                padding: '6px 8px',
                fontSize: sizeStyles.headerText,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '8px',
                background: themeColors.background,
                color: themeColors.text,
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600
              }}
            >
              {(isHijri 
                ? Array.from(
                    { length: hijriYearRange.end - hijriYearRange.start + 1 },
                    (_, i) => hijriYearRange.start + i
                  )
                : Array.from(
                    { length: gregorianYearRange.end - gregorianYearRange.start + 1 },
                    (_, i) => gregorianYearRange.start + i
                  )
              ).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => handleNextMonth(isHijri)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: themeColors.text,
              fontSize: '18px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = themeColors.hover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {locale === 'ar' ? '◀' : '▶'}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '8px'
        }}>
          {weekdays.map((day, i) => (
            <div key={day} style={{
              textAlign: 'center',
              fontSize: sizeStyles.weekdayText,
              fontWeight: 600,
              color: isWeekend(i) && highlightWeekends ? themeColors.accent : themeColors.textSecondary,
              padding: '8px 4px'
            }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const date = isHijri 
              ? { year, month, day } as HijriDate
              : new Date(year, month - 1, day)
            
            const isTodayDate = highlightToday && isToday(date, isHijri)
            const isSelected = selectedDate && (
              isHijri 
                ? (date as HijriDate).year === hijriDisplay.year && 
                  (date as HijriDate).month === hijriDisplay.month && 
                  (date as HijriDate).day === day &&
                  selectedDate.toDateString() === hijriToGregorian(year, month, day).toDateString()
                : (date as Date).toDateString() === selectedDate.toDateString()
            )
            
            return (
              <button
                key={day}
                onClick={() => handleDateSelect(year, month, day, isHijri)}
                style={{
                  padding: sizeStyles.dayPadding,
                  fontSize: sizeStyles.dayText,
                  border: 'none',
                  borderRadius: radiusClass,
                  cursor: 'pointer',
                  background: isSelected 
                    ? themeColors.selected
                    : isTodayDate 
                      ? themeColors.todayBg 
                      : 'transparent',
                  color: isSelected 
                    ? '#ffffff'
                    : isTodayDate 
                      ? themeColors.todayText 
                      : themeColors.text,
                  fontWeight: isSelected || isTodayDate ? 600 : 400,
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = themeColors.hover
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = isTodayDate ? themeColors.todayBg : 'transparent'
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const hijri = selectedDate ? gregorianToHijri(selectedDate) : null
  const displayText = selectedDate && hijri ? formatDate(selectedDate, hijri, format) : ''

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }} className={className}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={displayText}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          style={{
            width: '100%',
            padding: sizeStyles.inputPadding,
            fontSize: sizeStyles.inputText,
            border: variant === 'borderless' ? 'none' : variant === 'filled' ? 'none' : `2px solid ${themeColors.border}`,
            borderRadius: radiusClass,
            outline: 'none',
            background: variant === 'filled' ? themeColors.surface : themeColors.background,
            color: themeColors.text,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: open ? `0 0 0 3px ${themeColors.primary}33` : 'none',
            boxSizing:'border-box'
          }}
        />
        <CalendarIcon style={{
          position: 'absolute',
          right: sizeStyles.iconRight,
          top: '50%',
          transform: 'translateY(-50%)',
          width: sizeStyles.iconSize,
          height: sizeStyles.iconSize,
          color: themeColors.textSecondary,
          pointerEvents: 'none'
        }} />
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            background: themeColors.background,
            border: `1px solid ${themeColors.border}`,
            borderRadius: radiusClass,
            boxShadow: shadowClass,
            padding: '16px',
            zIndex: 1000,
            animation: animation !== 'none' ? `${animation} 0.2s ease-out` : 'none'
          }}
        >
          {allowCalendarSwitch && (
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              background: themeColors.surface,
              padding: '4px',
              borderRadius: radiusClass
            }}>
              <button
                onClick={() => setActiveCalendar('hijri')}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: radiusClass,
                  cursor: 'pointer',
                  background: activeCalendar === 'hijri' ? themeColors.primary : 'transparent',
                  color: activeCalendar === 'hijri' ? '#ffffff' : themeColors.text,
                  fontWeight: 600,
                  fontSize: sizeStyles.buttonText,
                  transition: 'all 0.2s'
                }}
              >
                {locale === 'ar' ? 'هجري' : 'Hijri'}
              </button>
              <button
                onClick={() => setActiveCalendar('gregorian')}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: radiusClass,
                  cursor: 'pointer',
                  background: activeCalendar === 'gregorian' ? themeColors.primary : 'transparent',
                  color: activeCalendar === 'gregorian' ? '#ffffff' : themeColors.text,
                  fontWeight: 600,
                  fontSize: sizeStyles.buttonText,
                  transition: 'all 0.2s'
                }}
              >
                {locale === 'ar' ? 'ميلادي' : 'Gregorian'}
              </button>
            </div>
          )}

          {showBothCalendars ? (
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {renderCalendar(true)}
              {renderCalendar(false)}
            </div>
          ) : (
            renderCalendar(activeCalendar === 'hijri')
          )}

          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: '16px',
            justifyContent: 'space-between'
          }}>
            {showTodayButton && (
              <button
                onClick={handleToday}
                style={{
                  flex: 1,
                  padding: sizeStyles.buttonPadding,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: radiusClass,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: themeColors.text,
                  fontWeight: 600,
                  fontSize: sizeStyles.buttonText,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = themeColors.hover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {locale === 'ar' ? 'اليوم' : 'Today'}
              </button>
            )}
            {showClearButton && (
              <button
                onClick={handleClear}
                style={{
                  flex: 1,
                  padding: sizeStyles.buttonPadding,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: radiusClass,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: themeColors.text,
                  fontWeight: 600,
                  fontSize: sizeStyles.buttonText,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = themeColors.hover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {locale === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>

          {selectedDate && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: themeColors.surface,
              borderRadius: radiusClass,
              fontSize: '12px',
              color: themeColors.textSecondary,
              textAlign: 'center'
            }}>
              <div>{locale === 'ar' ? 'هجري:' : 'Hijri:'} {hijri && `${hijri.day} ${(locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN)[hijri.month - 1]} ${hijri.year}`}</div>
              <div style={{ marginTop: '4px' }}>{locale === 'ar' ? 'ميلادي:' : 'Gregorian:'} {selectedDate.toLocaleDateString()}</div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0% { opacity: 0; transform: scale(0.9); }
          50% { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

function getThemeColors(theme: string, custom?: any) {
  const themes: Record<string, any> = {
    light: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ef4444',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      hover: '#f3f4f6',
      selected: '#3b82f6',
      disabled: '#d1d5db',
      todayBg: '#dbeafe',
      todayText: '#1e40af'
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      accent: '#f87171',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      hover: '#374151',
      selected: '#2563eb',
      disabled: '#4b5563',
      todayBg: '#1e3a8a',
      todayText: '#93c5fd'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#ffffff',
      surface: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e0e7ff',
      hover: 'rgba(102, 126, 234, 0.1)',
      selected: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      disabled: '#d1d5db',
      todayBg: '#ede9fe',
      todayText: '#6d28d9'
    },
    modern: {
      primary: '#06b6d4',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f0fdfa',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#cbd5e1',
      hover: '#e0f2fe',
      selected: '#06b6d4',
      disabled: '#cbd5e1',
      todayBg: '#cffafe',
      todayText: '#0e7490'
    },
    minimal: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#737373',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#000000',
      textSecondary: '#737373',
      border: '#e5e5e5',
      hover: '#f5f5f5',
      selected: '#000000',
      disabled: '#d4d4d4',
      todayBg: '#f5f5f5',
      todayText: '#000000'
    }
  }

  return { ...themes[theme], ...custom }
}

function getSizeStyles(size: string) {
  const sizes: Record<string, any> = {
    sm: {
      inputPadding: '6px 32px 6px 10px',
      inputText: '13px',
      calendarPadding: '12px',
      headerText: '14px',
      weekdayText: '11px',
      dayPadding: '6px',
      dayText: '12px',
      buttonPadding: '6px 12px',
      buttonText: '12px',
      iconSize: '16px',
      iconRight: '10px'
    },
    md: {
      inputPadding: '10px 40px 10px 14px',
      inputText: '15px',
      calendarPadding: '16px',
      headerText: '16px',
      weekdayText: '12px',
      dayPadding: '10px',
      dayText: '14px',
      buttonPadding: '8px 16px',
      buttonText: '14px',
      iconSize: '20px',
      iconRight: '12px'
    },
    lg: {
      inputPadding: '14px 48px 14px 18px',
      inputText: '17px',
      calendarPadding: '20px',
      headerText: '18px',
      weekdayText: '13px',
      dayPadding: '12px',
      dayText: '16px',
      buttonPadding: '10px 20px',
      buttonText: '15px',
      iconSize: '24px',
      iconRight: '14px'
    }
  }
  return sizes[size]
}

function getRadiusClass(radius: string) {
  const radiuses: Record<string, string> = {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  }
  return radiuses[radius]
}

function getShadowClass(shadow: string) {
  const shadows: Record<string, string> = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
  return shadows[shadow]
}

function CalendarIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="16" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="16" r="0.8" fill="currentColor" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
      <circle cx="16" cy="16" r="0.8" fill="currentColor" />
    </svg>
  )
}
