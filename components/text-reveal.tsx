export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block animate-in fade-in duration-500 fill-mode-both"
          style={{ animationDelay: `${delay + index * 30}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
