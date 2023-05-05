'use client';

interface HeadingsProps {
  title: string;
  subtitle?: string;
  isCenter?: boolean;
}

export const Headings = (props: HeadingsProps) => {
  return (
    <div className={props.isCenter ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">{props.title}</div>
      {props.subtitle && (
        <div className="font-light text-neutral-500 mt-2">{props.subtitle}</div>
      )}
    </div>
  );
};
