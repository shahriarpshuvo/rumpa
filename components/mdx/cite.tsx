export function Cite({ source, url }: { source: string; url?: string }) {
  if (url) {
    return (
      <sup className="ml-0.5 text-xs">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
          title={source}
        >
          [src]
        </a>
      </sup>
    );
  }
  return (
    <sup className="ml-0.5 text-xs text-muted-foreground" title={source}>
      [src]
    </sup>
  );
}
