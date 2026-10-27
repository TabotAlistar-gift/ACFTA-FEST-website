import { Check } from 'lucide-react';
import { type CheckoutStep } from './types';

interface StepIndicatorProps {
  current: CheckoutStep;
}

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirm' },
];

export function StepIndicator({ current }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="co-steps">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li
              key={step.id}
              className={`co-step ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
            >
              <div className="co-step-bubble" aria-current={isActive ? 'step' : undefined}>
                {isDone ? <Check size={12} strokeWidth={2.5} /> : <span>{index + 1}</span>}
              </div>
              <span className="co-step-label">{step.label}</span>
              {index < STEPS.length - 1 && <div className="co-step-line" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
