"use client";

import "dayjs/locale/es";
import dayjs, { type Dayjs } from "dayjs";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { esES } from "@mui/x-date-pickers/locales";
import { brandTheme } from "@/lib/mui-theme";
import type { BrandDatePickerProps } from "@/components/ui/BrandDatePicker";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses `YYYY-MM-DD` as a local date, avoiding the UTC shift of `new Date(string)`. */
function isoToDayjs(value: string): Dayjs | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const date = dayjs(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.isValid() ? date : null;
}

function dayjsToIso(date: Dayjs | null): string {
  return date && date.isValid() ? date.format("YYYY-MM-DD") : "";
}

/**
 * The MUI date picker in the brand style. Loaded on the client only (see BrandDatePicker):
 * MUI reads the current date while rendering, which the server prerender does not allow.
 */
export function BrandDatePickerField({
  id,
  name,
  value,
  onChange,
  disablePast = false,
  invalid = false,
  labelId,
  describedBy,
}: Omit<BrandDatePickerProps, "className">) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <ThemeProvider theme={brandTheme}>
        <DatePicker
          value={isoToDayjs(value)}
          onChange={(next) => onChange(dayjsToIso(next))}
          format="DD/MM/YYYY"
          disablePast={disablePast}
          slotProps={{
            textField: {
              id,
              name,
              size: "small",
              fullWidth: true,
              error: invalid,
              slotProps: {
                // The field's group element carries the id; these name it and link its help text.
                input: {
                  "aria-labelledby": labelId,
                  "aria-describedby": describedBy,
                  "aria-invalid": invalid,
                },
              },
            },
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
