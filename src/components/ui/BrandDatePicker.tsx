"use client";

import { useEffect, useState } from "react";
import type { BrandDatePickerField } from "@/components/ui/BrandDatePickerField";

export type BrandDatePickerProps = {
  id: string;
  name: string;
  /** ISO date `YYYY-MM-DD`, or "" when empty. */
  value: string;
  /** Receives an ISO date `YYYY-MM-DD`, or "" when the date is empty or invalid. */
  onChange: (iso: string) => void;
  disablePast?: boolean;
  invalid?: boolean;
  /** Id of the external label; names the field for assistive technology. */
  labelId?: string;
  describedBy?: string;
  className?: string;
};

type Field = typeof BrandDatePickerField;

/**
 * Server and first client render show a plain input of the same size. After mount the MUI picker
 * is loaded in its own chunk and replaces it. MUI reads "today" during render, which Cache
 * Components rejects during prerender, so the picker must not render on the server.
 */
export function BrandDatePicker(props: BrandDatePickerProps) {
  const [Field, setField] = useState<Field | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/ui/BrandDatePickerField").then((mod) => {
      if (active) setField(() => mod.BrandDatePickerField);
    });
    return () => {
      active = false;
    };
  }, []);

  // The width classes sit on this wrapper: Tailwind utilities lose to the unlayered Emotion styles of the field.
  const { className, ...fieldProps } = props;
  return (
    <div className={className}>
      {Field ? <Field {...fieldProps} /> : <DateFieldPlaceholder {...fieldProps} />}
    </div>
  );
}

function DateFieldPlaceholder({ id, name, value, invalid, labelId, describedBy }: Omit<BrandDatePickerProps, "className">) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      readOnly
      placeholder="DD/MM/AAAA"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      className="field-input !min-h-11 !py-2"
    />
  );
}
