"use client";
import { useId, useState } from "react";

export const InputField = ({
  type = "text",
  name,
  label,
  placeholder,
  textarea = false,
  ...rest
}) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.24em] text-slate-500"
      >
        <span className={focused ? "text-neon-cyan" : undefined}>
          {label || placeholder}
        </span>
      </label>

      <div className="relative">
        <Tag
          id={id}
          name={name}
          type={textarea ? undefined : type}
          placeholder={placeholder}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="clip-tag w-full border border-white/10 bg-void-900/70 px-4 py-3.5 text-sm tracking-wide text-slate-100 outline-none transition-colors duration-300 placeholder:text-slate-600 focus:border-neon-cyan/60"
          {...rest}
        />
        <span
          className={`pointer-events-none absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-500 ${
            focused ? "w-full" : "w-0"
          }`}
        />
      </div>
    </div>
  );
};
