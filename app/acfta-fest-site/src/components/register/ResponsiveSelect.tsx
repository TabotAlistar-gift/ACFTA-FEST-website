import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface ResponsiveSelectProps {
  id: string;
  value: string;
  options: readonly string[];
  placeholder?: string;
  invalid?: boolean;
  onChange: (nextValue: string) => void;
  onBlur?: () => void;
}

export function ResponsiveSelect({
  id,
  value,
  options,
  placeholder = 'Select an option',
  invalid = false,
  onChange,
  onBlur,
}: ResponsiveSelectProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!isOpen) return;
    const idx = options.indexOf(value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [isOpen, options, value]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, onBlur]);

  const selectOption = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
    onBlur?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      else setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      else setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (event.key === 'Home' && isOpen) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End' && isOpen) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
      event.preventDefault();
      if (activeIndex >= 0 && options[activeIndex]) selectOption(options[activeIndex]);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
      onBlur?.();
    } else if (event.key === 'Tab' && isOpen) {
      setIsOpen(false);
      onBlur?.();
    }
  };

  return (
    <div ref={containerRef} className={`reg-custom-select ${isOpen ? 'is-open' : ''}`}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={invalid}
        aria-activedescendant={isOpen && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
        className={`reg-select-trigger ${!value ? 'is-placeholder' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        data-testid={`select-trigger-${id}`}
      >
        <span className="reg-select-trigger-text">{value || placeholder}</span>
        <ChevronDown size={18} className={`reg-select-chevron ${isOpen ? 'is-rotated' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul id={listboxId} role="listbox" aria-label="Available options" className="reg-select-menu">
          {options.map((opt, index) => {
            const isSelected = value === opt;
            const isFocused = activeIndex === index;
            return (
              <li
                key={opt}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`reg-select-option ${isSelected ? 'is-selected' : ''} ${isFocused ? 'is-focused' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(opt)}
                data-testid={`select-option-${index}`}
              >
                <span className="reg-select-option-label">{opt}</span>
                {isSelected && <Check size={16} className="reg-select-option-check" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface ResponsiveCountryInputProps {
  id: string;
  value: string;
  countries: readonly string[];
  invalid?: boolean;
  onChange: (nextValue: string) => void;
  onBlur?: () => void;
}

export function ResponsiveCountryInput({
  id,
  value,
  countries,
  invalid = false,
  onChange,
  onBlur,
}: ResponsiveCountryInputProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filtered = useMemo(() => {
    const q = (value || '').trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.toLowerCase().includes(q));
  }, [countries, value]);

  useEffect(() => {
    setActiveIndex(0);
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, onBlur]);

  const selectCountry = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    onBlur?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      else if (filtered.length > 0) setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      else if (filtered.length > 0) setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (event.key === 'Enter' && isOpen && filtered[activeIndex]) {
      event.preventDefault();
      selectCountry(filtered[activeIndex]);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === 'Tab' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`reg-custom-select ${isOpen ? 'is-open' : ''}`}>
      <div className="reg-country-input-wrap">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-invalid={invalid}
          autoComplete="country-name"
          value={value || ''}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="reg-country-input"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Toggle country list"
          className="reg-country-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronDown size={18} className={`reg-select-chevron ${isOpen ? 'is-rotated' : ''}`} />
        </button>
      </div>

      {isOpen && filtered.length > 0 && (
        <ul id={listboxId} role="listbox" aria-label="Countries" className="reg-select-menu">
          {filtered.map((countryName, index) => {
            const isSelected = value === countryName;
            const isFocused = activeIndex === index;
            return (
              <li
                key={countryName}
                id={`${listboxId}-country-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`reg-select-option ${isSelected ? 'is-selected' : ''} ${isFocused ? 'is-focused' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectCountry(countryName)}
              >
                <span className="reg-select-option-label">{countryName}</span>
                {isSelected && <Check size={16} className="reg-select-option-check" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
