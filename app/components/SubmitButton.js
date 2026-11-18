'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  children,
  pendingText = '...',
  className = '',
  disabled = false,
  ...props
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${className} disabled:opacity-50`}
      {...props}
      disabled={pending || disabled}
    >
      {pending ? pendingText : children}
    </button>
  );
}