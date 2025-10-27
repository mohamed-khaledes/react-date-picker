
# React Hijri-Gregorian Date Picker

A beautiful, feature-rich React date picker component that supports both Hijri (Islamic) and Gregorian calendars with seamless conversion between them. Perfect for applications that need to work with Islamic dates or support bilingual date selection.

[![npm version](https://img.shields.io/npm/v/@mk01/react-date-picker.svg)](https://www.npmjs.com/package/@mk01/react-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---
### DEMO => https://mohamed-khaledes.github.io/react-date-picker-demo/
<img width="1873" height="934" alt="Screenshot_3" src="https://github.com/user-attachments/assets/eb83c57d-a406-4eeb-95a1-ebf5993c13b4" />

## ✨ Features

- 🌙 **Dual Calendar Support**: Both Hijri (Islamic) and Gregorian calendars
- 🔄 **Seamless Conversion**: Automatic conversion between Hijri and Gregorian dates
- 🌍 **Bilingual**: Full support for English and Arabic languages
- 🎨 **5 Built-in Themes**: Light, Dark, Gradient, Modern, and Minimal
- 🎭 **Highly Customizable**: Custom colors, sizes, borders, shadows, and animations
- 📅 **Multiple Date Formats**: 13 different date format options
- ♿ **Accessible**: Keyboard navigation and screen reader friendly
- 📱 **Responsive**: Works perfectly on mobile and desktop
- 🎯 **TypeScript Support**: Fully typed with TypeScript
- 🚀 **Zero Dependencies**: No external dependencies required
- ⚡ **Lightweight**: Minimal bundle size
- 🔒 **Date Range**: Support for min/max date restrictions
- 🎉 **Multiple View Modes**: Show both calendars simultaneously
- 🌈 **Smooth Animations**: 4 animation styles (fade, slide, scale, bounce)

## 📦 Installation

```bash
npm install @mk01/react-date-picker
```

```bash
yarn add @mk01/react-date-picker
```

```bash
pnpm add @mk01/react-date-picker
```

## 🚀 Quick Start

```jsx
import React, { useState } from 'react';
import ReactDatePicker from 'your-package-name';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, hijri, gregorian) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
    console.log('Hijri Date:', hijri);
    console.log('Gregorian Date:', gregorian);
  };

  return (
    <div>
      <ReactDatePicker
        value={selectedDate}
        onChange={handleDateChange}
        placeholder="Select a date"
      />
    </div>
  );
}

export default App;
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | The selected date value |
| `onChange` | `(date: Date, hijri: HijriDate, gregorian: Date) => void` | - | Callback fired when date is selected |
| `defaultCalendar` | `'hijri' \| 'gregorian'` | `'hijri'` | Which calendar to show by default |
| `format` | `string` | `'DD-MM-YYYY'` | Date format for display (see formats below) |
| `placeholder` | `string` | `'Select date'` | Input placeholder text |
| `locale` | `'en' \| 'ar'` | `'en'` | Language for calendar labels |
| `disabled` | `boolean` | `false` | Disable the date picker |
| `showBothCalendars` | `boolean` | `false` | Show both calendars simultaneously |
| `syncCalendars` | `boolean` | `true` | Sync both calendars when navigating |
| `allowCalendarSwitch` | `boolean` | `true` | Allow switching between calendars |
| `theme` | `'light' \| 'dark' \| 'gradient' \| 'modern' \| 'minimal'` | `'gradient'` | Visual theme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'borderless'` | `'outlined'` | Input field style |
| `borderRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Border radius style |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Shadow intensity |
| `animation` | `'none' \| 'fade' \| 'slide' \| 'scale' \| 'bounce'` | `'scale'` | Calendar open animation |
| `customColors` | `CustomColors` | - | Custom color overrides (see below) |
| `showTodayButton` | `boolean` | `true` | Show "Today" quick select button |
| `showClearButton` | `boolean` | `true` | Show "Clear" button |
| `closeOnSelect` | `boolean` | `true` | Close calendar after selecting date |
| `highlightToday` | `boolean` | `true` | Highlight today's date |
| `highlightWeekends` | `boolean` | `true` | Highlight weekend days |
| `firstDayOfWeek` | `0 \| 1` | `0` | First day of week (0=Sunday, 1=Monday) |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `hijriYearRange` | `{ start: number; end: number }` | `{ start: 1400, end: 1500 }` | Hijri year range |
| `gregorianYearRange` | `{ start: number; end: number }` | `{ start: 1970, end: 2100 }` | Gregorian year range |
| `className` | `string` | `''` | Additional CSS class |

### Date Formats

The following date formats are supported:

- `DD/MM/YYYY` - 25/12/2024
- `MM/DD/YYYY` - 12/25/2024
- `YYYY-MM-DD` - 2024-12-25
- `DD-MM-YYYY` - 25-12-2024
- `D MMMM YYYY` - 25 December 2024
- `MMMM D, YYYY` - December 25, 2024
- `D MMM YYYY` - 25 Dec 2024
- `MMM D, YYYY` - Dec 25, 2024
- `dddd, D MMMM YYYY` - Monday, 25 December 2024
- `ddd, D MMM YYYY` - Mon, 25 Dec 2024
- `DD.MM.YYYY` - 25.12.2024
- `D/M/YYYY` - 25/12/2024
- `YYYY/MM/DD` - 2024/12/25

### Custom Colors Interface

```typescript
interface CustomColors {
  primary?: string;        // Primary color for selected dates
  secondary?: string;      // Secondary accent color
  accent?: string;         // Accent color for highlights
  background?: string;     // Main background color
  surface?: string;        // Surface/card background
  text?: string;           // Primary text color
  textSecondary?: string;  // Secondary text color
  border?: string;         // Border color
  hover?: string;          // Hover state color
  selected?: string;       // Selected date background
  disabled?: string;       // Disabled state color
  todayBg?: string;        // Today's date background
  todayText?: string;      // Today's date text color
}
```

### HijriDate Interface

```typescript
interface HijriDate {
  year: number;   // Hijri year
  month: number;  // Hijri month (1-12)
  day: number;    // Hijri day
}
```

## 💡 Examples

### Basic Usage with Hijri Calendar

```jsx
import React, { useState } from 'react';
import ReactDatePicker from 'your-package-name';

function HijriExample() {
  const [date, setDate] = useState(null);

  return (
    <ReactDatePicker
      value={date}
      onChange={(date, hijri) => {
        setDate(date);
        console.log(`Selected Hijri date: ${hijri.day}/${hijri.month}/${hijri.year}`);
      }}
      defaultCalendar="hijri"
      locale="ar"
      placeholder="اختر التاريخ"
    />
  );
}
```

### Gregorian Calendar with Custom Format

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  defaultCalendar="gregorian"
  format="MMMM D, YYYY"
  placeholder="Select a date"
/>
```

### Show Both Calendars Simultaneously

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  showBothCalendars={true}
  syncCalendars={true}
  size="lg"
/>
```

### Custom Theme with Dark Mode

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  theme="dark"
  borderRadius="xl"
  shadow="xl"
  animation="slide"
/>
```

### Custom Colors

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  theme="light"
  customColors={{
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#FFFFFF',
    surface: '#F7F7F7',
    text: '#2C3E50',
    selected: '#FF6B6B',
    hover: '#FFE5E5',
  }}
/>
```

### Date Range Restrictions

```jsx
const today = new Date();
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);

<ReactDatePicker
  value={date}
  onChange={setDate}
  minDate={today}
  maxDate={nextMonth}
  highlightToday={true}
/>
```

### Small Size with Minimal Theme

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  theme="minimal"
  size="sm"
  variant="borderless"
  borderRadius="sm"
  shadow="none"
/>
```

### Large Size with Gradient Theme

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  theme="gradient"
  size="lg"
  variant="filled"
  borderRadius="full"
  shadow="xl"
  animation="bounce"
/>
```

### Arabic Language with Custom Format

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  locale="ar"
  format="dddd، D MMMM YYYY"
  defaultCalendar="hijri"
  placeholder="اختر التاريخ"
  firstDayOfWeek={1}
/>
```

### Without Today and Clear Buttons

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  showTodayButton={false}
  showClearButton={false}
  closeOnSelect={true}
/>
```

### Custom Hijri Year Range

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  defaultCalendar="hijri"
  hijriYearRange={{ start: 1440, end: 1460 }}
  locale="ar"
/>
```

### Disable Weekend Highlighting

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  highlightWeekends={false}
  highlightToday={false}
/>
```

### Modern Theme with Monday as First Day

```jsx
<ReactDatePicker
  value={date}
  onChange={setDate}
  theme="modern"
  firstDayOfWeek={1}
  format="DD.MM.YYYY"
/>
```

### Complete Configuration Example

```jsx
function AdvancedExample() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date, hijri, gregorian) => {
    setSelectedDate(date);
    console.log({
      gregorianDate: date.toLocaleDateString(),
      hijriDate: `${hijri.day}/${hijri.month}/${hijri.year}`,
      timestamp: date.getTime(),
    });
  };

  return (
    <ReactDatePicker
      value={selectedDate}
      onChange={handleChange}
      defaultCalendar="hijri"
      format="dddd, D MMMM YYYY"
      placeholder="Select a date"
      locale="en"
      showBothCalendars={true}
      syncCalendars={true}
      allowCalendarSwitch={true}
      theme="gradient"
      size="lg"
      variant="outlined"
      borderRadius="lg"
      shadow="xl"
      animation="scale"
      customColors={{
        primary: '#8B5CF6',
        selected: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        todayBg: '#EDE9FE',
        todayText: '#6D28D9',
      }}
      showTodayButton={true}
      showClearButton={true}
      closeOnSelect={true}
      highlightToday={true}
      highlightWeekends={true}
      firstDayOfWeek={0}
      minDate={new Date('2020-01-01')}
      maxDate={new Date('2030-12-31')}
      hijriYearRange={{ start: 1400, end: 1500 }}
      gregorianYearRange={{ start: 1970, end: 2100 }}
      className="my-custom-datepicker"
    />
  );
}
```

### Form Integration Example

```jsx
function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      
      <div>
        <label>Birth Date:</label>
        <ReactDatePicker
          value={formData.birthDate}
          onChange={(date) => setFormData({ ...formData, birthDate: date })}
          defaultCalendar="gregorian"
          format="DD/MM/YYYY"
          maxDate={new Date()}
          placeholder="Select your birth date"
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Multiple Date Pickers

```jsx
function MultipleDatePickers() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <ReactDatePicker
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate || undefined}
          placeholder="Select start date"
        />
      </div>
      
      <div>
        <label>End Date:</label>
        <ReactDatePicker
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || undefined}
          placeholder="Select end date"
        />
      </div>
    </div>
  );
}
```

## 🎨 Themes

### Light Theme
Clean and professional appearance suitable for most applications.

```jsx
<ReactDatePicker theme="light" />
```

### Dark Theme
Perfect for dark mode applications with high contrast.

```jsx
<ReactDatePicker theme="dark" />
```

### Gradient Theme
Eye-catching gradient colors with modern styling.

```jsx
<ReactDatePicker theme="gradient" />
```

### Modern Theme
Contemporary design with cyan accents and clean lines.

```jsx
<ReactDatePicker theme="modern" />
```

### Minimal Theme
Stripped-down black and white design for simplicity.

```jsx
<ReactDatePicker theme="minimal" />
```

## 🎬 Animations

Choose from 4 different animation styles:

```jsx
// Fade animation
<ReactDatePicker animation="fade" />

// Slide animation
<ReactDatePicker animation="slide" />

// Scale animation (default)
<ReactDatePicker animation="scale" />

// Bounce animation
<ReactDatePicker animation="bounce" />

// No animation
<ReactDatePicker animation="none" />
```

## 📏 Sizes

### Small
```jsx
<ReactDatePicker size="sm" />
```

### Medium (Default)
```jsx
<ReactDatePicker size="md" />
```

### Large
```jsx
<ReactDatePicker size="lg" />
```

## 🎯 Variants

### Default
```jsx
<ReactDatePicker variant="default" />
```

### Outlined (Default)
```jsx
<ReactDatePicker variant="outlined" />
```

### Filled
```jsx
<ReactDatePicker variant="filled" />
```

### Borderless
```jsx
<ReactDatePicker variant="borderless" />
```

## 🌐 Localization

The component fully supports both English and Arabic:

### English
```jsx
<ReactDatePicker
  locale="en"
  placeholder="Select date"
/>
```

### Arabic
```jsx
<ReactDatePicker
  locale="ar"
  placeholder="اختر التاريخ"
/>
```

## ⌨️ Keyboard Navigation

- **Tab**: Focus the date picker
- **Enter/Space**: Open calendar
- **Escape**: Close calendar
- **Arrow Keys**: Navigate between dates
- **Home**: Go to first day of month
- **End**: Go to last day of month
- **Page Up**: Previous month
- **Page Down**: Next month

## 🔧 TypeScript Support

The package is written in TypeScript and includes full type definitions:

```typescript
import ReactDatePicker, { ReactDatePickerProps, HijriDate } from 'your-package-name';

const MyComponent: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  
  const handleChange: ReactDatePickerProps['onChange'] = (date, hijri, gregorian) => {
    setDate(date);
    console.log(hijri.year, hijri.month, hijri.day);
  };
  
  return <ReactDatePicker value={date} onChange={handleChange} />;
};
```

## 🎯 Best Practices

1. **Always provide an onChange handler** to capture the selected date
2. **Use appropriate date formats** based on your locale
3. **Set reasonable date ranges** with minDate and maxDate
4. **Choose themes that match your app's design**
5. **Consider mobile users** when selecting size and variant
6. **Use locale prop** to match your application's language
7. **Test with different year ranges** for Hijri dates
8. **Provide clear placeholders** to guide users

## 🐛 Troubleshooting

### Date not displaying correctly
Make sure you're passing a valid JavaScript Date object to the `value` prop.

### Calendar not opening
Check if the `disabled` prop is set to `false` and there are no conflicting CSS styles.

### Custom colors not applying
Ensure you're passing the `customColors` object with valid CSS color values.

### Hijri dates seem incorrect
Hijri date calculations are approximations. For precise Islamic dates, consider using a dedicated Islamic calendar library.

### TypeScript errors
Make sure you have `@types/react` installed and are using the correct types from the package.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

- Inspired by the need for Islamic calendar support in React applications
- Built with modern React hooks and TypeScript
- Designed with accessibility and user experience in mind

## 📞 Support

For issues, questions, or suggestions, please open an issue on [GitHub](https://github.com/yourusername/your-package-name/issues).

## 🔗 Links

- [Documentation](https://your-docs-url.com)
- [NPM Package](https://www.npmjs.com/package/your-package-name)
- [GitHub Repository](https://github.com/yourusername/your-package-name)
- [Live Demo](https://your-demo-url.com)

---


Made with ❤️ for the Muslim developer community
